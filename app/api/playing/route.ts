// What Ali is listening to on Spotify, for the "about & now" section: the track playing now, or else the last one.
// Needs SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN (a refresh token granted the scopes
// user-read-currently-playing and user-read-recently-played). Without them, or if Spotify fails, it answers null and
// the line stays hidden.
type Track = { name: string; artists?: { name: string }[]; external_urls: { spotify: string } }

export async function GET() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env
  if (!id || !secret || !refresh) return Response.json(null)
  try {
    const { access_token } = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { Authorization: `Basic ${btoa(`${id}:${secret}`)}` },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
    }).then((r) => r.json())
    const headers = { Authorization: `Bearer ${access_token}` }

    const now = await fetch('https://api.spotify.com/v1/me/player/currently-playing', { headers })
    const playing = now.status === 200 ? await now.json() : null // 204: nothing playing
    const live = Boolean(playing?.is_playing && playing.item?.artists) // a song, not a podcast episode
    const track: Track | undefined = live
      ? playing.item
      : (await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers }).then((r) => r.json()))
          .items?.[0]?.track
    if (!track?.artists) return Response.json(null)

    return Response.json({
      live,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      url: track.external_urls.spotify,
    })
  } catch {
    return Response.json(null)
  }
}

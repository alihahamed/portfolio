import { Obj, Cloud, Tree, SEDAN, HATCH, VAN, RICKSHAW, CYCLIST, PLANE, LAMP, CLOUD, CLOUDLET, TREETOP } from '@/components/site/objects'

const OBJECTS: Record<string, (scale: number) => React.ReactNode> = {
  Sedan: (scale) => <Obj parts={SEDAN} paint="#e5533d" scale={scale} />,
  Hatchback: (scale) => <Obj parts={HATCH} paint="#f0b429" scale={scale} />,
  Van: (scale) => <Obj parts={VAN} paint="#2a9d8f" scale={scale} />,
  'Auto-rickshaw': (scale) => <Obj parts={RICKSHAW} paint="#2f9e5b" scale={scale} />,
  Cyclist: (scale) => <Obj parts={CYCLIST} paint="#3b6fd9" scale={scale} />,
  Plane: (scale) => <Obj parts={PLANE} paint="#2f5fd0" scale={scale} />,
  Tree: (scale) => <Tree puffs={TREETOP} scale={scale} />,
  'Street lamp': (scale) => <Obj parts={LAMP} scale={scale} />,
  Cloud: (scale) => <Cloud puffs={CLOUD} scale={scale} />,
  'Small cloud': (scale) => <Cloud puffs={CLOUDLET} scale={scale} />,
}

// The object workbench: every object from the sky scene on its own, at four times, twice and once its drawn size, on the
// day sky and the night sky. An object is settled here before it goes into the scene. Not linked from the site.
export default function Lab() {
  return (
    <main className="mx-auto max-w-frame px-4 py-16 sm:px-6">
      <h1 className="text-h2">Object workbench</h1>
      {Object.entries(OBJECTS).map(([name, draw]) => (
        <section key={name} className="mt-12">
          <h2 className="text-label text-muted uppercase">{name}</h2>
          {['day', 'night'].map((theme) => (
            <div
              key={theme}
              data-theme={theme}
              className="mt-4 flex items-end gap-12 border-b border-fg bg-linear-to-b from-sky-top to-sky-bottom px-6 pt-12 text-fg"
            >
              {draw(4)}
              {draw(2)}
              {draw(1)}
            </div>
          ))}
        </section>
      ))}
    </main>
  )
}

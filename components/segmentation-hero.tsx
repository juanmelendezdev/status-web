"use client"

export default function SegmentationHero() {
  return (
    <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Define Tu Éxito Digital:
          </span>
          <span className="block text-foreground mt-2">Encuentra el Plan Web Perfecto para Tu Negocio</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Al seleccionar tu tipo de negocio, recibirás una propuesta más precisa y personalizada. Nuestro equipo de
          expertos adaptará la estrategia digital perfecta para tus necesidades específicas.
        </p>

        <div className="pt-4">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">✨ Comienza en menos de 2 minutos</p>
          </div>
        </div>
      </div>
    </section>
  )
}

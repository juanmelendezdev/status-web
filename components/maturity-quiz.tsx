"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

interface MaturityQuizProps {
  segment: string
  onBack: () => void
}

const QUESTIONS = [
  {
    id: "web_presence",
    area: "Presencia Web",
    question: "¿Existe actualmente tu proyecto digital (web o app)?",
    options: [
      {
        text: "No, es una idea o solo tengo redes sociales.",
        score: 1,
      },
      {
        text: "Sí, pero es muy básico, obsoleto o requiere un rediseño total.",
        score: 2,
      },
      {
        text: "Sí, funciona bien, pero necesitamos mejorar funcionalidades y escalar.",
        score: 3,
      },
    ],
  },
  {
    id: "technology",
    area: "Tecnología y Datos",
    question: "¿Cómo gestionas la tecnología de tu proyecto?",
    options: [
      {
        text: "No tenemos equipo técnico ni controlamos el código. Usamos plataformas sencillas (Ej. Wix, sitio básico de WordPress).",
        score: 1,
      },
      {
        text: "Tenemos una web funcional con tecnologías estándar (Ej. WordPress con plugins, frameworks básicos), pero hay retos de rendimiento.",
        score: 2,
      },
      {
        text: "Tenemos código a medida, utilizamos APIs complejas y necesitamos arquitectura robusta y equipos de desarrollo dedicados.",
        score: 3,
      },
    ],
  },
  {
    id: "service_flow",
    area: "Flujo de Servicio",
    question: "¿Cuál es la prioridad actual de tu proyecto?",
    options: [
      {
        text: "Lanzar el Producto Mínimo Viable (MVP) con el menor costo y tiempo posible.",
        score: 1,
      },
      {
        text: "Optimizar procesos existentes, integrar nuevas herramientas (CRM, ERP) y enfocarnos en la conversión.",
        score: 2,
      },
      {
        text: "Garantizar el mantenimiento 24/7, refactorizar código y desarrollar proyectos a gran escala y largo plazo.",
        score: 3,
      },
    ],
  },
]

const CLASSIFICATIONS = {
  inicial: {
    label: "Inicial (Lanzamiento)",
    range: "1-3 puntos",
    description:
      "Tu negocio está en las primeras etapas de transformación digital. Necesitas soluciones básicas pero sólidas para establecer tu presencia.",
    color: "from-orange-500 to-orange-600",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-200 dark:border-orange-900",
  },
  intermedio: {
    label: "Intermedio (Crecimiento)",
    range: "4-6 puntos",
    description:
      "Ya tienes una presencia online pero necesitas optimizarla, escalarla o agregar nuevas funcionalidades para crecer.",
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-900",
  },
  avanzado: {
    label: "Avanzado (Evolución)",
    range: "7-9 puntos",
    description:
      "Tu negocio digital está maduro y buscas innovar, optimizar conversiones o explorar nuevas características.",
    color: "from-green-500 to-green-600",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-900",
  },
}

const SEGMENT_NAMES: Record<string, string> = {
  ecommerce: "E-commerce/Transaccional",
  marketplace: "Marketplace/P2P",
  leads: "Generación de Leads",
  saas: "SaaS/Web App",
}

type Classification = keyof typeof CLASSIFICATIONS

export default function MaturityQuiz({ segment, onBack }: MaturityQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const totalScore = answers.reduce((sum, score) => sum + score, 0)

  const getClassification = (): Classification => {
    if (totalScore <= 3) return "inicial"
    if (totalScore <= 6) return "intermedio"
    return "avanzado"
  }

  const handleSelectAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  if (showResults) {
    const classification = getClassification()
    const classificationData = CLASSIFICATIONS[classification]

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-slate-50 dark:from-slate-950 dark:to-background px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button onClick={onBack} variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Button>

          <div className="space-y-8">
            {/* Results Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-8 h-8 ${classificationData.textColor}`} />
                <p className={`text-sm font-semibold ${classificationData.textColor}`}>¡Tu Evaluación Completada!</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Tu Nivel de Madurez Digital</h2>
            </div>

            {/* Classification Card */}
            <Card className={`border-l-4 ${classificationData.borderColor}`}>
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <CardTitle className="text-2xl">{classificationData.label}</CardTitle>
                    <span className={`text-3xl font-bold ${classificationData.textColor}`}>{totalScore}/9</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{classificationData.range}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-foreground text-base leading-relaxed">{classificationData.description}</p>

                {/* Score Breakdown */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold text-sm">Desglose de Respuestas:</h3>
                  <div className="grid gap-2">
                    {QUESTIONS.map((q, idx) => (
                      <div
                        key={q.id}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                      >
                        <span className="text-sm font-medium">{q.area}</span>
                        <span className={`font-semibold ${classificationData.textColor}`}>{answers[idx]} puntos</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="pt-4 space-y-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    Con este análisis, podemos diseñar una solución perfecta para {SEGMENT_NAMES[segment] || segment}.
                  </p>
                  <Button
                    onClick={() => {
                      const params = new URLSearchParams({
                        segment: SEGMENT_NAMES[segment] || segment,
                        level: classificationData.label,
                        score: totalScore.toString(),
                      })
                      window.location.href = `/contact?${params.toString()}`
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white h-12 text-base"
                  >
                    Solicitar Propuesta Personalizada
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleRestart} variant="outline" className="w-full bg-transparent">
              Realizar Evaluación Nuevamente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const question = QUESTIONS[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-50 dark:from-slate-950 dark:to-background px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-8 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>

        <div className="space-y-8">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Pregunta {currentQuestion + 1} de {QUESTIONS.length}
              </p>
              <p className="text-xs text-muted-foreground">
                {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%
              </p>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{question.area}</p>
            <h2 className="text-2xl md:text-3xl font-bold">{question.question}</h2>
            <p className="text-muted-foreground">Para {SEGMENT_NAMES[segment] || segment}</p>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {question.options.map((option, idx) => (
              <Card
                key={idx}
                onClick={() => handleSelectAnswer(option.score)}
                className="cursor-pointer transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500"
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 min-w-5 rounded-full border-2 border-slate-300 dark:border-slate-600 mt-0.5 group-hover:border-blue-500" />
                    <p className="text-sm leading-relaxed">{option.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Score indicator at bottom */}
          <div className="text-center text-xs text-muted-foreground">
            Puntuación acumulada: {answers.reduce((sum, score) => sum + score, 0)} puntos
          </div>
        </div>
      </div>
    </div>
  )
}

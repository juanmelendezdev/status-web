"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Users, TrendingUp, Code2 } from "lucide-react"

interface SegmentCard {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  keyNeeds: string[]
  cta: string
  color: string
}

const SEGMENTS: SegmentCard[] = [
  {
    id: "ecommerce",
    title: "Tienda Online & Ventas Directas",
    icon: ShoppingCart,
    description:
      "Tu negocio vende productos o servicios directamente por internet. Necesitas optimizar cada paso de la compra, desde el catálogo hasta el pago.",
    keyNeeds: [
      "Pasarelas de Pago Seguras",
      "Gestión de Inventario",
      "Optimización de Conversión",
      "Experiencia de Checkout",
    ],
    cta: "Quiero Vender Online",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "marketplace",
    title: "Plataforma de Conexión & Marketplace",
    icon: Users,
    description:
      "Conectas a múltiples usuarios para transacciones o interacciones. Tu plataforma es el puente entre oferta y demanda.",
    keyNeeds: [
      "Roles de Usuario Diferenciados",
      "Sistemas de Reputación",
      "Motores de Búsqueda Avanzados",
      "Escalabilidad",
    ],
    cta: "Mi Negocio es Conectar",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "leads",
    title: "Generación de Leads & Web Corporativa",
    icon: TrendingUp,
    description:
      "Tu web es una herramienta para atraer prospectos, informar sobre tus servicios (B2B o consultoría) o construir autoridad.",
    keyNeeds: ["Formularios de Contacto", "Optimización SEO", "Integración con CRMs", "Diseño enfocado a Confianza"],
    cta: "Necesito Generar Prospectos",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "saas",
    title: "Software como Servicio (SaaS) & App Web",
    icon: Code2,
    description:
      "Ofreces una herramienta o software en línea bajo un modelo de suscripción. Tu web es el producto principal.",
    keyNeeds: ["Funcionalidades Complejas", "Arquitectura Robusta", "Integración de APIs", "Experiencia UX Superior"],
    cta: "Busco Desarrollar mi App Web",
    color: "from-orange-500 to-red-600",
  },
]

interface SegmentationCardsProps {
  onSelectSegment: (id: string) => void
}

export default function SegmentationCards({ onSelectSegment }: SegmentationCardsProps) {
  return (
    <section className="px-4 py-3 md:py-5 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {SEGMENTS.map((segment) => {
          const Icon = segment.icon
          return (
            <Card
              key={segment.id}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer h-full"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${segment.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${segment.color} text-white mb-2`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {segment.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                <CardDescription className="text-base leading-relaxed">{segment.description}</CardDescription>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Necesidades Clave:</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {segment.keyNeeds.map((need, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => onSelectSegment(segment.id)}
                  className={`w-full mt-4 bg-gradient-to-r ${segment.color} text-white hover:shadow-lg transition-all group-hover:scale-105`}
                >
                  {segment.cta} <span className="ml-2">→</span>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

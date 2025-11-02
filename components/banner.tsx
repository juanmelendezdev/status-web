"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Banner() {
  const text = "Descubre tu nivel de madurez digital";
  
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-balance group">
              {text.split('').map((letter, index) => (
                <span
                  key={index}
                  className="animate-letter animate-letter-delay"
                  style={{ '--letter-index': index } as React.CSSProperties}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h2>
            <p className="text-blue-100 text-lg mb-4">
              Responde 3 preguntas clave y recibe una propuesta personalizada adaptada a tu negocio.
            </p>
          </div>
          <Link href="/">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2 whitespace-nowrap">
              Comenzar Evaluación
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

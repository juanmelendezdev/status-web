"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

const contactFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  telefono: z.string().min(7, "Ingresa un teléfono válido"),
  email: z.string().email("Ingresa un correo válido"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const segment = searchParams.get("segment") || ""
  const maturityLevel = searchParams.get("level") || ""
  const score = searchParams.get("score") || ""

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          segment,
          maturityLevel,
          score,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        form.reset()
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-50 dark:from-slate-950 dark:to-background px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </Link>

        {/* Success Message */}
        {submitStatus === "success" && (
          <Card className="mb-6 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100">¡Solicitud Enviada Exitosamente!</p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Te contactaremos pronto con una propuesta personalizada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <Card className="mb-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100">Error al Enviar</p>
                  <p className="text-sm text-red-800 dark:text-red-200">Intenta nuevamente o contacta con soporte.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Solicitar Propuesta Personalizada</CardTitle>
            <CardDescription>
              Completa el formulario y te enviaremos una propuesta adaptada a tu negocio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Evaluation Summary */}
                {segment && maturityLevel && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <span className="font-semibold">Segmento:</span> {segment} •
                      <span className="font-semibold ml-2">Nivel:</span> {maturityLevel} •
                      <span className="font-semibold ml-2">Puntuación:</span> {score}
                    </p>
                  </div>
                )}

                {/* Nombre */}
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Teléfono */}
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono *</FormLabel>
                      <FormControl>
                        <Input placeholder="+56 9 1234 5678" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico *</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" type="email" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white h-12 text-base"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Tus datos están protegidos y solo se usarán para contactarte con tu propuesta personalizada.
        </p>
      </div>
    </div>
  )
}

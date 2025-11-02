import { type NextRequest, NextResponse } from "next/server"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@resend.dev"

interface ContactRequest {
  nombre: string
  telefono: string
  email: string
  segment?: string
  maturityLevel?: string
  score?: string
}

export async function POST(request: NextRequest) {
  try {
    if (!RESEND_API_KEY) {
      console.error("[v0] RESEND_API_KEY not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const data: ContactRequest = await request.json()

    if (!data.nombre || !data.telefono || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailBody = `
      <h2>Nueva Solicitud de Propuesta Personalizada</h2>
      
      <h3>Datos del Cliente:</h3>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      
      ${
        data.segment
          ? `<h3>Evaluación Digital:</h3>
      <p><strong>Segmento:</strong> ${data.segment}</p>
      <p><strong>Nivel de Madurez:</strong> ${data.maturityLevel}</p>
      <p><strong>Puntuación Total:</strong> ${data.score}/9</p>`
          : ""
      }
      
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        Este es un email automático de tu formulario de contacto en Tu Consultora Web.
      </p>
    `

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ["juanmelendez.pe@gmail.com"],
        from: FROM_EMAIL,
        subject: `Nueva Solicitud de Propuesta - ${data.nombre}`,
        html: emailBody,
        reply_to: data.email,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Resend API error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [data.email],
        from: FROM_EMAIL,
        subject: "Hemos recibido tu solicitud de propuesta",
        html: `
          <h2>¡Gracias ${data.nombre}!</h2>
          <p>Hemos recibido tu solicitud de propuesta personalizada.</p>
          <p>Nos pondremos en contacto pronto con una solución adaptada a tu negocio.</p>
          
          <p style="margin-top: 30px; color: #666;">
            <strong>Tu información de contacto:</strong><br>
            Teléfono: ${data.telefono}<br>
            Email: ${data.email}
          </p>
        `,
      }),
    })

    if (!confirmationResponse.ok) {
      console.error("[v0] Failed to send confirmation email")
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * Script para probar la API de contacto
 * Verifica que se envíe el email correctamente a través de Resend
 */

async function testContactAPI() {
  console.log("[v0] Iniciando prueba de API de contacto...\n")

  const testData = {
    nombre: "Juan Test",
    telefono: "+34 613 620 890",
    email: "test@example.com",
    segment: "E-commerce",
    maturityLevel: "Intermedio",
    score: "6",
  }

  console.log("[v0] Datos de prueba:")
  console.log(JSON.stringify(testData, null, 2))
  console.log("\n[v0] Enviando solicitud a la API...\n")

  try {
    // En un entorno local, necesitarás que el servidor esté corriendo
    // Si estás en v0 preview, la URL será diferente
    const baseUrl = process.env.API_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    console.log(`[v0] Status Code: ${response.status}`)

    const result = await response.json()
    console.log("[v0] Respuesta de la API:")
    console.log(JSON.stringify(result, null, 2))

    if (response.ok) {
      console.log("\n✅ [v0] ¡Éxito! El email debería haber sido enviado a juanmelendez.pe@gmail.com")
      console.log("[v0] Además, se envió un email de confirmación a: test@example.com")
      return true
    } else {
      console.log("\n❌ [v0] Error al enviar el email. Verifica que RESEND_API_KEY esté correctamente configurada.")
      return false
    }
  } catch (error) {
    console.error("[v0] Error en la prueba:", error.message)
    console.error("[v0] Asegúrate de que el servidor esté corriendo en http://localhost:3000")
    return false
  }
}

testContactAPI().then((success) => {
  process.exit(success ? 0 : 1)
})

module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/OneDrive/Fotos/status int/proyectos web 2025 - clientes/status-web/app/api/contact/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Fotos$2f$status__int$2f$proyectos__web__2025__$2d$__clientes$2f$status$2d$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Fotos/status int/proyectos web 2025 - clientes/status-web/node_modules/next/server.js [app-route] (ecmascript)");
;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@resend.dev";
async function POST(request) {
    try {
        if (!RESEND_API_KEY) {
            console.error("[v0] RESEND_API_KEY not configured");
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Fotos$2f$status__int$2f$proyectos__web__2025__$2d$__clientes$2f$status$2d$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email service not configured"
            }, {
                status: 500
            });
        }
        const data = await request.json();
        if (!data.nombre || !data.telefono || !data.email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Fotos$2f$status__int$2f$proyectos__web__2025__$2d$__clientes$2f$status$2d$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        const emailBody = `
      <h2>Nueva Solicitud de Propuesta Personalizada</h2>
      
      <h3>Datos del Cliente:</h3>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      
      ${data.segment ? `<h3>Evaluación Digital:</h3>
      <p><strong>Segmento:</strong> ${data.segment}</p>
      <p><strong>Nivel de Madurez:</strong> ${data.maturityLevel}</p>
      <p><strong>Puntuación Total:</strong> ${data.score}/9</p>` : ""}
      
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        Este es un email automático de tu formulario de contacto en Tu Consultora Web.
      </p>
    `;
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: [
                    "juanmelendez.pe@gmail.com"
                ],
                from: FROM_EMAIL,
                subject: `Nueva Solicitud de Propuesta - ${data.nombre}`,
                html: emailBody,
                reply_to: data.email
            })
        });
        if (!response.ok) {
            const error = await response.json();
            console.error("[v0] Resend API error:", error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Fotos$2f$status__int$2f$proyectos__web__2025__$2d$__clientes$2f$status$2d$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to send email"
            }, {
                status: 500
            });
        }
        const confirmationResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: [
                    data.email
                ],
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
        `
            })
        });
        if (!confirmationResponse.ok) {
            console.error("[v0] Failed to send confirmation email");
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Fotos$2f$status__int$2f$proyectos__web__2025__$2d$__clientes$2f$status$2d$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Email sent successfully"
        }, {
            status: 200
        });
    } catch (error) {
        console.error("[v0] Contact API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Fotos$2f$status__int$2f$proyectos__web__2025__$2d$__clientes$2f$status$2d$web$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__de4877f0._.js.map
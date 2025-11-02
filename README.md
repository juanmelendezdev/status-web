# Status Web - Documentación de Despliegue

## Descripción del Proyecto
Status Web es una aplicación web moderna construida con Next.js 16.0.0 y React 19.2.0. El proyecto utiliza TypeScript para un desarrollo más robusto y seguro, junto con un conjunto completo de componentes UI basados en Radix UI.

## Requisitos Previos
- Node.js (versión 18.x o superior recomendada)
- PNPM, NPM o Yarn (gestores de paquetes)
- Git

### Instalación de PNPM (Recomendado)
```bash
# Usando NPM
npm install -g pnpm

# Verificar la instalación
pnpm --version
```

## Tecnologías Principales
- Next.js 16.0.0
- React 19.2.0
- TypeScript
- Tailwind CSS
- Radix UI Components
- Zod para validación
- React Hook Form

## Configuración del Entorno de Desarrollo

1. **Clonar el Repositorio**
```bash
git clone https://github.com/juanmelendezdev/status-web.git
cd status-web
```

2. **Instalar Dependencias**
```bash
# Usando PNPM (recomendado)
pnpm install

# O usando NPM
npm install

# O usando Yarn
yarn install
```

3. **Iniciar el Servidor de Desarrollo**
```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## Scripts Disponibles

Con PNPM:
- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Genera la versión de producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter para verificar el código

Con NPM:
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter para verificar el código

Con Yarn:
- `yarn dev` - Inicia el servidor de desarrollo
- `yarn build` - Genera la versión de producción
- `yarn start` - Inicia el servidor de producción
- `yarn lint` - Ejecuta el linter para verificar el código

## Despliegue en Producción

### Opción 1: Despliegue en Vercel (Recomendado)

1. Crear una cuenta en [Vercel](https://vercel.com) si aún no tienes una
2. Conectar tu repositorio de GitHub con Vercel
3. Configurar el proyecto:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
4. Hacer clic en "Deploy"

Vercel detectará automáticamente que es un proyecto Next.js y aplicará la configuración óptima.

### Opción 2: Despliegue Manual

1. Construir la aplicación:
```bash
pnpm build
```

2. Iniciar el servidor de producción:
```bash
pnpm start
```

La aplicación estará disponible en el puerto 3000 por defecto.

## Configuración de Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Resend API para el formulario de contacto
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=tu_email_verificado@tudominio.com
```

### Configuración del Servicio de Email (Resend)

Para que el formulario de contacto funcione correctamente:

1. Crear una cuenta en [Resend](https://resend.com)
2. Obtener tu API Key desde el dashboard de Resend
3. Verificar tu dominio de email en Resend
4. Actualizar las variables de entorno en `.env.local` con tus credenciales reales

## Consideraciones de Seguridad
- La aplicación tiene configurado `typescript.ignoreBuildErrors: true` en `next.config.mjs`. Considerar habilitar las comprobaciones de TypeScript en producción.
- Las imágenes están configuradas como no optimizadas (`images.unoptimized: true`). Considerar habilitar la optimización de imágenes en producción.

## Estructura del Proyecto
```
├── app/               # Directorio principal de Next.js App Router
├── components/        # Componentes reutilizables
│   └── ui/           # Componentes UI basados en Radix
├── hooks/            # Custom hooks
├── lib/              # Utilidades y funciones auxiliares
├── public/           # Archivos estáticos
└── styles/           # Estilos globales
```

## Soporte y Mantenimiento
Para reportar problemas o sugerencias, crear un issue en el repositorio de GitHub.

## Licencia
Proyecto privado - Todos los derechos reservados
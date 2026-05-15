# 🌐 COMO VAS.ES — La Web de Sergio

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![Preact](https://img.shields.io/badge/Preact-10.x-673AB8?logo=preact&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)

> **Sitio web:** [web.comovas.es](https://web.comovas.es)

Sitio web personal y blog de **Sergio R. González** ([@sergiocomovas](https://twitter.com/sergiocomovas)), construido con **Astro** y optimizado para rendimiento, simplicidad y una experiencia de usuario fluida.

---

## 🚀 Stack Tecnológico

- **[Astro](https://astro.build/)** (v5) — Framework SSG principal
- **[Preact](https://preactjs.com/)** (v10) — Componentes interactivos ligeros
- **[Tailwind CSS](https://tailwindcss.com/)** (v3) — Utilidades CSS
- **[MVP.css](https://github.com/microsoft/vscode/tree/main/extensions/css-formatter)** + estilos personalizados — Estética minimalista
- **[Markdown / MDX](https://mdxjs.com/)** — Gestión de contenido
- **[Sharp](https://sharp.pixelplumbing.com/)** — Optimización de imágenes

## 📂 Estructura del Proyecto

```
├── public/           # Archivos estáticos (imágenes, iconos, etc.)
├── src/
│   ├── components/   # Componentes reutilizables (.astro y .tsx)
│   ├── content/      # Colecciones de contenido (blog, blog_ia)
│   ├── layouts/      # Plantillas de diseño
│   ├── pages/        # Rutas y páginas del sitio
│   ├── scripts/      # Scripts JS del lado del cliente
│   └── styles/       # Archivos CSS globales
├── astro.config.mjs  # Configuración de Astro
└── package.json
```

## 📝 Contenido

### Blogs
- **Blog** (`/blog`) — Artículos sobre tecnología, comunicación, salud y desarrollo personal
- **Blog IA** (`/blog_ia`) — Publicaciones sobre inteligencia artificial y automatización

### Páginas
- **Inicio** — Portada con carruseles de ambos blogs
- **Acerca de** (`/acerca`) — Información personal, stack tecnológico y proyectos
- **Aviso Legal** (`/legal`) — Condiciones de uso y política de cookies

### Generación Automática
- **RSS Feed** y **Sitemap** generados automáticamente

## 🧞 Comandos

> ⚠️ Este proyecto usa **pnpm** como gestor de paquetes.

| Comando | Acción |
|:--|:--|
| `pnpm install` | Instala las dependencias |
| `pnpm run dev` | Servidor de desarrollo en `localhost:4321` |
| `pnpm run build` | Compila para producción en `./dist/` |
| `pnpm run preview` | Previsualiza la build localmente |

## ☁️ Despliegue

Desplegado en **GitHub Pages** desde la rama `main`.

## 🔧 Configuración

- **TypeScript**: Modo estricto con `strictNullChecks`
- **Tailwind CSS**: Integración oficial de Astro
- **Content Collections**: Configuradas en `src/content/config.ts`
- **Build**: Ejecuta `astro check` antes de compilar

## 📄 Licencia

Ver archivo [LICENSE](LICENSE) para más información.

---
Hecho con ❤️ por [Sergio R. González](https://web.comovas.es)

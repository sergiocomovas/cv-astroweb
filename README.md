# COMO VAS.ES - La Web de Sergio

Este repositorio contiene el código fuente del sitio web personal y blog de **Sergio R. González** ([@sergiocomovas](https://twitter.com/sergiocomovas)).

El proyecto está construido con **Astro**, priorizando el rendimiento, la simplicidad y una experiencia de usuario fluida.

## 🚀 Tecnologías

Este proyecto utiliza un stack moderno y eficiente:

- **[Astro](https://astro.build/)** (v5.16.10): Framework principal para la generación de sitios estáticos (SSG).
- **[Preact](https://preactjs.com/)** (v10.28.2): Biblioteca ligera compatible con React para componentes interactivos.
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.19): Framework de utilidades CSS para el diseño.
- **[MVP.css / Estilos Personalizados]**: Estilos minimalistas adicionales para una estética limpia.
- **[Markdown / MDX]**: Para la gestión de contenido del blog y páginas estáticas.
- **[Sharp](https://sharp.pixelplumbing.com/)** (v0.34.5): Procesamiento y optimización de imágenes.

## 📂 Estructura del Proyecto

```text
├── public/           # Archivos estáticos (imágenes, iconos, etc.)
├── src/
│   ├── components/   # Componentes reutilizables (.astro y .tsx)
│   ├── content/      # Colecciones de contenido (blog, blog_ia)
│   ├── layouts/      # Plantillas de diseño (Layouts)
│   ├── pages/        # Rutas y páginas del sitio
│   ├── scripts/      # Scripts JS del lado del cliente
│   └── styles/       # Archivos CSS globales
├── astro.config.mjs  # Configuración de Astro
└── package.json      # Dependencias y scripts
```

## 🧞 Comandos

**⚠️ Importante:** Este proyecto utiliza **pnpm** como gestor de paquetes. No usar npm ni yarn.

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`           | Instala las dependencias                         |
| `pnpm run dev`           | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm run build`         | Ejecuta `astro check` y compila el sitio para producción en `./dist/` |
| `pnpm run preview`       | Previsualiza la versión compilada localmente     |

## 📝 Contenido

### Blogs
- **Blog** (`/blog`): Artículos sobre tecnología, comunicación, salud y desarrollo personal.
- **Blog IA** (`/blog_ia`): Publicaciones sobre inteligencia artificial y automatización.

### Páginas
- **Inicio**: Portada con dos carruseles (blog tradicional y blog IA).
- **Acerca de** (`/acerca`): Información personal, stack tecnológico y proyectos pasados (LEGADO).
- **Aviso Legal** (`/legal`): Condiciones de uso, protección de datos y política de cookies.

### Generación Automática
- **RSS Feed**: Generación automática para sindicación.
- **Sitemap**: Generación automática para SEO.

## ☁️ Despliegue

El sitio está configurado para desplegarse en **GitHub Pages** desde la rama `main`.

## 🔧 Configuración

- **TypeScript**: Modo estricto habilitado con `strictNullChecks`.
- **Tailwind CSS**: Configurado a través de la integración oficial de Astro.
- **Content Collections**: Blog y Blog IA configurados en `src/content/config.ts`.
- **Build**: Ejecuta `astro check` antes de compilar para verificar errores de tipos.

## 📄 Licencia

Ver archivo [LICENSE](LICENSE) para más información.

---
Hecho con ❤️ por Sergio R. González.


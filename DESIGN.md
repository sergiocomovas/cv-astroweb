---
version: alpha
name: COMOVAStu Web
description: "Identidad visual de web.comovas.es — personal, técnica, con raíz en MVP.css y overlay de Tailwind. Tema claro/oscuro automático. Persona real, developer, anti-slop."
colors:
  primary: "#118BEE"
  # Tema Claro (light)
  bg-primary: "#FFFFFF"
  bg-secondary: "#E9E9E9"
  text-primary: "#000000"
  text-secondary: "#999999"
  link: "#118BEE"
  link-accent: "#118BEE15"
  secondary: "#920DE9"
  secondary-accent: "#920DE90B"
  shadow: "#F4F4F4"
  table-header: "#118BEE"
  # Tema Oscuro (dark)
  bg-primary-dark: "#112331"
  bg-secondary-dark: "#25455F70"
  text-primary-dark: "#F7F7F7"
  text-secondary-dark: "#AAAAAA"
  link-dark: "#0097FC"
  link-accent-dark: "#0097FC4F"
  secondary-dark: "#E20DE9"
  secondary-accent-dark: "#E20DE94F"
  shadow-dark: "#131D2B"
  table-header-dark: "#0097FC"
  # Acentos Tailwind
  accent-cyan: "#06B6D4"
  accent-cyan-dark: "#0891B2"
  accent-purple: "#A855F7"
  accent-pink: "#EC4899"
typography:
  body:
    fontFamily: "Arial, Atkinson, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  h1:
    fontFamily: "Arial, Atkinson, sans-serif"
    fontSize: "3.052em"
    fontWeight: 700
    lineHeight: 1.5
  h2:
    fontFamily: "Arial, Atkinson, sans-serif"
    fontSize: "2.441em"
    fontWeight: 700
    lineHeight: 1.5
  h3:
    fontFamily: "Arial, Atkinson, sans-serif"
    fontSize: "1.953em"
    fontWeight: 700
    lineHeight: 1.5
  h4:
    fontFamily: "Arial, Atkinson, sans-serif"
    fontSize: "1.563em"
    fontWeight: 700
    lineHeight: 1.5
  h5:
    fontFamily: "Arial, Atkinson, sans-serif"
    fontSize: "1.25em"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  sm: 5px
  md: 10px
  lg: 18px
spacing:
  card: 285px
  card-medium: 460px
  card-wide: 800px
  content-max: 1080px
  card-figure: 283px
  column-width: 317px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg-primary}"
    rounded: "{rounded.sm}"
    padding: "1rem 2rem"
    typography:
      fontWeight: 700
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.bg-primary}"
  card-blog:
    width: "{spacing.card-figure}"
    height: "{spacing.card-figure}"
    rounded: "{rounded.sm}"
  card-blog-selected:
    backgroundColor: "{colors.secondary-accent}"
    rounded: "{rounded.sm}"
  nav-link:
    textColor: "{colors.text-primary}"
    padding: "0.5rem 1rem"
  nav-link-active:
    textColor: "{colors.primary}"
    padding: "0.5rem 1rem"
  scrollbar-thumb:
    backgroundColor: "#CACAE8"
    rounded: "{rounded.sm}"
    width: "10px"
  scrollbar-track:
    backgroundColor: "{colors.bg-secondary}"
---

## Visión General

**web.comovas.es** es la web personal de Sergio R. (@sergiocomovas), developer con base en Palma de Mallorca. La identidad visual nace de **MVP.css v1.14** — un CSS sin clases que estiliza HTML semántico puro — al que se le superponen **Tailwind CSS v4** para utilidades puntuales (grid, flexbox, gradientes, responsive) y una capa personal (`perso.css`) con overrides del tema oscuro, tipografías custom y animaciones.

### Filosofía de diseño

1. **HTML semántico primero.** MVP.css estiliza `<header>`, `<nav>`, `<section>`, `<aside>`, `<article>`, `<blockquote>` sin necesitar clases. La mayoría del contenido se ve bien sin tocar CSS.
2. **Tailwind como supplemento, no como base.** Tailwind se usa solo donde MVP.css no llega: grids responsivos, gradientes de texto, hover states complejos.
3. **Dark mode automático.** Se usa `@media (prefers-color-scheme: dark)` — sin toggle manual. Las variables CSS cambian solas.
4. **Personal pero técnico.** No es una landing corporativa. Es el CV vivo de un developer que prueba tecnologías y las muestra.

### Stack tecnológico

| Capa | Tecnología | Versión actual |
|------|-----------|----------------|
| Framework | Astro | 7.0.6 |
| UI Components | Preact | 10.28.2 |
| CSS Base | MVP.css (adaptado como `mpv.css`) | v1.14 |
| CSS Utilidades | Tailwind CSS | 4.3.2 |
| CSS Personalizado | `perso.css` | — |
| Deploy | GitHub Pages (Astro Actions) | — |
| Fuentes | Atkinson Hyperlegible (woff, self-hosted) | 400 + 700 |

> **⚠️ Nota sobre daisyUI:** El proyecto NO tiene daisyUI en sus dependencias actuales (`package.json`). Si anteriormente se usó, fue eliminado en la migración a Tailwind v4. Los componentes visuales se apoyan en MVP.css + Tailwind utility classes, no en daisyUI.

## Colores

### Tema Claro (light)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#FFFFFF` | Fondo principal de la página |
| `--color-bg-secondary` | `#E9E9E9` | Fondos secundarios, bordes, separadores |
| `--color-text` | `#000000` | Texto principal |
| `--color-text-secondary` | `#999999` | Texto secundario, fechas, captions |
| `--color-link` | `#118BEE` | Enlaces, botones, headers de tabla |
| `--color-accent` | `#118BEE15` | Fondo de hover en tablas, code blocks |
| `--color-secondary` | `#920DE9` | Color de acento (purpura), citas |
| `--color-shadow` | `#F4F4F4` | Sombras de caja |
| `--color-table` | `#118BEE` | Header de tablas |

### Tema Oscuro (dark)

El tema oscuro está definido en `perso.css` y **sobreescribe** los defaults de MVP.css:

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#112331` | Fondo azul oscuro (no negro puro) |
| `--color-bg-secondary` | `#25455F70` | Fondos secundarios translúcidos |
| `--color-text` | `#F7F7F7` | Texto casi blanco |
| `--color-text-secondary` | `#AAAAAA` | Texto secundario gris claro |
| `--color-link` | `#0097FC` | Azul más brillante para contraste |
| `--color-accent` | `#0097FC4F` | Acento translúcido |
| `--color-secondary` | `#E20DE9` | Magenta brillante |
| `--color-shadow` | `#131D2B` | Sombras azul muy oscuro |
| `--color-table` | `#0097FC` | Header de tablas en dark |

### Gradientes (Tailwind)

Estos gradientes se usan en títulos destacados y botones especiales:

- **`from-purple-500 to-pink-500`**: Gradiente principal para títulos de blog y sección IA. Es la "firma" visual de la web.
- **`from-cyan-600`**: Usado en la sección "Open to Work" y bordes de cards de proyectos.
- **`.shine`**: Animación de brillo deslizante (gradient sweep) sobre enlaces destacados. En light usa tonos rosa/azul; en dark usa gris claro sobre azul.

## Tipografía

### Familia tipográfica

```css
font-family: Arial, "Atkinson", sans-serif;
```

- **Arial** como fallback universal (siempre disponible)
- **Atkinson Hyperlegible** como fuente preferida (self-hosted en `/fonts/`)
  - `atkinson-regular.woff` (peso 400)
  - `atkinson-bold.woff` (peso 700)
  - Diseñada por Braille Institute para máxima legibilidad

### Escala tipográfica (escala modular)

La escala sigue una relación ~1.25 (major third), definida en `perso.css`:

| Elemento | Tamaño | Equivalente aprox. |
|----------|--------|-------------------|
| h1 | 3.052em | ~49px |
| h2 | 2.441em | ~39px |
| h3 | 1.953em | ~31px |
| h4 | 1.563em | ~25px |
| h5 | 1.25em | ~20px |
| body | 1rem | 16px |
| line-height | 1.5 | — |

### Peso

- **Normal (400):** cuerpo de texto, fechas, descripciones
- **Bold (700):** títulos, enlaces, botones, énfasis (`<strong>`)

### Detalles

- Los títulos usan `text-wrap: balance` para mejor equilibrio de líneas
- Los enlaces son siempre `font-weight: bold` + `text-decoration: underline` (herencia de MVP.css)
- Las listas (`<ul>`) usan emoji 👉 como bullet personalizado (override en `perso.css`)

## Layout y Espaciado

### Anchos definidos por variables CSS

| Variable | Valor | Uso |
|----------|-------|-----|
| `--width-content` | 1080px | Ancho máximo de `header`, `main`, `footer` |
| `--width-card` | 285px | Ancho de cards estándar (asides) |
| `--width-card-medium` | 460px | Blockquotes |
| `--width-card-wide` | 800px | Forms, code blocks |
| `.figure-container` | 283×283px | Thumbnails de blog posts |
| Columna scroll | 317px | Ancho de cada columna en el carousel horizontal |

### Estructura de la página

```
┌─────────────────────────────────────────┐
│  MenuHorizontalComponent (nav fija)     │
│  SVG wave decorativo (esquina sup.)     │
├─────────────────────────────────────────┤
│  GlobeBackgroundComponent (decorativo)  │
├─────────────────────────────────────────┤
│  EstaWebComponent (carrusel tech)       │
│  [logos: Astro, Preact, TS, Tailwind…]  │
├─────────────────────────────────────────┤
│  ColsComponent (blog posts carousel)    │
│  [scroll horizontal de cards 283px]     │
├─────────────────────────────────────────┤
│  ColsComponent (IA blog posts carousel) │
├─────────────────────────────────────────┤
│  FrontsComponent (Open to Work + APIs)  │
├─────────────────────────────────────────┤
│  IntroLinksComponent                    │
├─────────────────────────────────────────┤
│  FooterComponent (contacto, PSM1)       │
│  CookieComponent                        │
└─────────────────────────────────────────┘
```

### `.row-full` (full-width row)

Patrón CSS para crear una fila que ocupa todo el ancho del viewport dentro de un contenedor con `max-width`:

```css
.row-full {
  width: 100vw;
  position: relative;
  margin-left: -50vw;
  left: 50%;
  height: auto;
}
```

## Efectos Visuales y Animaciones

### `.shine` (brillo deslizante)

Efecto de luz que barre horizontalmente un elemento. Se aplica a enlaces destacados y cards tech:

- **Light mode:** gradiente rosa → azul claro
- **Dark mode:** gradiente azul → blanco translúcido
- **Duración:** 10s, loop infinito, `linear`

### View Transitions

Astro `ClientRouter` + CSS View Transitions API nativa del navegador. Transiciones entre páginas:

| Transición | Duración | Easing |
|-----------|----------|--------|
| Fade out (página vieja) | 90ms | `cubic-bezier(0.4, 0, 1, 1)` |
| Slide to left (salida) | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Fade in (página nueva) | 210ms (con 90ms delay) | `cubic-bezier(0, 0, 0.2, 1)` |
| Slide from right (entrada) | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` |

### Scrollbar personalizada

- **Width:** 10px (override de MVP.css que usa 5px)
- **Thumb:** `rgb(202, 202, 232)` con border-radius 4px
- **Track:** `var(--color-bg-secondary)`
- **Hover:** `rgb(222, 222, 252)` (ligeramente más claro)

### Smooth scroll

```css
html { scroll-behavior: smooth; }
```

Se desactiva con `@media (prefers-reduced-motion: reduce)`.

## Componentes Clave

### Card de Blog (ColsComponent)

Card horizontal con thumbnail + título + botón:

- **Figura:** 283×283px, `background-size: cover`, esquinas superiores redondeadas (5px)
- **Overlay inferior:** gradiente desde `var(--color-accent)` al 25% hasta transparente, altura 100px
- **Estado seleccionado:** borde `var(--color-secondary)` + sombra rosa + título con gradiente purple→pink
- **Botón "Seguir leyendo":** en estado seleccionado usa `bg-gradient-to-r from-purple-500 to-pink-500`

### Card Tech (EstaWebComponent)

Mini-card horizontal con logo + nombre + tipo:

- **Efecto:** `.shine` on hover + `hover:scale-95` en imagen
- **Barra inferior:** gradiente personalizado por tecnología (orange, violet, blue, cyan, yellow, red, gray)
- **Click:** abre `<dialog>` con descripción extendida

### Sección Fronts (Open to Work)

- **Bordes:** `border-cyan-500` con hover `ring-1 ring-cyan-600`
- **Botón principal:** `bg-cyan-600 text-white rounded-full hover:bg-cyan-300 hover:text-black`
- **Logos de proyectos:** grid `grid-cols-2 sm:grid-cols-6`

### Nav (MenuHorizontalComponent)

- **Layout:** flex, `justify-content: space-between`, padding 0.4rem
- **Logo:** 65×65px (`comovas.svg`)
- **Decoración:** SVG wave en esquina superior con `fill: var(--color-shadow)` opacity 0.8
- **Posición:** `transform: translateY(-2rem)` (se solapa con el contenido)

## Estructura de CSS (orden de carga)

Los CSS se cargan en este orden (definido en `BaseHeadComponent.astro`):

1. **`tailwind.css`** — Solo contiene `@import "tailwindcss";` (Tailwind v4 usa import injection via Vite plugin)
2. **`mpv.css`** — MVP.css v1.14 completo con una modificación: el dark mode usa `:root[color-mode="user"]` como selector original (comentado en `perso.css` donde se sobreescribe)
3. **`perso.css`** — Overrides personales: dark mode custom, fuente Atkinson, escala tipográfica, animaciones, scrollbars, cards

> **⚠️ Problema conocido tras actualización a Tailwind v4 + daisyUI:**
> Tailwind v4 cambió de `tailwind.config.js` a configuración CSS-first (`@import "tailwindcss"` + `@theme`). Esto puede romper:
> 1. **El reset/preflight de Tailwind** compitiendo con MVP.css (ambos estilizan elementos base como `body`, `a`, `h1`…)
> 2. **daisyUI** si se añade, porque daisyUI también aplica resets y clases de componente que colisionan con MVP.css
> 3. **La cascada** — el orden de carga importa: si Tailwind se carga después de MVP.css, su preflight puede sobreescribir estilos de MVP.css
>
> **Recomendación:** Al volver a añadir daisyUI, usar `@layer` para controlar la especificidad y asegurar que MVP.css mantiene sus estilos base.

## Funciona / No funciona (Do's and Don'ts)

### ✅ Funciona

- **Usar HTML semántico** (`<section>`, `<aside>`, `<article>`) — MVP.css los estiliza automáticamente
- **Usar variables CSS** (`var(--color-link)`, `var(--color-bg)`, etc.) para cualquier color personalizado
- **Usar clases de Tailwind** para layout, responsive, y gradientes — complementan MVP.css sin romperlo
- **Self-hostear fuentes** (Atkinson en `/fonts/`) — sin dependencias externas de Google Fonts
- **View Transitions** para navegación entre páginas — ya configurado con `ClientRouter`

### ❌ No funciona

- **No mezclar daisyUI con MVP.css sin `@layer`** — los resets colisionan
- **No usar `!important`** salvo en casos muy puntuales (perso.css lo usa en `.shine` y listas)
- **No olvidar el `@media (prefers-color-scheme: dark)`** — el sitio depende del dark mode automático del OS
- **No usar `bg-white` o `text-black` de Tailwind hardcoded** — usar las variables CSS para respetar el tema
- **No añadir fuentes de Google** — el principio es self-hosted, Anti-Google

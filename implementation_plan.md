# Plan de Modernización y Evolución del Proyecto

Este plan detalla los pasos para transformar `cv-astroweb` en una web moderna, visualmente impactante y tecnológicamente actualizada para 2025.

## Objetivos Principales
1.  **Migración Tecnológica**: Reemplazar Preact por React.
2.  **Rediseño Visual**: Crear una nueva Landing Page con estética "Premium".
3.  **Nueva Sección IA**: Añadir un apartado dedicado a Inteligencia Artificial.
4.  **Actualización de Stack**: Eliminar tecnologías obsoletas (CodeIgniter, Knex) y promocionar modernas.
5.  **Mejora de Contenido**: Reescribir publicaciones y actualizar la sección "Usado en esta web".

## Cambios Propuestos

### 1. Migración de Preact a React
Vamos a sustituir la integración de Preact por la de React, que ofrece un ecosistema más robusto y es el estándar de la industria.

#### [MODIFY] `package.json`
- Desinstalar: `@astrojs/preact`, `preact`.
- Instalar: `@astrojs/react`, `react`, `react-dom`, `@types/react`, `@types/react-dom`.

#### [MODIFY] `astro.config.mjs`
- Reemplazar `preact()` por `react()`.

#### [MODIFY] Componentes `.tsx`
- Actualizar importaciones: cambiar `preact/hooks` por `react`.
- Archivos afectados en `src/components/`:
    - `ColsComponent.tsx`
    - `CookieComponent.tsx`
    - `CounterComponent.tsx`
    - `EstaWebComponent.tsx`
    - `KofiComponent.tsx`
    - `LectorComponent.tsx`
    - `LogoComponent.tsx`

### 2. Nueva Landing Page (Premium Design)
Crearemos una portada impactante que capture la atención inmediatamente.

#### [MODIFY] `src/pages/index.astro`
- **Hero Section**: Título grande, tipografía moderna, subtítulo animado.
- **Diseño**: Uso de gradientes, glassmorphism y micro-interacciones.
- **Estructura**:
    - Hero (Bienvenida).
    - Destacados (AI, Blog, Proyectos).
    - Footer minimalista.

### 3. Sección "IA" (Inteligencia Artificial)
Una nueva página para mostrar capacidades y ejemplos de IA.

#### [NEW] `src/pages/ia.astro`
- Ejemplos de generación de texto.
- Galería de generación de imágenes (placeholders o ejemplos estáticos).
- Explicación de prompts y casos de uso.

### 4. Mejora del Apartado API y Frontends
Actualizar `FrontsComponent.astro` para reflejar un stack de 2025.

#### [MODIFY] `src/components/FrontsComponent.astro`
- **Eliminar/Reemplazar**:
    - `CodeIgniter` -> Reemplazar por **Next.js** o **NestJS**.
    - `Knex.js` -> Reemplazar por **Prisma** o **Drizzle ORM**.
- **Añadir**: Tecnologías modernas como **Tailwind CSS** (ya usado), **Docker**, **GraphQL**.

### 5. Mejora "Usado en esta web"
Actualizar `EstaWebComponent.tsx` para que sea más dinámico y refleje el cambio a React.

#### [MODIFY] `src/components/EstaWebComponent.tsx`
- Cambiar "Preact" por "React".
- Añadir detalles sobre el despliegue y optimizaciones recientes.

### 6. Reescritura de Publicaciones
Revisión de estilo y tono de todos los artículos en `src/content/blog/`.
- Se procesarán uno a uno para mejorar la redacción, SEO y formato.

## Plan de Verificación

### Pruebas Automatizadas
- Ejecutar `npm run build` para asegurar que la migración a React no rompe la compilación.
- Verificar que no hay errores de tipos en TypeScript.

### Verificación Manual
- **Navegación**: Comprobar que todos los enlaces funcionan.
- **Interactividad**: Verificar que los componentes React (contadores, diálogos) funcionan correctamente.
- **Diseño**: Validar la nueva estética en versiones móvil y escritorio.

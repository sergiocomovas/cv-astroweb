# AGENTS.md - Directrices de Codificación para cv-astroweb

Este archivo contiene directrices para agentes de codificación que trabajan en este repositorio.

## Comandos de Build, Lint y Test

```bash
pnpm run dev              # Inicia servidor en localhost:4321
pnpm run build            # Ejecuta astro check y build para producción
pnpm run preview          # Previsualiza build localmente
```

**Nota:** Este proyecto usa `astro check` para type checking. No hay framework de tests. Antes de hacer push, asegúrate que `pnpm run build` tenga éxito.

## Tech Stack

- **Astro** - Generador de sitios estáticos con colecciones de contenido
- **Preact** - Biblioteca similar a React (usa preact/compat)
- **TypeScript** - Modo estricto con strictNullChecks
- **Tailwind CSS** - Framework de utilidades CSS
- **MDX** - Markdown con soporte JSX

## Convenciones Generales

- **Usa pnpm para todo.** No usar npm ni yarn
- **TypeScript es obligatorio** en modo estricto
- **Usa siempre Daisy/Tailwind CSS** para estilos
- **Iconos de tabler-icons** - Importación explícita, nunca barrels
- **Preferir ESM y sintaxis moderna** del navegador

## Nombres de Archivos

- Componentes: PascalCase - `CookieComponent.tsx`, `GlobeBackgroundComponent.astro`
- Layouts: PascalCase + Layout - `IndexLayout.astro`
- Páginas: kebab-case o index - `index.astro`, `blog/[...slug].astro`
- Utilidades/constantes: camelCase - `consts.ts`

## Estilo de Importación y Exportación

```typescript
import { useState } from 'preact/hooks';
import BaseHead from '../components/BaseHeadComponent.astro';

const MyComponent = ({ prop }) => { ... };
export default MyComponent;
export const SITE_TITLE = 'My Site';
```

**Mantener estilo de comillas consistente. Preferir comillas simples.**

## Estructura de Componentes

### Preact (.tsx)
```typescript
import { useState } from 'preact/hooks';

const ComponentName = ({ prop = defaultValue }: Props) => {
  const [state, setState] = useState<Type>(initialValue);
  return <div class="tailwind-class">{/* JSX */}</div>;
};
export default ComponentName;
```

### Astro (.astro)
```astro
---
import MyComponent from './MyComponent.tsx';
const { title = 'Default' } = Astro.props;
const data = await fetchData();
---
<MyComponent client:load />
<style>.custom-class { animation: pulse 2s; }</style>
<script>/* JS con alcance */</script>
```

## Directrices de TypeScript

- Tipos explícitos para parámetros y estado complejo
- Permitir inferencia para valores simples
- Definir tipos complejos con `type` al inicio
- Evitar `any` y `unknown`; preferir inferencia
- Siempre verificar null/undefined antes de acceder a propiedades
- Si los tipos no están claros, parar y aclarar antes de continuar

```typescript
type Tecnologia = { name: string; color: string; };
const Component = ({ posts }: { posts: Post[] }) => { ... };
```

## Directrices de Estilos (UI)

1. **Tailwind CSS** - Principal para layout, espaciado, colores
2. **CSS con alcance** - Usar `<style>` para animaciones únicas
3. **Estilos inline** - Solo para valores dinámicos
4. **Nombres de clases** - kebab-case en `<style>`
5. **Daisy/Tailwind es la única solución de estilos**
6. **No duplicar clases** si se puede extraer un componente
7. **Accesibilidad:** HTML semántico, ARIA cuando aplique, foco gestionado

```tsx
<div class="flex justify-between p-4 bg-white">
<style>.custom-anim { animation: pulse 2s; }</style>
<div style={{ width: `${calculatedWidth}px` }}>
```

## Directivas de Hidratación (Astro)

- `client:load` - Cargar inmediatamente
- `client:visible` - Cargar cuando entra al viewport
- `client:idle` - Cargar cuando el navegador está inactivo
- `client:only` - Solo cliente (Preact)
- Sin directiva - HTML estático (default para Astro)

```astro
<PreactComponent client:load />
<StaticAstroComponent />
```

## Colecciones de Contenido

Schema en `src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});
export const collections = { blog };

const posts = (await getCollection("blog"))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

## Manejo de Errores

```typescript
{selectedItem && <Dialog item={selectedItem} />}
<img src={heroImage ?? '/placeholder.png'} alt={title} />
{data?.nested?.property}
```

## Creación de Proyectos

- Usar Astro: `pnpm create astro@latest <project_name>`
- TypeScript en modo estricto desde el inicio
- Añadir Daisy/Tailwind usando integración oficial de Astro
- No añadir dependencias hasta que sean necesarias

## Organización

- Componentes pequeños, con una sola responsabilidad
- Preferir composición frente a configuraciones complejas
- Evita abstracciones prematuras
- Código compartido en carpetas claras: `components`, `layouts`, `lib`, `utils`

## Testing y Calidad

- Revisar workflows de CI en `.github/workflows`
- Ejecutar tests: `pnpm test` o `pnpm turbo run test --filter <project_name>`
- Para Vitest: `pnpm vitest run -t "<nombre del test>"`
- Tras mover archivos o cambiar imports: `pnpm lint`
- **No se acepta código con errores de tipos, lint o tests fallidos**
- Añadir/actualizar tests cuando se cambie comportamiento

## Rendimiento

- **Medir, no adivinar** rendimiento, tamaño de bundle o tiempos de carga
- Añadir instrumentación antes de optimizar si algo parece lento
- Validar primero en pequeño antes de escalar cambios

## Commits y Pull Requests

- Título del PR: `[<project_name>] Descripción clara y concisa`
- **PRs pequeños y enfocados**
- Antes de commitear: `pnpm lint` y `pnpm test`
- Explicar qué cambió, por qué y cómo se verificó
- Documentar nuevas restricciones en este archivo

## Comportamiento del Agente

- Si una petición no está clara, hacer preguntas concretas antes de ejecutar
- Tareas simples y bien definidas se ejecutan directamente
- Cambios complejos requieren confirmar entendimiento antes de actuar
- No asumir requisitos implícitos; pedir información si falta

## Mejores Prácticas

1. Mantener componentes pequeños y enfocados (responsabilidad única)
2. Extraer lógica reusable en custom hooks
3. Usar memoización con moderación (Preact ya está optimizado)
4. HTML accesible - elementos semánticos, etiquetas ARIA
5. Rendimiento - lazy load de componentes, view transitions
6. Comentarios/UI en español

## Estructura del Proyecto

```
src/
├── components/   # Componentes reutilizables Astro y Preact
├── content/      # Posts del blog (Markdown/MDX)
├── layouts/      # Plantillas de página
├── pages/        # Rutas (routing basado en archivos)
├── scripts/      # JavaScript del lado del cliente
├── styles/       # CSS global
└── consts.ts     # Constantes globales
```

## Notas para Agentes

- Sitio personal de blog/portfolio (idioma español)
- Desplegado en GitHub Pages
- Animaciones personalizadas (ej. GlobeBackgroundComponent)
- Orientado a contenido - foco en rendimiento y SEO
- Posts del blog en `src/content/blog/`, imágenes en `public/`
- View transitions habilitadas para navegación fluida

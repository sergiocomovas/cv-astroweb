# PLAN DE IMPLEMENTACIÓN: web.comovas.es

## Contexto
- Repo: `sergiocomovas/cv-astroweb` (branch: develop)
- Stack actual: Astro 7.0.6 + Preact 10.28 + Tailwind 4.3.2 + MVP.css v1.14
- Stack objetivo: Astro 7.0.7 + Preact 10.28 + Tailwind 4.3.2 + daisyUI 5.6.16 + GSAP 3.14
- Eliminar: MVP.css (mpv.css), migrar todo a Tailwind v4 + daisyUI
- DESIGN.md ya creado y validado en el repo

## Versión objetivo
- astro: ^7.0.7
- tailwindcss: ^4.3.2 (ya actualizada)
- daisyui: ^5.6.16 (NUEVA)
- gsap: ^3.14.2 (NUEVA)
- Preact: ^10.28.2 (sin cambios)

## FASE 0: Preparación y base (CRÍTICA)
### 0.1 Actualizar dependencias
- `pnpm add -D daisyui@latest`
- `pnpm add gsap`
- Actualizar astro a 7.0.7

### 0.2 Configurar Tailwind v4 + daisyUI en tailwind.css
```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
  logs: false;
}
```

### 0.3 Definir tema daisyUI custom basado en DESIGN.md
Usar `@plugin "daisyui/theme"` con los colores del DESIGN.md:
- Light: bg #FFFFFF, primary #118BEE, secondary #920DE9
- Dark: bg #112331, primary #0097FC, secondary #E20DE9

### 0.4 Eliminar mpv.css
- Borrar `src/styles/mpv.css`
- Quitar import de `BaseHeadComponent.astro`

### 0.5 Reescribir perso.css con @layer
Migrar a `@layer` de Tailwind:
- @font-face Atkinson (mantener)
- Dark mode vars → ahora gestionadas por daisyUI themes
- .shine animation (mantener)
- View Transitions CSS (mantener)
- Scrollbars custom (mantener)
- Escala tipográfica (mantener pero con utilities de Tailwind)

## FASE 1: Layouts (CSS Grid)
### 1.1 Rehacer IndexLayout.astro
- CSS Grid: `grid-template-rows: auto 1fr auto` (header/main/footer)
- `overflow-x-hidden` garantizado en `<html>`
- Mantener `<Menu />`, `<GlobeBackgroundComponent />`, `<EstaWeb>`, `<Cols>`, `<Fronts />`, `<IntroLinks />`, `<Footer />`

### 1.2 Rehacer BlogLayout.astro
- CSS Grid responsive: `grid-template-columns: 30% 65%` desktop, 1 columna móvil
- `gap` entre aside y article
- `overflow-x-hidden`
- aside sticky con `position: sticky; top: 0`

### 1.3 Toggle de tema en footer
- Botón daisyUI en `FooterComponent`
- JS mínimo para alternar `data-theme` en `<html>`

### 1.4 Verificar AboutLayout.astro
- Mismo patrón que BlogLayout

## FASE 2: Header con SVG diagonal
### 2.1 Rehacer MenuHorizontalComponent.astro
- Mantener SVG wave: `<path fill="var(--color-shadow)" d="M0,128L1440,32L1440,0L0,0Z">`
  - En daisyUI: usar `fill-primary/20` o color del tema
- Logo `comovas.svg` 65×65px
- Botones daisyUI `btn btn-ghost` con aspecto MVP.css
- Props dinámicas: cada layout pasa su array de links

## FASE 3: Hero (globo + logo)
### 3.1 Mantener GlobeBackgroundComponent.astro
- Tal cual, incluyendo el script con eval()
### 3.2 Logo overlay
- Asegurar z-index correcto del logo sobre el canvas del globo

## FASE 4: Carruseles
### 4.1 ColsComponent.tsx (blog) - Card grande con botones
- Cards: `card image-full` daisyUI con imagen de fondo + overlay
- Botones circulares: `btn btn-circle` con SVG flechas, `hidden md:flex`
- Scroll: `snap-x snap-mandatory scroll-smooth`
- View Transitions: MANTENER `view-transition-name` dinámico
- Spacer izquierdo: `flex-none w-4 md:w-8`

### 4.2 EstaWebComponent.tsx (tech) - Card pequeña con hover scroll
- Cards: `card bg-base-200 border-base-300 w-80`
- Navegación: `onWheel` (rueda del ratón)
- Efecto .shine: MANTENER
- Popup: `<dialog>` con clases daisyUI
- Spacer izquierdo: `flex-none w-4 md:w-8`

### 4.3 Componente Aura (NUEVO)
- Usar `aura` de daisyUI en la card destacada/hero de cada carrusel
- Estilo: `aura aura-glow` o `aura aura-dual` con `text-primary`

## FASE 5: Secciones estáticas
### 5.1 FrontsComponent.astro
- Cards daisyUI: `card bg-base-200 border-base-300`
- Mantener: sección inglés (Preply), sección backend, open-to-work
- Botones: `btn btn-primary` en cyan del DESIGN.md

### 5.2 FooterComponent.astro
- PSM1 badge (mantener)
- Ko-fi link (mantener)
- Correo (mantener)
- NUEVO: Toggle de tema (theme-controller)

### 5.3 IntroLinksComponent.astro
- Limpiar estilos, usar daisyUI

## FASE 6: GSAP ( opcional / selectivo)
### 6.1 Instalar GSAP
- `pnpm add gsap` (ya en Fase 0)

### 6.2 Animaciones de entrada (opcional)
- `gsap.fromTo` en secciones: fade + slide up al entrar viewport
- Usar ScrollTrigger

### 6.3 GSAP para header (evaluar)
- Posible uso para menú sticky con animación
- NO usar para scroll horizontal de carruseles (ya hay snap scroll nativo)

## FASE 7: Limpieza y validación
### 7.1 Build check
- `pnpm build` sin errores

### 7.2 Auditoría responsive
- Verificar móvil (<768px) y desktop en ambos temas

### 7.3 Auditoría visual
- Comparar con web actual: ¿se mantiene la esencia?
- Screenshots en ambos temas

### 7.4 Eliminar CSS muerto
- Buscar clases/variables CSS sin usar tras migración

## ORDEN DE EJECUCIÓN
1. Fase 0 (base) → build check
2. Fase 1 (layouts) → build check
3. Fase 2 (header) → build check
4. Fase 3 (hero) → build check
5. Fase 4 (carruseles) → build check
6. Fase 5 (secciones) → build check
7. Fase 6 (GSAP) → build check
8. Fase 7 (validación final)

## NOTAS IMPORTANTES
- daisyUI Aura = componente de iluminación de bordes (`aura aura-glow`)
- Usar `@layer` en perso.css para evitar colisiones
- MVP.css se ELIMINA, no se mantiene
- View Transitions y .shine se MANTIENEN
- Toggle de tema va en el FOOTER, no en header
- GSAP es selectivo: evaluar caso por caso si añade valor

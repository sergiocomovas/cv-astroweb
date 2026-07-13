import { useState } from "preact/hooks";

const EstaWeb = () => {
  type Tecnologia = {
    name: string;
    color: string;
    tumb: string;
    tipo: string;
    descripcion: string;
    meGusta: string;
    tecnologiaUsadaPor: string;
  };

  const coso: Tecnologia[] = [
    {
      name: "Astro 7.0",
      color: "from-orange-500",
      tumb: "astro.svg",
      tipo: "Arquitectura FrontEnd",
      descripcion: "Astro 7.0 (julio 2026) es un marco de trabajo para la construcción de sitios web modernos y rápidos. Su compilador ahora está escrito en Rust.",
      meGusta: "Por su arquitectura clásica MPA y la propiedad de hidratación.",
      tecnologiaUsadaPor: "Futura promesa tecnológica",
    },
    {
      name: "Preact",
      color: "from-violet-600",
      tumb: "preact.svg",
      tipo: "Biblioteca FrontEnd",
      descripcion: "Preact es una biblioteca de interfaz de usuario para construir interfaces modernas y eficientes.",
      meGusta: "Equivalente libre a React. Tamaño pequeño, signals y rendimiento.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "TypeScript",
      color: "from-blue-700",
      tumb: "typescript.svg",
      tipo: "Lenguaje de Programación",
      descripcion: "TypeScript es un superset de JavaScript que agrega tipado estático opcional.",
      meGusta: "Por su capacidad para detectar errores en tiempo de compilación.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "Tailwind + daisyUI",
      color: "from-cyan-300",
      tumb: "tailwind.svg",
      tipo: "Framework de CSS",
      descripcion: "Tailwind CSS v4 + daisyUI 5. CSS-first config, componentes semánticos.",
      meGusta: "Por facilidad de uso y trabajo conjunto con cualquier hoja de estilo CSS.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "View Transitions",
      color: "from-yellow-400",
      tumb: "canary.svg",
      tipo: "Técnica FrontEnd",
      descripcion: "View Transitions API nativa del navegador para transiciones suaves entre páginas.",
      meGusta: "Por su capacidad para mejorar la experiencia con animaciones profesionales.",
      tecnologiaUsadaPor: "Exclusividad",
    },
    {
      name: "GSAP",
      color: "from-green-500",
      tumb: "gsap.svg",
      tipo: "Biblioteca de Animación",
      descripcion: "GreenSock Animation Platform. El estándar de la industria para animaciones web.",
      meGusta: "Por ScrollTrigger, timelines y control total de animaciones.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "Git",
      color: "from-red-500",
      tumb: "git.svg",
      tipo: "Sistema de Control de Versiones",
      descripcion: "Git es un sistema de control de versiones distribuido para rastrear cambios en el código.",
      meGusta: "Por su capacidad para gestionar eficientemente las versiones de código.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "GitHub Pages",
      color: "from-gray-900",
      tumb: "github.svg",
      tipo: "Servicio de Alojamiento",
      descripcion: "GitHub Pages permite alojar sitios web directamente desde tu repositorio de GitHub.",
      meGusta: "Por su facilidad de uso e integración con repositorios GitHub.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Tecnologia | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mostrarSiguienteItem = () => {
    const nextIndex = (currentIndex + 1) % coso.length;
    setCurrentIndex(nextIndex);
    abrirDialogo(coso[nextIndex]);
  };

  const abrirDialogo = (item: Tecnologia) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };
  const cerrarDialogo = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  // Duplicar para loop infinito
  const duplicated = [...coso, ...coso];

  return (
    <>
      <div class="marqy w-full" data-direction="right" data-pause-on-hover>
        <div class="marqy-inner">
          {duplicated.map((item, index) => (
            <div class="marqy-content">
              <aside
                key={`${item.name}-${index}`}
                onClick={() => abrirDialogo(item)}
                class="shine cursor-pointer flex-shrink-0 w-[280px] mx-2 p-4 bg-white/5 border border-white/10 rounded-lg transition-all duration-150 hover:border-primary hover:bg-white/10"
              >
                <div class="flex items-center gap-3">
                  <img
                    alt={item.name}
                    src={`logos_back_2024/${item.tumb}`}
                    class="h-12 w-12 rounded-lg object-cover"
                  />
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-sm truncate">{item.name}</h3>
                    <span class={`inline-block text-xs px-2 py-0.5 rounded mt-1 bg-gradient-to-r ${item.color} to-purple-600 text-white`}>
                      {item.tipo}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <dialog open={dialogOpen} class="modal modal-open p-4">
          <div class="modal-box bg-base-200 border border-white/10 max-w-md">
            <h2 class={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${selectedItem.color} to-gray-900`}>
              {selectedItem.name}
            </h2>
            <div class={`bg-gradient-to-r ${selectedItem.color} to-gray-900 text-white rounded p-2 my-2 text-center text-sm`}>
              <span class="font-semibold">Stack seleccionado por:</span> {selectedItem.tecnologiaUsadaPor}
            </div>
            <p class="font-semibold text-sm mt-2">👉 {selectedItem.descripcion}</p>
            <p class="text-sm mt-1">💖 <span class="font-bold">Me gusta por:</span> {selectedItem.meGusta}</p>
            <div class="modal-action">
              <button onClick={cerrarDialogo} class="btn btn-sm">Cerrar</button>
              <button onClick={mostrarSiguienteItem} class="btn btn-sm btn-primary">Siguiente</button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop"><button onClick={cerrarDialogo}>close</button></form>
        </dialog>
      )}
    </>
  );
};

export default EstaWeb;

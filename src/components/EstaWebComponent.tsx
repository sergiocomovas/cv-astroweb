import { useState, useRef } from "preact/hooks";

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
      name: "Astro",
      color: "from-orange-500",
      tumb: "astro.svg",
      tipo: "Arquitectura FrontEnd",
      descripcion:
        "Astro es un marco de trabajo para la construcción de sitios web modernos y rápidos.",
      meGusta: "Por su arquitectura clásica MPA y la propiedad de hidratación.",
      tecnologiaUsadaPor: "Futura promesa tecnologíca",
    },
    {
      name: "Preact",
      color: "from-violet-600",
      tumb: "preact.svg",
      tipo: "Biblioteca FrontEnd",
      descripcion:
        "Preact es una biblioteca de interfaz de usuario para construir interfaces de usuario modernas y eficientes.",
      meGusta:
        "Equivalente libre a React. Destaca su tamaño pequeño, uso de signals y su rendimiento eficiente.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "TypeScript",
      color: "from-blue-700",
      tumb: "typescript.svg",
      tipo: "Lenguaje de Programación",
      descripcion:
        "TypeScript es un superset de JavaScript que agrega tipado estático opcional al lenguaje.",
      meGusta:
        "Por su capacidad para detectar errores en tiempo de compilación.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "Tailwind",
      color: "from-cyan-300",
      tumb: "tailwind.svg",
      tipo: "Framework de CSS",
      descripcion:
        "Tailwind CSS es un marco de trabajo utilitario de CSS de bajo nivel para construir interfaces de usuario.",
      meGusta: "Por facilidad de uso al centrar elementos. Además trabaja conjunto con cualquier hojas de estilo CSS",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "View Transitions",
      tipo: "Técnica FrontEnd",
      color: "from-yellow-400",
      tumb: "canary.svg",
      descripcion:
        "View Transitions es una técnica para crear transiciones suaves entre vistas en aplicaciones web.",
      meGusta: "Por su capacidad para mejorar la experiencia del usuario.",
      tecnologiaUsadaPor: "Exclusividad",
    },
    {
      name: "Git",
      tipo: "Sistema de Control de Versiones",
      color: "from-red-500",
      tumb: "git.svg",
      descripcion:
        "Git es un sistema de control de versiones distribuido, utilizado para rastrear cambios en el código fuente durante el desarrollo de software.",
      meGusta:
        "Por su capacidad para gestionar eficientemente las versiones de código.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
    {
      name: "GitHub Pages",
      tipo: "Servicio de Alojamiento",
      color: "from-gray-900",
      tumb: "github.svg",
      descripcion:
        "GitHub Pages es un servicio que permite alojar sitios web directamente desde tu repositorio de GitHub.",
      meGusta:
        "Por su facilidad de uso y su integración con repositorios de GitHub.",
      tecnologiaUsadaPor: "Nivel máximo de Empleabilidad 2024",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Tecnologia | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mostrarSiguienteItem = () => {
    const nextIndex = (currentIndex + 1) % coso.length;
    setCurrentIndex(nextIndex);
    abrirDialogo(coso[nextIndex]);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;

    if (containerRef.current) {
      containerRef.current.scrollLeft += delta;
    }

    // Evitar que el evento se propague y afecte el desplazamiento vertical
    e.stopPropagation();
  };

  const abrirDialogo = (item: Tecnologia) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };
  const cerrarDialogo = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <style>
        {`
        .componente{
            background-color:transparent;
            }
          button{
            border:none;
          }
        `}
      </style>

      <section>
        <h3 class="hidden md:block font-bold p-0 -mb-5 -m-2">
          Usado en esta web
        </h3>

        <div
          ref={containerRef}
          class="movimiento flex overflow-x-auto space-x-4 pr-3 opacity-80 hover:opacity-100 transition-opacity"
          onWheel={handleWheel}
        >
          {coso.map((item) => (
            <aside
              key={item.name}
              onClick={() => abrirDialogo(item)}
              class="shine cursor-pointer flex-shrink-0  w-2/5 h-22 transition-border relative block overflow-hidden rounded-lg border border-gray-100 p-4 duration-300 hover:border-purple-600 hover:border-transparent hover:shadow-inner hover:shadow-purple-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-purple-300 dark:hover:shadow-inner dark:hover:shadow-blue-700"
            >
              <span
                className={`absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r ${item.color} via-blue-500 dark:via-fuchsia-700 to-purple-600`}
              ></span>

              <div class="sm:flex sm:justify-between sm:gap-4">
                <img
                  alt={item.name}
                  src={`logos_back_2024/${item.tumb}`}
                  class="h-20 w-20 transform rounded-lg object-cover shadow-sm transition-transform hover:scale-95"
                />
                <div class="w-full overflow-auto">
                  <h3 class="w-full truncate overflow-ellipsis text-lg font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <button
                    className={`w-full transform truncate overflow-ellipsis rounded-lg bg-gradient-to-r ${item.color} via-blue-500 dark:via-fuchsia-700 to-purple-600 p-2.5  text-slate-50 transition-transform hover:scale-95 dark:bg-gray-700 dark:hover:bg-purple-800`}
                  >
                    {item.tipo}
                  </button>
                </div>
              </div>
            </aside>
          ))}
        </div>
      </section>
      {selectedItem && (
        <dialog open={dialogOpen} class="dialog p-3 w-full h-50 md:w-auto">
          <div class="h-80 overflow-y-auto">
            <h2
              class={`text-lg2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${selectedItem.color}  to-gray-900 `}
            >
              {selectedItem.name}
            </h2>
            <div
              className={`bg-gradient-to-r ${selectedItem.color} to-gray-900 text-blue-100 rounded p-1 flex items-center justify-center h-auto`}
            >
              <p class="text-center">
                Stack seleccionado por: {selectedItem.tecnologiaUsadaPor}
              </p>
            </div>

            <p class="font-semibold">{selectedItem.descripcion}</p>
            <p>Me gusta por: {selectedItem.meGusta}</p>
          </div>
          <button onClick={cerrarDialogo}>Cerrar</button>
          <button
            onClick={mostrarSiguienteItem}
            class=" float-right hidden md:block"
          >
            Siguiente
          </button>
        </dialog>
      )}
    </>
  );
};

export default EstaWeb;

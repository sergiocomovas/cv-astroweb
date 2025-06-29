import { signal, computed, useSignalEffect } from "@preact/signals";
import { useRef } from "preact/hooks";

// --- Tipos y Constantes fuera del componente ---
// Se evita redeclarar en cada renderizado y se hace más legible.
type Tecnologia = {
  name: string;
  color: string;
  tumb: string;
  tipo: string;
  descripcion: string;
  meGusta: string;
  tecnologiaUsadaPor: string;
};

const currentYear = new Date().getFullYear();

// --- Datos estáticos ---
// Se pueden mantener fuera del componente si no dependen de props o estado.
const tecnologias: Tecnologia[] = [
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
      tecnologiaUsadaPor: `Nivel máximo de Empleabilidad ${currentYear}`,
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
      tecnologiaUsadaPor: `Nivel máximo de Empleabilidad ${currentYear}`,
    },
    {
      name: "Tailwind",
      color: "from-cyan-300",
      tumb: "tailwind.svg",
      tipo: "Framework de CSS",
      descripcion:
        "Tailwind CSS es un marco de trabajo utilitario de CSS de bajo nivel para construir interfaces de usuario.",
      meGusta: "Por facilidad de uso al centrar elementos. Además trabaja conjunto con cualquier hojas de estilo CSS",
      tecnologiaUsadaPor: `Nivel máximo de Empleabilidad ${currentYear}`,
    },
    {
      name: "View Transitions",
      tipo: "Técnica FrontEnd",
      color: "from-yellow-400",
      tumb: "canary.svg",
      descripcion:
        "View Transitions es una técnica para crear transiciones suaves entre vistas en aplicaciones web.",
      meGusta: "Por su capacidad para mejorar la experiencia del usuario con animaciones profesionales.",
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
      tecnologiaUsadaPor: `Nivel máximo de Empleabilidad ${currentYear}`,
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
      tecnologiaUsadaPor: `Nivel máximo de Empleabilidad ${currentYear}`,
    },
    {
      name: "Bolt",
      tipo: "IDE en la Nube",
      color: "from-purple-500",
      tumb: "bolt-placeholder.svg", 
      descripcion:
        "Bolt es un IDE en la nube potenciado por StackBlitz que permite desarrollar aplicaciones web completas directamente en el navegador.",
      meGusta:
        "Por su capacidad de crear aplicaciones completas sin configuración local, con IA integrada y despliegue instantáneo.",
      tecnologiaUsadaPor: `Innovación y Productividad ${currentYear + 1}`,
    },
];


// --- Componente ---
const EstaWeb = () => {
  // --- Signals para el estado ---
  const selectedIndex = signal<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // --- Computed Signal ---
  // Deriva el estado a partir de otras signals. Es más eficiente.
  const selectedItem = computed<Tecnologia | null>(() => {
    if (selectedIndex.value === null) return null;
    return tecnologias[selectedIndex.value];
  });

  // --- Funciones para manejar el estado ---
  const abrirDialogo = (index: number) => {
    selectedIndex.value = index;
  };

  const cerrarDialogo = () => {
    selectedIndex.value = null; 
  };
  
  const mostrarSiguienteItem = () => {
    if (selectedIndex.value !== null) {
      const nextIndex = (selectedIndex.value + 1) % tecnologias.length;
      selectedIndex.value = nextIndex;
    }
  };

  // --- Efecto para controlar el diálogo ---
  // useSignalEffect se ejecuta cuando las signals que usa cambian.
  useSignalEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (selectedItem.value && !dialog.open) {
        dialog.showModal();
      } else if (!selectedItem.value && dialog.open) {
        dialog.close();
      }
    }
  });

  return (
    <>
      <section>
        <h3 class="hidden md:block font-bold p-0 -mb-5 -m-2">
          Usado en esta web
        </h3>

        <div
          class="flex overflow-x-auto space-x-4 pr-3 py-4 opacity-80 hover:opacity-100 transition-opacity"
        >
          {tecnologias.map((item, index) => (
            <aside
              key={item.name}
              onClick={() => abrirDialogo(index)}
              class="shine cursor-pointer flex-shrink-0 w-2/5 h-22 transition-border relative block overflow-hidden rounded-lg border border-gray-100 p-4 duration-300 hover:border-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-purple-300"
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
                  <div // Usamos un div en lugar de un botón si no es clickeable
                    className={`w-full text-center truncate overflow-ellipsis rounded-lg bg-gradient-to-r ${item.color} via-blue-500 dark:via-fuchsia-700 to-purple-600 p-2.5 text-slate-50 transition-transform hover:scale-95 dark:bg-gray-700`}
                  >
                    {item.tipo}
                  </div>
                </div>
              </div>
            </aside>
          ))}
        </div>
      </section>

      {/* El diálogo ahora se renderiza siempre, pero su visibilidad la controla su estado interno (open/closed) */}
      <dialog ref={dialogRef} onClose={cerrarDialogo} class="dialog p-3 w-full h-auto md:w-auto rounded-lg shadow-xl dark:bg-gray-800 dark:text-white">
        {/* Usamos un .value para acceder al valor de la signal computada */}
        {selectedItem.value && (
           <>
            <div class="h-90 overflow-y-auto">
              <h2
                class={`text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${selectedItem.value.color} to-gray-900 `}
              >
                {selectedItem.value.name}
              </h2>
              <div
                className={`my-2 bg-gradient-to-r ${selectedItem.value.color} to-gray-900 text-blue-100 rounded p-1 flex items-center justify-center h-auto`}
              >
                <p class="text-center">
                  <span class="font-semibold">Stack seleccionado por:</span> {selectedItem.value.tecnologiaUsadaPor}
                </p>
              </div>

              <p class="font-semibold my-2">👉 {selectedItem.value.descripcion}</p>
              <p class="my-2">💖 <span class="font-extrabold">Me gusta por:</span> {selectedItem.value.meGusta}</p>
              <p class="my-2">x <span class="hidden md:block font-extrabold">Enlace relacionado:</span> <a href="" target="_blank" class="text-blue-500 hover:underline">Tengo nueva web ¡y te lo cuento! &nearr;</a></p>
            </div>
            <div class="mt-4 flex justify-between">
                <button onClick={cerrarDialogo} class="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500">Cerrar</button>
                <button
                    onClick={mostrarSiguienteItem}
                    class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                    Siguiente
                </button>
            </div>
           </>
        )}
      </dialog>
    </>
  );
};

export default EstaWeb;
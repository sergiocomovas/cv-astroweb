import { useState, useRef } from 'preact/hooks';

type Tecnologia = {
  name: string;
  color: string;
  tumb: string;
  tipo: string;
  descripcion: string;
  meGusta: string;
  tecnologiaUsadaPor: string;
};

const EstaWeb = () => {
  const coso: Tecnologia[] = [
    {
      name: 'Astro 7.0',
      color: 'from-orange-500',
      tumb: 'astro.svg',
      tipo: 'Arquitectura FrontEnd',
      descripcion:
        'Astro 7.0 (julio 2026) es un marco de trabajo para la construcción de sitios web modernos y rápidos. Su compilador ahora está escrito en Rust, con builds 15-61% más rápidos.',
      meGusta: 'Por su arquitectura clásica MPA y la propiedad de hidratación.',
      tecnologiaUsadaPor: 'Futura promesa tecnológica',
    },
    {
      name: 'Preact',
      color: 'from-violet-600',
      tumb: 'preact.svg',
      tipo: 'Biblioteca FrontEnd',
      descripcion:
        'Preact es una biblioteca de interfaz de usuario para construir interfaces de usuario modernas y eficientes.',
      meGusta:
        'Equivalente libre a React. Destaca su tamaño pequeño, uso de signals y su rendimiento eficiente.',
      tecnologiaUsadaPor: 'Nivel máximo de Empleabilidad 2024',
    },
    {
      name: 'TypeScript',
      color: 'from-blue-700',
      tumb: 'typescript.svg',
      tipo: 'Lenguaje de Programación',
      descripcion:
        'TypeScript es un superset de JavaScript que agrega tipado estático opcional al lenguaje.',
      meGusta: 'Por su capacidad para detectar errores en tiempo de compilación.',
      tecnologiaUsadaPor: 'Nivel máximo de Empleabilidad 2024',
    },
    {
      name: 'Tailwind',
      color: 'from-cyan-300',
      tumb: 'tailwind.svg',
      tipo: 'Framework de CSS',
      descripcion:
        'Tailwind CSS es un marco de trabajo utilitario de CSS de bajo nivel para construir interfaces de usuario.',
      meGusta: 'Por facilidad de uso al centrar elementos. Además trabaja conjunto con cualquier hoja de estilo CSS',
      tecnologiaUsadaPor: 'Nivel máximo de Empleabilidad 2024',
    },
    {
      name: 'View Transitions',
      tipo: 'Técnica FrontEnd',
      color: 'from-yellow-400',
      tumb: 'canary.svg',
      descripcion:
        'View Transitions es una técnica para crear transiciones suaves entre vistas en aplicaciones web.',
      meGusta: 'Por su capacidad para mejorar la experiencia del usuario con animaciones profesionales.',
      tecnologiaUsadaPor: 'Exclusividad',
    },
    {
      name: 'Git',
      tipo: 'Sistema de Control de Versiones',
      color: 'from-red-500',
      tumb: 'git.svg',
      descripcion:
        'Git es un sistema de control de versiones distribuido, utilizado para rastrear cambios en el código fuente durante el desarrollo de software.',
      meGusta: 'Por su capacidad para gestionar eficientemente las versiones de código.',
      tecnologiaUsadaPor: 'Nivel máximo de Empleabilidad 2024',
    },
    {
      name: 'GitHub Pages',
      tipo: 'Servicio de Alojamiento',
      color: 'from-gray-900',
      tumb: 'github.svg',
      descripcion:
        'GitHub Pages es un servicio que permite alojar sitios web directamente desde tu repositorio de GitHub.',
      meGusta: 'Por su facilidad de uso y su integración con repositorios de GitHub.',
      tecnologiaUsadaPor: 'Nivel máximo de Empleabilidad 2024',
    },
  ];

  const [selectedItem, setSelectedItem] = useState<Tecnologia | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mostrarSiguienteItem = () => {
    const nextIndex = (currentIndex + 1) % coso.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(coso[nextIndex]);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    if (containerRef.current) {
      containerRef.current.scrollLeft += delta;
    }
    e.stopPropagation();
  };

  const abrirDialogo = (item: Tecnologia, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const cerrarDialogo = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section>
        <h3 class="hidden md:block font-bold p-0 -mb-5 -m-2">
          Usado en esta web
        </h3>

        <div
          ref={containerRef}
          class="flex overflow-x-auto gap-4 pr-3 opacity-80 hover:opacity-100 transition-opacity snap-x snap-mandatory"
          onWheel={handleWheel}
        >
          {/* Spacer izquierdo */}
          <div class="flex-none w-4 md:w-8"></div>

          {coso.map((item, index) => (
            <div
              key={item.name}
              onClick={() => abrirDialogo(item, index)}
              class="shine cursor-pointer flex-shrink-0 w-80 snap-start card bg-base-200 border border-base-300 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div class="card-body p-4 relative overflow-hidden">
                {/* Barra inferior con gradiente de la tecnología */}
                <span class={`absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r ${item.color} via-blue-500 to-purple-600`}></span>

                <div class="flex justify-between gap-4">
                  <img
                    alt={item.name}
                    src={`logos_back_2024/${item.tumb}`}
                    class="h-20 w-20 rounded-lg object-cover shadow-sm transition-transform hover:scale-95"
                  />
                  <div class="w-full overflow-hidden">
                    <h3 class="text-lg font-bold truncate">
                      {item.name}
                    </h3>
                    <div class={`w-full truncate rounded-lg bg-gradient-to-r ${item.color} via-blue-500 to-purple-600 p-2 text-slate-50`}>
                      {item.tipo}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer derecho */}
          <div class="flex-none w-4 md:w-8"></div>
        </div>
      </section>

      {/* Dialog daisyUI */}
      {selectedItem && (
        <dialog class="modal modal-open" onClick={cerrarDialogo}>
          <div class="modal-box" onClick={(e: Event) => e.stopPropagation()}>
            <h2 class={`text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${selectedItem.color} to-base-content`}>
              {selectedItem.name}
            </h2>
            <div class={`bg-gradient-to-r ${selectedItem.color} to-base-content text-base-100 rounded p-2 flex items-center justify-center my-2`}>
              <p class="text-center">
                <span class="font-semibold">Stack seleccionado por:</span> {selectedItem.tecnologiaUsadaPor}
              </p>
            </div>
            <p class="font-semibold py-1">👉 {selectedItem.descripcion}</p>
            <p class="py-1">💖 <span class="font-extrabold">Me gusta por:</span> {selectedItem.meGusta}</p>
            <p class="py-1">🔗 <span class="font-extrabold">Enlace relacionado:</span> <a href="https://www.linkedin.com/pulse/tengo-nueva-web-y-te-lo-cuento-sergio-r-gonz%C3%A1lez%3FtrackingId=%2BEO0gQ%2BTScqjhfPlOOniPw%3D%3D" target="_blank" class="link link-primary">Tengo nueva web ¡y te lo cuento! ↗</a></p>
            <div class="modal-action">
              <button class="btn btn-sm" onClick={cerrarDialogo}>Cerrar</button>
              <button class="btn btn-sm btn-primary hidden md:block" onClick={mostrarSiguienteItem}>Siguiente</button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button onClick={cerrarDialogo}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default EstaWeb;

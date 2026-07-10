import { useState, useEffect } from 'preact/hooks';

interface Post {
  id: string;
  data: {
    title: string;
    description: string;
    heroImage?: string;
  };
}

interface Props {
  posts: Post[];
  basePath?: string;
}

const ColsComponent = ({ posts, basePath = '/blog' }: Props) => {
  const [selectedColumn, setSelectedColumn] = useState(1);

  const changeColumn = (direction: number) => {
    const blogElement = document.getElementById('blog');
    if (blogElement) {
      blogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const newColumn = selectedColumn + direction;
    if (newColumn >= 1 && newColumn <= posts.length) {
      setSelectedColumn(newColumn);
    }
  };

  const seleccionarCol = (index: number) => {
    setSelectedColumn(index + 1);
  };

  useEffect(() => {
    const storedPosition = localStorage.getItem('selectedColumnPosition');
    if (storedPosition) {
      setSelectedColumn(parseInt(storedPosition, 10) / 317 + 1);
    }
  }, []);

  useEffect(() => {
    const columnsContainer = document.getElementById('columns-container');
    if (columnsContainer) {
      const selectedColumnPosition = (selectedColumn - 1) * 317;
      columnsContainer.scrollLeft = selectedColumnPosition;
      localStorage.setItem('selectedColumnPosition', selectedColumnPosition.toString());
    }
  }, [selectedColumn]);

  const scrollByAmount = (direction: number) => {
    const container = document.getElementById('columns-container');
    if (container) {
      container.scrollBy({ left: direction * 317, behavior: 'smooth' });
    }
  };

  return (
    <div id="blog" class="relative">
      {/* Botones de navegación circulares (solo desktop) */}
      <div class="hidden md:flex justify-end gap-2 mb-4">
        <button
          onClick={() => scrollByAmount(-1)}
          class="btn btn-circle btn-ghost"
          aria-label="Anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scrollByAmount(1)}
          class="btn btn-circle btn-ghost"
          aria-label="Siguiente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carrusel con snap scroll */}
      <div
        id="columns-container"
        class="row-full flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 pb-4"
      >
        {/* Spacer izquierdo */}
        <div class="flex-none w-4 md:w-8"></div>

        {posts.map((x, index) => {
          const isSelected = selectedColumn === index + 1;
          return (
            <div
              key={x.id}
              class="flex-none w-[283px] snap-start"
            >
              <div
                class={`card w-[283px] h-[515px] cursor-pointer transition-all duration-300 ${
                  isSelected ? 'border-2 border-secondary shadow-lg shadow-secondary/30' : 'border border-base-300 shadow-md'
                } bg-base-200`}
                onClick={() => seleccionarCol(index)}
              >
                {/* Imagen de fondo */}
                <figure
                  class="figure-container thumbnail hover:opacity-75 transition ease-in-out duration-150"
                  style={`background-image: url('${x.data?.heroImage ?? '/post_img/placeholder.png'}'); view-transition-name:${x.data.title.replace(/[^A-Za-z0-9]/gi, '')};`}
                />

                {/* Cuerpo de la card */}
                <div class="card-body p-3">
                  <p class={`text-xl font-bold ${isSelected ? 'text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text' : ''}`}>
                    {x.data.title}
                  </p>
                  <p class="text-sm opacity-60">{x.data.description}</p>
                </div>

                {/* Overlay con botón */}
                <div class="figure-button flex items-end justify-center pb-3">
                  <a href={`${basePath}/${x.id}/`}>
                    <button
                      class={`btn btn-sm transition-transform duration-300 hover:scale-105 ${
                        isSelected
                          ? 'btn-primary bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white'
                          : 'btn-ghost'
                      }`}
                      onClick={(e: Event) => e.stopPropagation()}
                    >
                      Seguir leyendo
                    </button>
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Spacer derecho */}
        <div class="flex-none w-4 md:w-8"></div>
      </div>
    </div>
  );
};

export default ColsComponent;

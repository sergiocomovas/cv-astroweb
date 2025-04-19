import { useState, useEffect } from "preact/hooks";

// El componente ahora recibe los posts como props
const ColScroll = ({ posts }) => {
  const [selectedColumn, setSelectedColumn] = useState(1);

  const changeColumn = (direction) => {
    const blogElement = document.getElementById("blog");

    if (blogElement) {
      blogElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const newColumn = selectedColumn + direction;
    if (newColumn >= 1 && newColumn <= posts.length) {
      setSelectedColumn(newColumn);
    }
  };

  const seleccionarCol = (index) => {
    setSelectedColumn(index);
  };

  useEffect(() => {
    const storedPosition = localStorage.getItem("selectedColumnPosition");

    if (storedPosition) {
      setSelectedColumn(parseInt(storedPosition, 10) / 317 + 1);
    }
  }, []); // El efecto solo se ejecuta una vez al montar el componente

  useEffect(() => {
    // Obtén la referencia al contenedor de las columnas
    const columnsContainer: any = document.getElementById("columns-container");

    // Calcula la posición de la columna seleccionada
    const selectedColumnPosition = (selectedColumn - 1) * 317; // 317 es el ancho de cada columna

    // Mueve el scroll al inicio de la columna seleccionada
    columnsContainer.scrollLeft = selectedColumnPosition;

    // Guarda selectedColumnPosition en localStorage
    localStorage.setItem(
      "selectedColumnPosition",
      selectedColumnPosition.toString()
    );
  }, [selectedColumn]);

  return (
    <>
      <style>
        {`
        .rosa{
          border: 1px solid var(--color-secondary) !important;
        }
        `}
      </style>
      <div id="blog">
        <div
          className="w-full relative overflow-x-auto translate-y-20"
          style="z-index:2;"
        >
          <div className="flex justify-between p-2">
            <button
              onClick={() => changeColumn(-1)}
              class="transition-colors duration-300
            focus:outline-none focus:ring  shadow-blue-900  shadow-md"
            >
              Anterior
            </button>

            <button
              onClick={() => changeColumn(1)}
              class="transition-colors duration-300 focus:outline-none focus:ring  shadow-blue-900  shadow-md"
            >
              Siguiente
            </button>
          </div>
        </div>
        <div
          id="columns-container"
          style="z-index:0"
          className="row-full flex w-full overflow-x-auto"
        >
          {posts.map((x, index) => (
            <section key={x.id} className="relative">
              <aside
                className={`${
                  selectedColumn === index + 1
                    ? " shadow-pink-900 shadow-lg rosa"
                    : ""
                }`}
                style="padding:0px; height: 515px; border: 1px solid var(--color-table); background-color: var(--color-primary-accent)"
              >
                <figure
                  className="figure-container thumbnail hover:opacity-75 transition ease-in-out duration-150"
                  style={`background-image: url('${
                    x.data?.heroImage ?? "/post_img/placeholder.png"
                  }'); view-transition-name:${x.data.title.replace(
                    /[^A-Za-z0-9]/gi,
                    ""
                  )};`}
                ></figure>

                <div style="padding: 0px 0px 10px 10px">
                  <p
                    className={`${
                      selectedColumn === index + 1
                        ? "font-bold text-xl text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text"
                        : "font-bold text-xl"
                    }`}
                  >
                    {x.data.title}
                  </p>
                  <p style="margin:0px; opacity:0.5">{x.data.description}</p>
                </div>

                <figure className="figure-button">
                  <a href={`/blog/${x.slug}/`} style="padding-left:10px;">
                    <button
                      className={`transition-transform duration-300 transform hover:scale-105 ${
                        selectedColumn === index + 1
                          ? " border-pink-500 bg-gradient-to-r from-purple-500 to-pink-500 shadow-md"
                          : "shadow-sm"
                      }`}
                      onClick={() => seleccionarCol(index + 1)}
                    >
                      Seguir leyendo
                    </button>
                  </a>
                </figure>
              </aside>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default ColScroll;
//

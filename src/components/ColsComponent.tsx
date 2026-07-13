import { useState } from "preact/hooks";

const ColScroll = ({ posts, basePath = '/blog' }) => {
  const [selectedColumn, setSelectedColumn] = useState(0);

  const seleccionarCol = (index: number) => {
    setSelectedColumn(index);
  };

  // Duplicar posts para loop infinito del marquee
  const duplicatedPosts = [...posts, ...posts];

  return (
    <>
      <div class="marqy w-full" data-direction="left" data-pause-on-hover>
        <div class="marqy-inner">
          {duplicatedPosts.map((x, index) => {
            const realIndex = index % posts.length;
            const isSelected = selectedColumn === realIndex;
            return (
              <div class="marqy-content">
                <a
                  href={`${basePath}/${x.id}/`}
                  class="block flex-shrink-0 w-[300px] mx-2 bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-150 hover:border-primary hover:shadow-lg"
                  style={isSelected ? "border-color: var(--color-secondary); box-shadow: 0 0 20px rgba(226,13,233,0.15);" : ""}
                  onClick={(e) => { e.preventDefault(); seleccionarCol(realIndex); }}
                >
                  <figure
                    class="w-full h-32 bg-cover bg-center overflow-hidden"
                    style={`background-image: url('${x.data?.heroImage ?? "/post_img/placeholder.png"}'); view-transition-name: ${x.data.title.replace(/[^A-Za-z0-9]/gi, "")};`}
                  ></figure>
                  <div class="p-3">
                    <p class={`font-bold text-sm leading-tight mb-1 ${isSelected ? "text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text" : ""}`}>
                      {x.data.title}
                    </p>
                    <p class="text-xs opacity-50 leading-snug">{x.data.description}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ColScroll;

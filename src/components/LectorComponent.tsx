import { useEffect, useState } from "preact/hooks";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const calculatedProgress = (scrollPosition / totalHeight) * 100;
      //limitar el progreso a 100
      let limitedProgress = Math.min(calculatedProgress, 100);
      if(limitedProgress > 99.70){
        limitedProgress = 100
      }
      setProgress(limitedProgress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // El array vacío significa que este efecto solo se ejecutará una vez, equivalente a componentDidMount en clases de React

  // Estilo dinámico para la barra de progreso
  const progressBarStyle = {
    width: `${progress}%`,
  };

  return (
    <>
      <style>
        {`.progress-bar {
        
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px; 
        background-color: transparent;
      }

        .progress {
          height: 100%;
          background-color: var(--color-secondary);
          transition: width 0.3s ease; 
        }`}
      </style>

      <div className="progress-bar">
        <div className="progress" style={progressBarStyle}></div>
      </div>
      <aside class="sticky top-0">
        <div class="p-4 w-full">
          Progreso: {progress.toFixed(2)}%
        </div>
      </aside>
    </>
  );
};

export default ProgressBar;

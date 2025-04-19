import { useEffect, useState } from "preact/hooks";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      let calculatedProgress = (scrollPosition / totalHeight) * 100;

      let limitedProgress = Math.min(calculatedProgress, 100);
      if (limitedProgress > 99.7) limitedProgress = 100;

      setProgress(limitedProgress);
      setShowButtons(limitedProgress >= 10);
      setNearBottom(limitedProgress >= 98);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToIndex = () => {
  window.history.back();
  };

  return (
    <>
      <style>
        {`
          .progress-bar {
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
          }

          .bottom-buttons-container {
            position: fixed;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 1rem;
            z-index: 999;
            padding: 1rem;
            transition: transform 0.5s ease, bottom 0.5s ease, top 0.5s ease;
          }

          .bottom-buttons-container.visible-bottom {
            bottom: 0;
            transform: translateY(-5%);
          }

          .bottom-buttons-container.floating-middle {
            top: 65%;
            transform: translateY(-70%);
          }

          .bottom-buttons-container button {
            padding: 0.5rem 1rem;
            background-color: var(--color-link);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.9rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            cursor: pointer;
          }

          @media (min-width: 768px) {
            .bottom-buttons-container {
              display: none;
            }
          }
        `}
      </style>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <aside class="sticky top-0">
        <div class="p-4 w-full">Progreso: {progress.toFixed(2)}%</div>
      </aside>

      {showButtons && (
        <div
          class={`bottom-buttons-container ${
            nearBottom ? "floating-middle" : "visible-bottom"
          }`}
        >
          <button onClick={scrollToTop}>↑ Arriba</button>
          <button onClick={goToIndex}>☰ Índice</button>
        </div>
      )}
    </>
  );
};

export default ProgressBar;

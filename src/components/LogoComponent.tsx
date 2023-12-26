import { useEffect, useState } from "preact/hooks";

const LogoComponent = () => {
  const [anchoPantalla, setAnchoPantalla] = useState<number>(window.innerWidth);
  const [alturaAnchura, setAlturaAnchura] = useState<number>(
    anchoPantalla > 768 ? 768 : anchoPantalla - 10
  );

  useEffect(() => {
    const handleResize = () => {
      const nuevoAncho = window.innerWidth;
      const nuevaAltura = nuevoAncho > 768 ? 768 : nuevoAncho - 10;

      setAnchoPantalla(nuevoAncho);
      setAlturaAnchura(nuevaAltura);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style>
        {`
        figure {
          display: flex;
          position: relative;
          flex-direction: column;
        }
      
        .img-bg {
          position: absolute;
          opacity: 0.3;
          background-image: linear-gradient(
            -45deg,
            var(--color-link) 50%,
            var(--color-secondary) 50%
          );
          border-radius: 50%;
          filter: blur(80px);
          z-index: -1;
          animation: pulse 10s cubic-bezier(0, 0, 0, 0.5) infinite;
        }
      
        @keyframes pulse {
          50% {
            transform: scale(1);
          }
        }
        `}
      </style>
      <figure class="flex items-center justify-center p-0 -m-40">
        <section
          class="img-bg"
          style={{
            height: `${alturaAnchura}px`,
            width: `${alturaAnchura}px`,
          }}
        ></section>
        <img
          style={{
            height: `${alturaAnchura}px`,
            width: `${alturaAnchura}px`,
          }}
          src="/comovas_laweb.svg"
          alt="Vite Logo"
        />
      </figure>
    </>
  );
};

export default LogoComponent;

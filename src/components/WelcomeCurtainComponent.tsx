import { useEffect, useState } from 'preact/hooks';
import { gsap } from 'gsap';

interface WelcomeCurtainProps {
  mensaje?: string;
}

const WelcomeCurtainComponent = ({ mensaje = "¡Hola!" }: WelcomeCurtainProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Función para verificar si debe mostrar el telón
  const shouldShowCurtain = () => {
    const lastShown = localStorage.getItem('welcomeCurtainLastShown');
    const today = new Date().toDateString();
    return !lastShown || lastShown !== today;
  };

  // Función para marcar como mostrado hoy
  const markCurtainShown = () => {
    const today = new Date().toDateString();
    localStorage.setItem('welcomeCurtainLastShown', today);
  };

  useEffect(() => {
    // Verificar si debe mostrar el telón
    if (shouldShowCurtain()) {
      setIsVisible(true);
      // Bloquear scroll inmediatamente
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let scrollTriggered = false;

    const handleScroll = (e: Event) => {
      if (scrollTriggered) {
        // Prevenir cualquier scroll durante la animación
        e.preventDefault();
        return;
      }
      
      scrollTriggered = true;
      e.preventDefault();

      const curtain = document.getElementById('welcomeCurtain');
      if (!curtain) return;

      // Animar el telón hacia arriba con GSAP
      gsap.to(curtain, {
        y: '-100vh',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          // Solo después de que la animación termine completamente
          setTimeout(() => {
            setIsVisible(false);
            markCurtainShown();
            // Restaurar el scroll
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            // Asegurar que estamos en la parte superior
            window.scrollTo(0, 0);
          }, 100);
        }
      });

      // Animar el contenido del telón
      gsap.to('.curtain-content', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });
    };

    const handleWheel = (e: WheelEvent) => {
      handleScroll(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleScroll(e);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Detectar teclas de navegación (flechas, page up/down, space, etc.)
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'End', 'Home'].includes(e.code)) {
        handleScroll(e);
      }
    };

    // Agregar listeners para detectar cualquier intento de scroll
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    
    // También detectar scroll directo (por si acaso)
    window.addEventListener('scroll', (e) => {
      if (!scrollTriggered) {
        handleScroll(e);
      }
    }, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      
      // Asegurar que el scroll se restaure si el componente se desmonta
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  // Renderizar el código eval para la animación del globo
  useEffect(() => {
    if (!isVisible) return;

    // Código eval original para la animación
    const animationCode = `
      p="<"+"pre>"/* ,.oq#+     ,._, */;for(y in n="zw24l6k\\
4e3t4jnt4qj24xh2 x/* =<,m#F^    A W###q. */42kty24wrt413n243n\\
9h243pdxt41csb yz/* #K       q##H######Am */43iyb6k43pk7243nm\\
r24".split(4)){/* dP      cpq#q##########b, */for(a in t=pars\\
eInt(n[y],36)+/*         p##@###YG=[#######y */(e=x=r=[]))for\\
(r=!r,i=0;t[a/*         d#qg \`*PWo##q#######D */]>i;i+=.05)wi\\
th(Math)x-= /*        sergiorig Q###KWR#### W[ */.05,0<cos(o=\\
new Date/1e3/*      .Q#########Md#.###OP  A@ , */-x/PI)&&(e[~\\
~(32*sin(o)*/* ,    (W#####Xx######.P^     T % */sin(.5+y/7))\\
+60] =-~ r);/* #y    \`^TqW####P###BP           */for(x=0;122> \\
x;)p+="   *#"/* b.        OQ####x#K           */[e[x++]+e[x++\\
]]||(S=("eval"/* l         \`X#####D  ,       */+"(z=\\'"+z.spl\\
it(B = "\\\\\\\\")./*           G####B" #       */join(B+B).split\\
(Q="\\'").join(B+Q/*          VQBP\`        */)+Q+")//m1k")[x/2\\
+61*y-1]).fontcolor/*         TP         */(/\\\\w/.test(S)&&"#\\
03B");document.getElementById("welcomeGlobe").innerHTML=p+=B+"\\\\n"}setTimeout(z)
    `;

    try {
      eval(`(z='${animationCode}')`);
    } catch (error) {
      console.warn('Error en animación del globo:', error);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          .welcome-curtain {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: var(--color-bg);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .curtain-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .welcome-overlay {
            position: absolute;
            top: 20%;
            left: 20%;
            transform: translate(-50%, -50%) rotate(-10deg);
            z-index: 10001;
            color: #FFF;
            font-family: monospace, sans-serif;
            font-size: 4vw;
            text-align: center;
            padding: 4vw 5vw;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            animation: pulseDiagonal 10s ease-in-out infinite;
          }

          .welcome-vector {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            width: 50vw;
            height: auto;
            max-width: 100%;
            filter: drop-shadow(0 0 15px #ff00ff50);
          }

          .welcome-bg {
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
            height: 100vw;
            width: 100vw;
          }

          .scroll-hint {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10002;
            color: #FFF;
            font-family: var(--font-family);
            font-size: 1rem;
            text-align: center;
            opacity: 0.8;
            animation: bounce 2s infinite;
          }

          @keyframes pulseDiagonal {
            0% {
              transform: translate(-50%, -50%) rotate(-10deg) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, -50%) rotate(-10deg) scale(1.2);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) rotate(-10deg) scale(1);
              opacity: 1;
            }
          }

          @keyframes pulse {
            50% {
              transform: scale(1);
            }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }

          /* Responsive */
          @media (max-width: 768px) {
            .welcome-overlay {
              font-size: 6vw;
              top: 25%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-5deg);
            }
            
            .welcome-vector {
              width: 70vw;
            }

            .scroll-hint {
              font-size: 0.9rem;
              bottom: 20px;
            }
          }

          @media (max-width: 480px) {
            .welcome-overlay {
              font-size: 8vw;
              padding: 2vw 3vw;
            }
            
            .welcome-vector {
              width: 80vw;
            }

            .scroll-hint {
              font-size: 0.8rem;
              bottom: 15px;
            }
          }
        `}
      </style>

      <div id="welcomeCurtain" class="welcome-curtain">
        <div class="curtain-content">
          <section class="welcome-bg"></section>

          <div
            id="welcomeGlobe"
            class="w-full p-1 font-mono overflow-hidden flex bg-transparent blur-[0.7px] text-[2vw] tracking-[0.5vw] after:content-[''] after:inline-block blur-[1px] after:w-full"
          ></div>

          <div class="welcome-overlay">
            {mensaje}
          </div>

          <img 
            src="/comovas_laweb.svg" 
            alt="Imagen vectorial" 
            class="welcome-vector"
          />

          <div class="scroll-hint">
            ↓ Desplázate para continuar ↓
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeCurtainComponent;
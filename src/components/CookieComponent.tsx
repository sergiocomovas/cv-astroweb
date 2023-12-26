import { useEffect } from "preact/hooks";

const CookieConsent = () => {
  useEffect(() => {
    const consentAccepted = localStorage.getItem("cookieconsent");

    if (!consentAccepted) {
      const cookieConsent = document.getElementById("cookieconsent");
      if (cookieConsent) {
        cookieConsent.style.display = "";
      }
    }
  }, []);

  const aceptar = () => {
    localStorage.setItem("cookieconsent", "true");
    const cookieConsent = document.getElementById("cookieconsent");
    if (cookieConsent) {
      cookieConsent.style.display = "none";
    }
  };

  return (
    <>
      <div
        id="cookieconsent"
        style="display:none;"
        class="fixed top-0 left-0 bg-purple-800 text-white text-center w-full p-3 z-50"
      >
        🍪 ⒸⓄⓄⓀⒾⒺⓈ: Acéptalas para
        <a
          onClick={aceptar}
          id="aceptar_cookies"
          href="#aceptar_cookies"
          class="text-pink-500"
        >
          [ DESBLOQUEAR ]
        </a>
        todo el contenido.
      </div>
    </>
  );
};

export default CookieConsent;

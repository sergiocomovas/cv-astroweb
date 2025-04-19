import { useEffect, useState } from "preact/hooks";

const PrivacyNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("sessionUnlock");

    if (!accepted) {
      setVisible(true);

      // Borrar cookies manualmente si no está seteado sessionUnlock
      const cookies = document.cookie.split("; ");
      cookies.forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
    }
  }, []);

  const handleUnlock = () => {
    localStorage.setItem("sessionUnlock", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="unlockBanner"
      class="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center py-1 z-[998] text-sm"
    >
      🔒 Algunas opciones están limitadas.
      <button
        onClick={handleUnlock}
        id="unlockTrigger"
        class="ml-2 p-1 font-semibold text-sm underline"
      >
        Activar 🍪
      </button>
    </div>
  );
};

export default PrivacyNotice;

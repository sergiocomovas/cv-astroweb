document.addEventListener("DOMContentLoaded", () => {
  console.log("🟡Mensaje de Cookies Activado");
  if (!localStorage.getItem("cookieconsent")) {
    const html = `
    <div class="cookieconsent" 
    style="position: fixed; padding: 9px; left: 0; top: 0; background-color: #592471; color: #FFF; text-align: center; width: 100%; z-index: 9999;">
        🍪 ⒸⓄⓄⓀⒾⒺⓈ: Acéptalas para 
        <a href="javascript:void(0)" style="color: #e20de9;">[ DESBLOQUEAR ]</a>
        todo el contenido.
    </div>`;

    document.querySelector(`body`).innerHTML += html;

    document
      .querySelector(".cookieconsent a")
      .addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".cookieconsent").style.display = "none";
        localStorage.setItem("cookieconsent", true);
        window.location.reload(false);
      });
  }
});

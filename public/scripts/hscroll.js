var oldScrollLeft;

var hDeslizante = document.querySelector(".scrollmenu");

hDeslizante.addEventListener("wheel", function(e) {
  e.preventDefault();
  var delta = e.deltaY || e.deltaX; // Manejar diferentes navegadores
  hDeslizante.scrollLeft += delta;

  if (hDeslizante.scrollLeft === oldScrollLeft) {
    // Evitar el desplazamiento vertical de la página si no hay desplazamiento horizontal
    e.stopPropagation();
    return false;
  }

  oldScrollLeft = hDeslizante.scrollLeft;
});

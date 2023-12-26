
var oldY;

var vPagina = document.querySelector("html");
var hDeslizante = document.querySelector(".scrollmenu");

hDeslizante.addEventListener("wheel", (e) => {
  e.preventDefault();
  hDeslizante.scrollLeft += e.deltaY;
  if (hDeslizante.scrollLeft == oldY) {
    vPagina.scrollTop += e.deltaY;
  }
  oldY = hDeslizante.scrollLeft;
});

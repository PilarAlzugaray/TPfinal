$(document).ready(function(){
    $('.musicales-slider').slick({
      slidesToShow: 3,    // Número de elementos visibles al mismo tiempo en el carrusel
      slidesToScroll: 1,  // Número de elementos que se desplazan por cada clic
      autoplay: true,     // Reproducción automática del carrusel
      autoplaySpeed: 2000, // Velocidad del autoplay (en milisegundos)
      arrows: true,       // Mostrar flechas de navegación
      dots: true          // Mostrar puntos de navegación
    });
  });


  ::view-transition-old(movie-poster),
  ::view-transition-new(movie-poster) {
    animation: none;
    mix-blend-mode: normal;
  }
  
  ::view-transition-image-pair(movie-poster) {
    isolation: none;
  }
  
  .nav {
    view-transition-name: main-header;
    contain: paint;
  }
  
  .movie-poster {
    contain: paint;
  }
  
  .person-photo {
    view-transition-name: person-photo;
    contain: paint;
  }
  
  .thumbnail {
    contain: paint;
  }
  

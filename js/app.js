//app.js

const hamburguesa = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");
const menuButtons = document.querySelectorAll(".menu-button");
const fecha = document.querySelector(".fecha");

document.addEventListener("DOMContentLoaded", () => {
  mostrarMenu();
  actualizarMenuActivo();
  fechaActual();
  iniciarSlider();
  iniciarColaboraciones();
});

function mostrarMenu() {
  hamburguesa.addEventListener("click", () => {
    sidebar.classList.toggle("active");

    // Animar las barras del hamburger menu
    hamburguesa.classList.toggle("active");
  });
}

function actualizarMenuActivo() {
  menuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Check if the link is to another page or to a section within the current page
      const hrefValue = button.getAttribute("href");

      // If it's a link to another HTML page (contains .html), let the default navigation happen
      if (hrefValue.includes(".html")) {
        // Don't prevent default - allow normal navigation
        // But we can still highlight the active button
        menuButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Cerrar menú en móvil
        if (window.innerWidth < 768) {
          sidebar.classList.remove("active");
        }
      }
      // If it's a link to a section within the page (starts with #)
      else if (hrefValue.startsWith("#")) {
        e.preventDefault();

        // Remover clase active de todos los botones
        menuButtons.forEach((btn) => btn.classList.remove("active"));

        // Agregar clase active al botón clickeado
        button.classList.add("active");

        // Obtener el selector de la sección desde el href
        const seccion = document.querySelector(hrefValue);

        // Navegar a la sección
        if (seccion) {
          cambioSeccion(seccion);
        }

        // Cerrar menú en móvil
        if (window.innerWidth < 768) {
          sidebar.classList.remove("active");
        }
      }
    });
  });

  // Establecer el botón correspondiente a la página actual como activo
  const currentPage = window.location.pathname.split("/").pop();
  menuButtons.forEach((button) => {
    const buttonHref = button.getAttribute("href");
    if (
      buttonHref === currentPage ||
      (currentPage === "" && buttonHref === "index.html")
    ) {
      button.classList.add("active");
    }
  });
}

function cambioSeccion(seccion) {
  seccion.scrollIntoView({
    behavior: "smooth",
  });
}

function fechaActual() {
  let fechaHoy = new Date().getFullYear();
  if (fecha) {
    fecha.textContent = fechaHoy;
  }
}

// Funcionalidad del slider principal
function iniciarSlider() {
  const slides = document.querySelectorAll(".slideshow-container .slide");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");

  if (slides.length === 0) return; // Si no existen slides, salir de la función

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Función para mostrar slide actual
  function showSlide(index) {
    // Ocultar todos los slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Activar el slide actual
    slides[index].classList.add("active");
  }

  // Evento para botón anterior
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
      }
      showSlide(currentSlide);
    });
  }

  // Evento para botón siguiente
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentSlide++;
      if (currentSlide >= totalSlides) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    });
  }

  // Cambio automático cada 5 segundos
  setInterval(() => {
    currentSlide++;
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }, 5000);
}

// Funcionalidad de slider de colaboraciones
function iniciarColaboraciones() {
  const slides = document.querySelectorAll(".collab-slide");
  const dots = document.querySelectorAll(".collab-dot");
  const prevButton = document.querySelector(".prev-collab");
  const nextButton = document.querySelector(".next-collab");

  if (slides.length === 0) return; // Si no existen slides, salir de la función

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Función para mostrar slide actual
  function showSlide(index) {
    // Ocultar todos los slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Quitar active de todos los dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Activar el slide actual
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  // Evento para botón anterior
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
      }
      showSlide(currentSlide);
    });
  }

  // Evento para botón siguiente
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentSlide++;
      if (currentSlide >= totalSlides) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    });
  }

  // Eventos para los dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Cambio automático cada 5 segundos
  setInterval(() => {
    currentSlide++;
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }, 6000);
}

// Detectar scroll para cambiar menú activo
window.addEventListener("scroll", () => {
  // Solo realizar esta función si estamos en la página principal
  if (
    !window.location.pathname.includes(".html") ||
    window.location.pathname.endsWith("index.html")
  ) {
    const sections = document.querySelectorAll(".section");
    const scrollPosition = window.scrollY + 200; // Ajuste para activar antes

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = "#" + section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Desactivar todos los botones
        menuButtons.forEach((button) => {
          button.classList.remove("active");
        });

        // Activar el botón correspondiente a la sección visible
        const activeButton = document.querySelector(
          `.menu-button[href="${sectionId}"]`
        );
        if (activeButton) {
          activeButton.classList.add("active");
        }
      }
    });
  }
});

// Funcionalidad para la galería de imágenes
document.addEventListener("DOMContentLoaded", () => {
  iniciarGaleria();
});

function iniciarGaleria() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const imageViewer = document.getElementById("imageViewer");
  const currentImage = document.getElementById("currentImage");
  const closeViewer = document.querySelector(".close-viewer");
  const prevImage = document.querySelector(".prev-image");
  const nextImage = document.querySelector(".next-image");

  // Si no hay imágenes, salir de la función
  if (galleryItems.length === 0) return;

  let currentIndex = 0;
  const totalImages = galleryItems.length;

  // Recopilar todas las rutas de imágenes
  const imagePaths = Array.from(galleryItems).map((item) => {
    return {
      src: item.querySelector("img").src,
      alt: item.querySelector("img").alt,
    };
  });

  // Función para abrir el visor
  function openViewer(index) {
    currentIndex = index;
    currentImage.src = imagePaths[index].src;
    currentImage.alt = imagePaths[index].alt;
    imageViewer.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevenir scroll
  }

  // Función para cerrar el visor
  function closeViewerFn() {
    imageViewer.classList.remove("active");
    document.body.style.overflow = ""; // Restaurar scroll
  }

  // Función para mostrar imagen anterior
  function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalImages - 1;
    }
    currentImage.src = imagePaths[currentIndex].src;
    currentImage.alt = imagePaths[currentIndex].alt;
  }

  // Función para mostrar imagen siguiente
  function showNextImage() {
    currentIndex++;
    if (currentIndex >= totalImages) {
      currentIndex = 0;
    }
    currentImage.src = imagePaths[currentIndex].src;
    currentImage.alt = imagePaths[currentIndex].alt;
  }

  // Asignar click events a las imágenes de la galería
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openViewer(index);
    });
  });

  // Evento para botón cerrar
  closeViewer.addEventListener("click", closeViewerFn);

  // Evento para botón imagen anterior
  prevImage.addEventListener("click", showPrevImage);

  // Evento para botón imagen siguiente
  nextImage.addEventListener("click", showNextImage);

  // Cerrar con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (!imageViewer.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeViewerFn();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  });

  // Cerrar al hacer clic fuera de la imagen
  imageViewer.addEventListener("click", (e) => {
    if (e.target === imageViewer) {
      closeViewerFn();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Elementos del reproductor
  const audioPlayer = document.getElementById("audio-player");
  const playButton = document.querySelector(".btn-play-pause");
  const progressBar = document.querySelector(".progress");
  const currentTimeElement = document.querySelector(".current-time");
  const totalTimeElement = document.querySelector(".total-time");

  // Verificar si el audio está cargado correctamente
  audioPlayer.addEventListener("error", function () {
    console.error("Error al cargar el audio");
    alert("No se pudo cargar el archivo de audio");
  });

  // Función para reproducir/pausar
  playButton.addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audioPlayer.pause();
      playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Actualizar tiempo actual
  audioPlayer.addEventListener("timeupdate", function () {
    // Actualizar la barra de progreso
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = percentage + "%";

    // Actualizar el tiempo actual
    const minutes = Math.floor(audioPlayer.currentTime / 60);
    const seconds = Math.floor(audioPlayer.currentTime % 60);
    currentTimeElement.textContent =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  });

  // Establecer tiempo total cuando se carga el audio
  audioPlayer.addEventListener("loadedmetadata", function () {
    const minutes = Math.floor(audioPlayer.duration / 60);
    const seconds = Math.floor(audioPlayer.duration % 60);
    totalTimeElement.textContent =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  });

  // Permitir clic en la barra de progreso
  document
    .querySelector(".progress-bar")
    .addEventListener("click", function (e) {
      const percent = e.offsetX / this.offsetWidth;
      audioPlayer.currentTime = percent * audioPlayer.duration;
    });
});

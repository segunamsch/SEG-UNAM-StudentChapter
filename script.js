let slideIndex = 1;
showSlides(slideIndex);

function autoSlide() {
    plusSlides(1);
}

let slideInterval = setInterval(autoSlide, 3000);
function plusSlides(n) {
  clearInterval(slideInterval); 
  showSlides(slideIndex += n);
  slideInterval = setInterval(autoSlide, 3000);
}

// Controles para ir a una diapositiva específica (los puntos)
function currentSlide(n) {
  clearInterval(slideInterval); 
  showSlides(slideIndex = n);
  slideInterval = setInterval(autoSlide, 3000);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carrusel-slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/full-activities.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo actividades.json');
        }
        return response.json();
      })
      .then(data => {
        const container = document.getElementById('latest-activities-container');
        
        // Muestra solo las 3 actividades más recientes
        const latestActivities = data.slice(0, 3); 

        latestActivities.forEach(activity => {
          const newsItem = document.createElement('div');
          newsItem.classList.add('news-item'); 
          
          // Construye el HTML con el formato simple para el Index
          newsItem.innerHTML = `
            <p><strong>${activity.titulo}</strong> (${activity.fecha})</p>
            <a href="${activity.url}" class="read-more">${activity.link_texto || 'Detalles'}</a>
          `;

          container.appendChild(newsItem);
        });

        if (latestActivities.length === 0) {
            container.innerHTML = '<p>No hay actividades recientes para mostrar.</p>';
        }
      })
      .catch(error => {
        console.error('Error al renderizar noticias en el Index:', error);
        const container = document.getElementById('latest-activities-container');
        if(container) {
            container.innerHTML = '<p style="color: red;">Error al cargar las noticias.</p>';
        }
      });
});

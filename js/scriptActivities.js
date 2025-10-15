document.addEventListener('DOMContentLoaded', () => {
  fetch('./full-activities.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo full-activities.json');
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

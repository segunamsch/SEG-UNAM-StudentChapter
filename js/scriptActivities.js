document.addEventListener('DOMContentLoaded', () => {
    // 1. BUSCAMOS EL ID CORRECTO DE ESTA PÁGINA
    const container = document.getElementById('full-activities-list'); 
    
    // Si el contenedor no existe, salimos
    if (!container) {
        console.error("Error: Contenedor #full-activities-list no encontrado.");
        return; 
    }

    // Usamos la ruta relativa al directorio actual, que funciona con <base>
    fetch('./full-activities.json')
        .then(response => {
            if (!response.ok) throw new Error('Carga fallida.');
            return response.json();
        })
        .then(data => {
            // Itera sobre TODOS los objetos en el JSON
            data.forEach(activity => {
                const activityCard = document.createElement('div');
                activityCard.classList.add('activity-card'); 
                
                // Construye la tarjeta completa con imagen y descripción
                activityCard.innerHTML = `
                    <img src="${activity.imagen}" alt="${activity.titulo}">
                    <div class="card-content">
                        <h3>${activity.titulo}</h3>
                        <p class="date">${activity.fecha}</p>
                        <p class="description">${activity.resumen}</p>
                        <a href="${activity.url}" class="read-more">${activity.link_texto || 'Detalles'}</a>
                    </div>
                `;
                // 2. Aquí usa el contenedor que encontramos: container.appendChild(activityCard)
                container.appendChild(activityCard); 
            });

            if (data.length === 0) {
                container.innerHTML = '<p>No hay actividades para mostrar en este momento.</p>';
            }
        })
        .catch(error => {
            console.error('Error al renderizar actividades completas:', error);
            // Mensaje de error para el usuario (si falla el fetch)
            container.innerHTML = '<p style="color: red;">Error al cargar la lista de actividades. Revise la consola (F12) para detalles.</p>';
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('full-activities-list');
    
    // Verificación temprana del contenedor
    if (!container) {
        console.error("Error: Contenedor #full-activities-list no encontrado.");
        return;
    }
    
    fetch('./full-activities.json')
        .then(response => {
            if (!response.ok) throw new Error('Carga fallida.');
            return response.json();
        })
        .then(data => {
            
            // 1. Manejo de lista vacía
            if (data.length === 0) {
                container.innerHTML = '<p>No hay actividades para mostrar en este momento.</p>';
                return;
            }
            
            // 2. BUCLE ÚNICO Y CORRECTO
            data.forEach(activity => {
                const activityCard = document.createElement('div');
                activityCard.classList.add('activity-card');
                
                // Construye la tarjeta
                activityCard.innerHTML = `
                    <img src="${activity.imagen}" alt="${activity.titulo}">
                    <div class="card-content">
                        <h3>${activity.titulo}</h3>
                        <p class="date">${activity.fecha}</p>
                        <p class="description">${activity.resumen}</p>
                        <a href="${activity.url}" class="read-more">${activity.link_texto || 'Detalles'}</a>
                    </div>
                `;
                container.appendChild(activityCard);
            });
            
        })
        .catch(error => {
            console.error('Error al renderizar actividades completas:', error);
            // Mensaje de error visible para el usuario
            container.innerHTML = `<p style="color: red;">Error al cargar la lista de actividades. Detalles: ${error.message}</p>`;
        });
});

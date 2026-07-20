document.addEventListener("DOMContentLoaded", () => {
            // 1. Dispara a animação em cascata logo após o carregamento
            const container = document.getElementById('profileContainer');
            setTimeout(() => {
                container.classList.add('loaded');
            }, 50); 

            
        });
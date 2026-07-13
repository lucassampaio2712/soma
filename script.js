/* ==========================================================================
   SCRIPT.JS - Equipe SOMA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. MENU MOBILE (HAMBÚRGUER)
       ---------------------------------------------------------------------- */
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Abre e fecha o menu ao clicar no botão
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Fecha o menu automaticamente quando um link é clicado (útil no mobile)
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. ROLAGEM SUAVE (SMOOTH SCROLLING)
       ---------------------------------------------------------------------- */
    // Seleciona todos os links que começam com "#" (âncoras)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o pulo seco padrão do navegador
            
            const targetId = this.getAttribute('href');
            // Ignora se o href for apenas "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcula a altura do cabeçalho fixo para não cobrir o título da seção
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Anima a rolagem até o ponto calculado
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ----------------------------------------------------------------------
       3. FEEDBACK VISUAL DO FORMULÁRIO DE CONTATO
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            
            // Estado 1: Carregando (feedback de ação)
            submitBtn.innerText = 'Enviando...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'wait';

            // Simula um tempo de envio (como se estivesse mandando para um servidor)
            setTimeout(() => {
                // Estado 2: Sucesso!
                submitBtn.innerText = 'Mensagem Enviada! 💜';
                submitBtn.style.backgroundColor = 'var(--verde-medio)'; // Muda para verde
                submitBtn.style.color = '#ffffff';
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
                
                // Limpa os campos do formulário
                contactForm.reset();

                // Estado 3: Retorna ao botão original após 3.5 segundos
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = ''; // Remove o inline style
                    submitBtn.style.color = '';
                }, 3500);
                
            }, 1500); // Finge que demorou 1.5 segundos para enviar
        });
    }
});
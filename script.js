const track = document.getElementById('track');
    let captionBox = document.getElementById('marquee-caption');

    if (!captionBox) {
        const marqueeContainer = document.querySelector('.marquee-container');
        if (marqueeContainer) {
            captionBox = document.createElement('div');
            captionBox.id = 'marquee-caption';
            captionBox.className = 'marquee-caption';
            captionBox.setAttribute('aria-live', 'polite');
            marqueeContainer.parentNode.insertBefore(captionBox, marqueeContainer.nextSibling);
        }
    }
    window.addEventListener("load", () => {
    const track = document.getElementById('track');
    if (!track) return;
    const originalImages = Array.from(track.children);
    
    // 1. Define uma velocidade constante (Ex: 100 pixels por segundo)
    const pixelsPerSecond = 50;
  
    const setup = () => {
      // Garante cobertura da tela
      while (track.scrollWidth < window.innerWidth) {
        originalImages.forEach(img => track.appendChild(img.cloneNode(true)));
      }
      
      // Duplica para o loop perfeito
      const currentContent = Array.from(track.children);
      currentContent.forEach(img => track.appendChild(img.cloneNode(true)));
  
      // 2. CALCULA A DURACÃO DINÂMICA
      // Distância a percorrer é 50% do scrollWidth total
      const distanceToScroll = track.scrollWidth / 2;
      const dynamicDuration = distanceToScroll / pixelsPerSecond;
  
      // Aplica o tempo calculado diretamente no elemento
      track.style.animationDuration = `${dynamicDuration}s`;
    };
  
    setup();
    // Mostrar legenda ao hover / foco / touch nas imagens do track
(function attachMarqueeCaptions(){
  const track = document.getElementById('track');
  const captionBox = document.getElementById('marquee-caption');
  if (!track || !captionBox) return;

  const imgs = Array.from(track.querySelectorAll('img'));
  imgs.forEach(img => {
    img.setAttribute('tabindex', '0'); // tornar focável
    const show = () => {
      captionBox.textContent = img.dataset.caption || img.alt || '';
      captionBox.classList.add('visible');
    };
    const hide = () => captionBox.classList.remove('visible');

    img.addEventListener('mouseenter', show);
    img.addEventListener('mouseleave', hide);
    img.addEventListener('focus', show);
    img.addEventListener('blur', hide);
    img.addEventListener('touchstart', (e) => { e.preventDefault(); show(); }, {passive:false});
    img.addEventListener('touchend', () => setTimeout(hide, 900));
  });

  // opcional: esconde ao clicar fora
  document.addEventListener('click', (e) => {
    if (!track.contains(e.target)) document.getElementById('marquee-caption')?.classList.remove('visible');
  });
})();
  });
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

    
    
});
// Observador para detectar quando o elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que inicia a animação de subir e revelar a borda
                entry.target.classList.add('is-visible');
                
                // (Opcional) Faz a animação acontecer apenas 1 vez, descomente a linha abaixo:
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.2 // A animação dispara quando 20% do card aparecer na tela
    });

    // Pega todos os cards com a classe e passa para o observador
    const cards = document.querySelectorAll('.fade-on-scroll');
    cards.forEach(card => observer.observe(card));
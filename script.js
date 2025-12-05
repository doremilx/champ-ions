document.addEventListener('DOMContentLoaded', (event) => {
        gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

        const follower = '#follower-logo';
        const container = document.querySelector('.infos-container');
        const path = document.getElementById('zig-zag-line');
        const svg = document.getElementById('path-svg'); // Inclure tous les éléments à partir de <p> et <div.texte-special> // Nous n'utilisons que les divs .info, car ce sont elles qui sont alternées.
        const infoDivs = document.querySelectorAll('.info'); // --- 1. FONCTION DE CALCUL DYNAMIQUE DU CHEMIN ---

        function generateZigZagPath() {
          let pathData = '';
          const points = [];
          const containerRect = container.getBoundingClientRect();
          infoDivs.forEach((div, index) => {
            const rect = div.getBoundingClientRect(); // Calcul de Y (milieu vertical, inchangé)
            const y = rect.top - containerRect.top + rect.height / 2;

            let x; // 💥 NOUVELLE LOGIQUE POUR LE CÔTÉ (AXE X) // Si la carte est à gauche (index 0, 2, 4, etc. si on ne compte que les .info) // Si l'élément est à gauche, on cible son BORD DROIT
            if (index % 2 === 0) {
              x = rect.left - containerRect.left; // Bord droit
            } // Si la carte est à droite (index 1, 3, 5, etc.) // Si l'élément est à droite, on cible son BORD GAUCHE
            else {
              x = rect.right - containerRect.left; // Bord gauche
            }
            points.push({ x, y });
            if (index === 0) {
              pathData += `M ${x} ${y}`;
            } else {
              pathData += ` L ${x} ${y}`;
            }
          });
          if (points.length > 0) {
            const totalHeight = containerRect.height; // Le SVG doit couvrir toute la largeur du conteneur
            svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${totalHeight}`);
            svg.style.width = containerRect.width + 'px';
            path.setAttribute('d', pathData);
          }
        } // --- 2. EXÉCUTION ET GSAP ---

        generateZigZagPath();
        const motionTween = gsap.to(follower, {
          motionPath: {
            path: '#zig-zag-line',
            align: '#zig-zag-line',
            alignOrigin: [0.5, 0.5],

            immediateRender: true,
          },
          ease: 'none',
          duration: 1,
        });

        ScrollTrigger.create({
          animation: motionTween,
          trigger: '.infos-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // markers: true
        }); // 4. Relancer les calculs en cas de changement (resize/load)
        window.addEventListener('resize', () => {
          generateZigZagPath();
          ScrollTrigger.refresh();
        });

        window.addEventListener('load', () => {
          generateZigZagPath();
          ScrollTrigger.refresh();
        });
      });
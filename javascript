/**
 * ============================================
 * ESPECTRO · DESFILE DE MODA
 * JavaScript – interatividade e dinamismo
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------------------
    // 1. CONTADOR REGRESSIVO PARA O DESFILE
    //    (data alvo: 7 de julho de 2026, 20h)
    // --------------------------------------------------------------
    function iniciarContador() {
        const alvo = new Date('2026-07-07T20:00:00').getTime();
        const contadorElemento = document.createElement('div');
        contadorElemento.id = 'contador-regressivo';
        contadorElemento.style.cssText = `
            text-align: center;
            font-size: 1.1rem;
            letter-spacing: 3px;
            color: #b3aaa0;
            margin-top: -1.5rem;
            margin-bottom: 2rem;
            font-weight: 300;
            background: rgba(20, 18, 22, 0.6);
            padding: 0.8rem 1.5rem;
            border-radius: 60px;
            display: inline-block;
            backdrop-filter: blur(6px);
            border: 1px solid #2d292e;
        `;
        
        // Inserir após o hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(contadorElemento);
        }

        function atualizarContador() {
            const agora = new Date().getTime();
            const diferenca = alvo - agora;

            if (diferenca <= 0) {
                contadorElemento.innerHTML = '🚀 O DESFILE JÁ COMEÇOU!';
                return;
            }

            const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

            contadorElemento.innerHTML = `
                ⏳ ${dias}d ${horas.toString().padStart(2, '0')}h 
                ${minutos.toString().padStart(2, '0')}m 
                ${segundos.toString().padStart(2, '0')}s 
                · para o desfile
            `;
        }

        atualizarContador();
        setInterval(atualizarContador, 1000);
    }

    iniciarContador();

    // --------------------------------------------------------------
    // 2. EFEITO DE DIGITAÇÃO NO TÍTULO (Espectro)
    //    (cria uma segunda camada de interação)
    // --------------------------------------------------------------
    function efeitoDigitacao() {
        const titulo = document.querySelector('.hero h1');
        if (!titulo) return;

        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        titulo.style.opacity = '1';

        let indice = 0;
        const velocidade = 120; // ms por letra

        function digitar() {
            if (indice < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(indice);
                indice++;
                setTimeout(digitar, velocidade);
            }
        }

        // Inicia após um pequeno delay para não conflitar com o carregamento
        setTimeout(digitar, 600);
    }

    // Executa apenas uma vez (a primeira visita)
    if (!sessionStorage.getItem('tituloDigitado')) {
        efeitoDigitacao();
        sessionStorage.setItem('tituloDigitado', 'true');
    }

    // --------------------------------------------------------------
    // 3. INTERAÇÃO COM OS CARDS DA COLEÇÃO
    //    (ao clicar, exibe uma mensagem com o nome do look)
    // --------------------------------------------------------------
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            const tituloLook = this.querySelector('h3')?.textContent || 'Look';
            const tag = this.querySelector('.look-tag')?.textContent || '';
            
            // Cria um toast/notificação temporária
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(23, 21, 24, 0.95);
                backdrop-filter: blur(12px);
                color: #f0ece4;
                padding: 1rem 2.2rem;
                border-radius: 60px;
                border: 1px solid #5d4d66;
                font-weight: 300;
                letter-spacing: 2px;
                font-size: 0.95rem;
                z-index: 999;
                box-shadow: 0 20px 40px -10px rgba(0,0,0,0.8);
                animation: fadeInUp 0.4s ease;
                transition: opacity 0.4s;
            `;
            
            // Adiciona keyframe via style (se não existir)
            if (!document.getElementById('toast-keyframes')) {
                const style = document.createElement('style');
                style.id = 'toast-keyframes';
                style.textContent = `
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                        to { opacity: 1; transform: translateX(-50%) translateY(0); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            toast.textContent = `✨ ${tituloLook} ${tag} · detalhes em breve`;
            document.body.appendChild(toast);
            
            // Remove após 2.5 segundos com fade
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.remove();
                }, 400);
            }, 2500);
        });
    });

    // --------------------------------------------------------------
    // 4. GALERIA: EFEITO DE DESTAQUE AO PASSAR O MOUSE
    //    (amplia a cor e mostra um tooltip com o tom)
    // --------------------------------------------------------------
    const lookItems = document.querySelectorAll('.look-item');
    lookItems.forEach(item => {
        const colorBox = item.querySelector('.color-box');
        const lookName = item.querySelector('.look-name')?.textContent || '';
        const lookDesc = item.querySelector('.look-desc')?.textContent || '';

        item.addEventListener('mouseenter', function() {
            if (colorBox) {
                colorBox.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                colorBox.style.transform = 'scale(1.04)';
                colorBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(180, 160, 200, 0.15)';
            }
            // Exibe um tooltip sutil com o nome da cor
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-cor';
            tooltip.textContent = `${lookName} · ${lookDesc}`;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(10, 9, 11, 0.9);
                backdrop-filter: blur(8px);
                color: #f0ece4;
                padding: 0.3rem 1.2rem;
                border-radius: 30px;
                font-size: 0.75rem;
                letter-spacing: 1px;
                border: 1px solid #3d3540;
                pointer-events: none;
                transition: opacity 0.2s;
                z-index: 10;
                white-space: nowrap;
            `;
            
            // Posiciona acima do item
            const rect = item.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width/2 - 60 + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
            tooltip.style.opacity = '0';
            
            document.body.appendChild(tooltip);
            
            // Animação de entrada
            requestAnimationFrame(() => {
                tooltip.style.opacity = '1';
            });
            
            // Armazena referência para remover depois
            item._tooltip = tooltip;
        });

        item.addEventListener('mouseleave', function() {
            if (colorBox) {
                colorBox.style.transform = 'scale(1)';
                colorBox.style.boxShadow = 'inset 0 -8px 8px rgba(0,0,0,0.3), 0 6px 14px rgba(0,0,0,0.7)';
            }
            // Remove tooltip
            if (item._tooltip) {
                item._tooltip.remove();
                item._tooltip = null;
            }
        });
    });

    // --------------------------------------------------------------
    // 5. BOTÃO RSVP: EFEITO DE CLICK COM FEEDBACK
    // --------------------------------------------------------------
    const btnRsvp = document.querySelector('.btn-rsvp');
    if (btnRsvp) {
        btnRsvp.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Feedback visual
            const originalText = this.textContent;
            this.textContent = '✓ LISTA ATUALIZADA';
            this.style.borderColor = '#b79fc9';
            this.style.background = 'rgba(45, 37, 48, 0.6)';
            
            // Mostra um toast de confirmação
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: rgba(23, 21, 24, 0.95);
                backdrop-filter: blur(12px);
                color: #f0ece4;
                padding: 0.8rem 1.8rem;
                border-radius: 40px;
                border: 1px solid #6f5a7a;
                font-weight: 300;
                letter-spacing: 1px;
                font-size: 0.9rem;
                z-index: 999;
                box-shadow: 0 10px 30px rgba(0,0,0,0.6);
                animation: slideInRight 0.4s ease;
            `;
            
            if (!document.getElementById('toast-keyframes-right')) {
                const style = document.createElement('style');
                style.id = 'toast-keyframes-right';
                style.textContent = `
                    @keyframes slideInRight {
                        from { opacity: 0; transform: translateX(40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            toast.textContent = '📬 Você está na lista de espera!';
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.remove();
                }, 400);
            }, 3000);
            
            // Restaura o botão após 2s
            setTimeout(() => {
                this.textContent = originalText;
                this.style.borderColor = '#756a78';
                this.style.background = 'rgba(255, 255, 255, 0.02)';
            }, 2000);
        });
    }

    // --------------------------------------------------------------
    // 6. NAVEGAÇÃO SUAVE (scroll suave para links internos)
    //    (como a página é toda em uma seção, apenas para demonstração)
    // --------------------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Scroll suave para o topo (já que é uma página única)
            if (href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Para links com âncora, tenta encontrar o elemento
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } catch(err) {
                    // fallback
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });

    // --------------------------------------------------------------
    // 7. EFEITO PARALLAX SUTIL NO HERO (movimento com mouse)
    // --------------------------------------------------------------
    const hero = document.querySelector('.hero');
    if (hero) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;
            
            const h1 = hero.querySelector('h1');
            const sub = hero.querySelector('.sub');
            
            if (h1) {
                h1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
                h1.style.transition = 'transform 0.1s ease-out';
            }
            if (sub) {
                sub.style.transform = `translate(${x * -0.3}px, ${y * -0.3}px)`;
                sub.style.transition = 'transform 0.1s ease-out';
            }
        });
    }

    // --------------------------------------------------------------
    // 8. DETECTA SE O USUÁRIO ESTÁ EM DISPOSITIVO MÓVEL 
    //    E AJUSTA O PARALLAX (desativa para melhor performance)
    // --------------------------------------------------------------
    if ('ontouchstart' in window) {
        // Desativa o parallax em toque
        document.removeEventListener('mousemove', function() {});
        // Remove qualquer transform aplicada
        const h1 = document.querySelector('.hero h1');
        const sub = document.querySelector('.hero .sub');
        if (h1) h1.style.transform = 'none';
        if (sub) sub.style.transform = 'none';
    }

    console.log('🌈 Espectro · Moda & Interatividade carregada!');
});

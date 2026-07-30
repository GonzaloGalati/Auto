// mobile nav toggle
const header = document.querySelector('.site-header');
const navToggle = document.getElementById('navToggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav a').forEach((link) => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// back to top (header is sticky, so #top anchor alone won't scroll)
document.querySelectorAll('.back-top').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
// whatsapp demo simulator
const DEMOS = {
    comercios: {
        title: 'Almacén Don Pepe',
        avatar: '🛒',
        messages: [
            { from: 'cliente', text: 'Hola! Tienen delivery?' },
            { from: 'bot', text: '¡Hola! 👋 Sí, hacemos delivery en la zona. ¿Qué necesitás pedir?' },
            { from: 'cliente', text: '2kg de tomate y 1 docena de huevos' },
            { from: 'bot', text: 'Perfecto ✅ Tomate $2.400/kg y docena de huevos $3.100. Total: $7.900. ¿Confirmamos el pedido?' },
            { from: 'cliente', text: 'Dale, confirmado' },
            { from: 'bot', text: '¡Buenísimo! 🛵 Tu pedido llega en 30-40 min. Te aviso cuando salga el repartidor.' },
        ],
    },
    consultorios: {
        title: 'Consultorio Dra. Fernández',
        avatar: '🩺',
        messages: [
            { from: 'cliente', text: 'Hola, necesito sacar un turno' },
            { from: 'bot', text: '¡Hola! 👋 Claro, ¿para qué especialidad sería el turno?' },
            { from: 'cliente', text: 'Clínica general' },
            { from: 'bot', text: 'Tengo disponible mañana miércoles 10:30 hs o jueves 16:00 hs. ¿Cuál te queda mejor?' },
            { from: 'cliente', text: 'El de mañana a las 10:30' },
            { from: 'bot', text: 'Listo ✅ Turno confirmado: miércoles 10:30 hs con la Dra. Fernández. Te mando un recordatorio 1 día antes.' },
        ],
    },
    gimnasios: {
        title: 'PowerFit Gym',
        avatar: '🏋️',
        messages: [
            { from: 'cliente', text: 'Hola, quiero saber los horarios de spinning' },
            { from: 'bot', text: '¡Hola! 💪 Spinning tenemos lunes, miércoles y viernes a las 19:00 hs y sábados a las 10:00 hs.' },
            { from: 'cliente', text: 'Genial, y cuánto sale la cuota?' },
            { from: 'bot', text: 'La cuota mensual full pass sale $28.000. ¿Querés que te reserve un lugar en la próxima clase?' },
            { from: 'cliente', text: 'Sí, para el miércoles' },
            { from: 'bot', text: '¡Reservado! 🔥 Te espero el miércoles 19:00 hs. Cualquier cosa avisame por acá.' },
        ],
    },
};

const demoModal = document.getElementById('demoModal');

if (demoModal) {
    const demoAvatar = document.getElementById('demoAvatar');
    const demoTitle = document.getElementById('demoModalTitle');
    const demoChat = document.getElementById('demoChat');
    const demoReplay = document.getElementById('demoReplay');

    let currentDemoKey = null;
    let demoTimers = [];
    let lastFocusedEl = null;

    function clearDemoTimers() {
        demoTimers.forEach((id) => clearTimeout(id));
        demoTimers = [];
    }

    function scrollChatToBottom() {
        demoChat.scrollTop = demoChat.scrollHeight;
    }

    function playDemo(key) {
        clearDemoTimers();
        demoChat.innerHTML = '';

        const demo = DEMOS[key];
        if (!demo) return;

        let delay = 500;

        demo.messages.forEach((msg) => {
            if (msg.from === 'bot') {
                demoTimers.push(setTimeout(() => {
                    const typing = document.createElement('div');
                    typing.className = 'demo-bubble demo-bubble--bot demo-bubble--typing';
                    typing.innerHTML = '<span></span><span></span><span></span>';
                    demoChat.appendChild(typing);
                    scrollChatToBottom();
                }, delay));

                delay += 900;

                demoTimers.push(setTimeout(() => {
                    const typing = demoChat.querySelector('.demo-bubble--typing');
                    if (typing) typing.remove();

                    const bubble = document.createElement('div');
                    bubble.className = 'demo-bubble demo-bubble--bot';
                    bubble.textContent = msg.text;
                    demoChat.appendChild(bubble);
                    scrollChatToBottom();
                }, delay));

                delay += 500;
            } else {
                demoTimers.push(setTimeout(() => {
                    const bubble = document.createElement('div');
                    bubble.className = 'demo-bubble demo-bubble--cliente';
                    bubble.textContent = msg.text;
                    demoChat.appendChild(bubble);
                    scrollChatToBottom();
                }, delay));

                delay += 900;
            }
        });
    }

    function openDemo(key, triggerEl) {
        const demo = DEMOS[key];
        if (!demo) return;

        currentDemoKey = key;
        lastFocusedEl = triggerEl || document.activeElement;

        demoAvatar.textContent = demo.avatar;
        demoTitle.textContent = demo.title;

        demoModal.classList.add('is-open');
        demoModal.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('no-scroll');

        playDemo(key);
    }

    function closeDemo() {
        clearDemoTimers();
        demoModal.classList.remove('is-open');
        demoModal.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('no-scroll');

        if (lastFocusedEl) lastFocusedEl.focus();
    }

    document.querySelectorAll('.demo-trigger').forEach((btn) => {
        btn.addEventListener('click', () => openDemo(btn.dataset.demo, btn));
    });

    demoModal.querySelectorAll('[data-demo-close]').forEach((el) => {
        el.addEventListener('click', closeDemo);
    });

    demoReplay.addEventListener('click', () => {
        if (currentDemoKey) playDemo(currentDemoKey);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && demoModal.classList.contains('is-open')) {
            closeDemo();
        }
    });
}

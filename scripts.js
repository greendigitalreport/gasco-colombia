// --- CONSTANTES Y ESTADO ---
const mainContainer = document.getElementById('main-container');
const progressBar = document.getElementById('reading-progress-bar');
const backToTop = document.getElementById('back-to-top');
const sidebarNav = document.getElementById('sidebar-nav');
const navIndicator = document.getElementById('nav-indicator');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, #top-section');
const detailsModal = document.getElementById('details-modal');
const modalContent = document.getElementById('modal-content');
const themeToggle = document.getElementById('theme-toggle'); // Agregado para el listener
const startBtn = document.getElementById('start-btn'); // Agregado

// 1. Scroll Spy Mejorado e Indicador de Lectura (4)
mainContainer.addEventListener('scroll', () => {
    const scrollTop = mainContainer.scrollTop;
    const scrollHeight = mainContainer.scrollHeight - mainContainer.clientHeight;

    // Llenar barra de lectura
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;

    // Botón Volver Arriba (6)
    if (scrollTop > 600) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Lógica Scroll Spy
    let currentId = "top-section";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollTop >= sectionTop - 150) {
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-section');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active-section');
        }
    });
});

// 5. Feedback Táctil
function triggerHaptic() {
    if ("vibrate" in navigator) {
        navigator.vibrate(15);
    }
}

// 6. Volver Arriba
function scrollToTop() {
    triggerHaptic();
    mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Modales de Detalle
const contentData = {
    'patios': `
                <div class="flex items-center gap-4 mb-6">
                    <div class="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-3xl">factory</span>
                    </div>
                    <div>
                        <h3 class="text-2xl font-black">Planta Los Patios</h3>
                        <p class="text-xs font-bold text-primary uppercase tracking-widest">Infraestructura de Vanguardia</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <img src="Planta_Los_Patios.jpg" class="rounded-2xl h-44 w-full object-cover">
                    <div class="space-y-4">
                        <p class="text-sm text-slate-500 leading-relaxed">Ubicada estratégicamente en Norte de Santander, esta planta garantiza el suministro regional con tecnología de punta en envasado y seguridad.</p>
                        <div class="flex flex-col gap-2">
                            <span class="text-xs font-bold flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check_circle</span> Capacidad ampliada</span>
                            <span class="text-xs font-bold flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check_circle</span> Seguridad NFPA</span>
                        </div>
                    </div>
                </div>
            `,
    'cop16': `
                <div class="flex items-center gap-4 mb-6">
                    <div class="size-14 bg-eco-green/10 rounded-2xl flex items-center justify-center text-eco-green">
                        <span class="material-symbols-outlined text-3xl">nature_people</span>
                    </div>
                    <div>
                        <h3 class="text-2xl font-black">Biodiversidad y COP16</h3>
                        <p class="text-xs font-bold text-eco-green uppercase tracking-widest">Hitos Ambientales 2024</p>
                    </div>
                </div>
                <div class="space-y-4 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl">
                    <p class="text-sm leading-relaxed">• <strong>Participación activa en la COP16</strong> de Biodiversidad en Cali.</p>
                    <p class="text-sm leading-relaxed">• <strong>Siembra de 40 árboles</strong> en los alrededores de Cristo Rey (Cali).</p>
                    <p class="text-sm leading-relaxed">• <strong>Alianza con CO2CERO</strong> para medición, reducción y compensación de huella de carbono.</p>
                </div>
            `
};

function openModal(type) {
    triggerHaptic();
    modalContent.innerHTML = contentData[type];
    detailsModal.classList.remove('hidden');
    detailsModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    detailsModal.classList.add('hidden');
    detailsModal.classList.remove('flex');
    document.body.style.overflow = '';
}

// --- LÓGICA DE NAVEGACIÓN Y TEMA ---
function moveIndicator(element) {
    const rect = element.getBoundingClientRect();
    const parentRect = sidebarNav.getBoundingClientRect();
    const top = rect.top - parentRect.top;
    navIndicator.style.opacity = '1';
    navIndicator.style.top = `${top}px`;
}

sidebarNav.addEventListener('mouseleave', () => {
    navIndicator.style.opacity = '0';
});

function toggleDarkMode() {
    triggerHaptic();
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    const themeText = document.getElementById('theme-text');
    const themeIcon = document.getElementById('theme-icon');
    themeText.innerText = isDark ? 'Modo Claro' : 'Modo Oscuro';
    themeIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function startExperience() {
    triggerHaptic();
    const overlay = document.getElementById('welcome-overlay');
    const modal = document.getElementById('welcome-modal');
    modal.classList.add('modal-scale-down');
    overlay.classList.add('modal-hidden');
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0090A8', '#10b981', '#FFFFFF']
        });
        animateCounters();
    }, 600);
}

function animateCounters() {
    const counters = document.querySelectorAll('.anim-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        const update = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        update();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        const themeText = document.getElementById('theme-text');
        const themeIcon = document.getElementById('theme-icon');
        if (themeText) themeText.innerText = 'Modo Claro';
        if (themeIcon) themeIcon.innerText = 'light_mode';
    }

    // --- VINCULACIÓN DE EVENTOS (Reemplazo de onclick inline) ---

    // Botón de Inicio
    const startBtn = document.querySelector('button[onclick="startExperience()"]');
    if (startBtn) {
        startBtn.removeAttribute('onclick');
        startBtn.addEventListener('click', startExperience);
    }

    // Botón de Tema
    const themeBtn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (themeBtn) {
        themeBtn.removeAttribute('onclick');
        themeBtn.addEventListener('click', toggleDarkMode);
    }

    // Botón Volver Arriba
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }

    // Botón Cerrar Modal Detalles
    const closeModalBtn = document.querySelector('button[onclick="closeModal()"]');
    if (closeModalBtn) {
        closeModalBtn.removeAttribute('onclick');
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Botón cerrar modal video
    const closeVideoBtn = document.querySelector('button[onclick="closeVideoModal()"]');
    if (closeVideoBtn) {
        closeVideoBtn.removeAttribute('onclick');
        closeVideoBtn.addEventListener('click', closeVideoModal);
    }

    // Botón abrir modal video
    const openVideoBtn = document.querySelector('button[onclick="openVideoModal(); triggerHaptic()"]');
    if (openVideoBtn) {
        openVideoBtn.removeAttribute('onclick');
        openVideoBtn.addEventListener('click', () => {
            openVideoModal();
            triggerHaptic();
        });
    }

    // Botón abrir Trivia
    const openTriviaBtn = document.getElementById('trivia-btn');
    if (openTriviaBtn) {
        openTriviaBtn.addEventListener('click', () => toggleQuiz(true));
    }

    // Botón cerrar Trivia
    const closeTriviaBtn = document.getElementById('quiz-close-btn');
    if (closeTriviaBtn) {
        closeTriviaBtn.addEventListener('click', () => toggleQuiz(false));
    }

    // Nav Links (Scroll Spy e Indicador)
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => moveIndicator(link));
    });

    // Delegación de eventos para tarjetas y elementos dinámicos
    document.addEventListener('click', (e) => {
        // Modales de detalle (Tarjetas Economic/Environmental)
        const card = e.target.closest('[onclick^="openModal"]');
        if (card) {
            const type = card.getAttribute('onclick').match(/'([^']+)'/)[1];
            card.removeAttribute('onclick'); // Limpiamos para futuras interacciones
            card.addEventListener('click', () => openModal(type)); // Reemplazamos
            openModal(type);
        }
    });
});


//--- LOGICA TRIVIA
const quizModal = document.getElementById("quiz-modal");
const quizBody = document.getElementById("quiz-body");

let quizIndex = 0;
let quizScore = 0;

const quizQuestions = [
    {
        q: "¿En cuántos departamentos de Colombia tiene presencia Empresas Gasco?",
        options: ["18", "22", "28", "32"],
        correct: 2
    },
    {
        q: "¿Cuál es la participación de mercado de Gasco en GLP en Colombia?",
        options: ["12.5%", "16.5%", "20%", "22.8%"],
        correct: 1
    },
    {
        q: "¿Cuántas toneladas de CO₂ equivalente fueron compensadas en 2024?",
        options: ["1.200", "3.446", "5.000", "844"],
        correct: 1
    },
    {
        q: "¿Cuántos años lleva Empresas Gasco en Colombia?",
        options: ["30 años", "40 años", "45 años", "50 años"],
        correct: 3
    },
    {
        q: "¿Qué porcentaje de la flota fue renovada para mejorar la eficiencia?",
        options: ["35%", "45%", "51%", "70%"],
        correct: 2
    }
];

function toggleQuiz(show) {
    if (show) {
        quizIndex = 0;
        quizScore = 0;
        renderQuestion();
        quizModal.classList.remove("hidden");
    } else {
        quizModal.classList.add("hidden");
    }
}

function renderQuestion() {
    const q = quizQuestions[quizIndex];
    quizBody.innerHTML = `
                <p class="text-xs font-bold text-slate-400 mb-2">
                    Pregunta ${quizIndex + 1} de ${quizQuestions.length}
                </p>

                <h4 class="text-xl font-black mb-6">${q.q}</h4>

                <div class="space-y-3">
                    ${q.options.map((opt, i) => `
                        <button onclick="checkAnswer(${i})"
                            class="w-full p-4 rounded-xl border border-slate-200 dark:border-border-dark font-semibold hover:bg-primary/10 transition">
                            ${opt}
                        </button>
                    `).join("")}
                </div>
            `;
}

function checkAnswer(index) {
    if (index === quizQuestions[quizIndex].correct) {
        quizScore++;
    }
    quizIndex++;
    quizIndex < quizQuestions.length ? renderQuestion() : showResults();
}

function showResults() {
    if (quizScore === quizQuestions.length) {
        confetti({ particleCount: 150, spread: 80 });
    }

    quizBody.innerHTML = `
                <div class="text-center">
                    <h3 class="text-3xl font-black mb-4">¡Trivia completada!</h3>
                    <p class="text-lg mb-6">
                        Resultado: <strong>${quizScore} / ${quizQuestions.length}</strong>
                    </p>
                    <button onclick="toggleQuiz(false)"
                        class="py-3 px-6 bg-primary text-white rounded-xl font-black hover:scale-105 transition">
                        Cerrar
                    </button>
                </div>
            `;
}



// Funciones para el Modal de Video
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('mainVideo');
    if (modal && video) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        video.play().catch(error => console.log("Play bloqueado por navegador"));
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('mainVideo');
    if (modal && video) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        video.pause();
        video.currentTime = 0;
    }
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) closeVideoModal();
});

function triggerHaptic() {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
}

// --- LÓGICA DEL FLIPBOOK (Informe Ejecutivo) ---
let pageFlip = null;
const reportBtn = document.getElementById('report-btn');
const flipbookModal = document.getElementById('flipbook-modal');
const flipbookClose = document.getElementById('flipbook-close');
const flipbookContainer = document.getElementById('flipbook-container');
const flipbookLoader = document.getElementById('flipbook-loader');
const flipbookControls = document.getElementById('flipbook-controls');
const pageTurnSound = document.getElementById('page-turn-sound');

if (reportBtn) {
    reportBtn.addEventListener('click', async () => {
        triggerHaptic();
        flipbookModal.classList.remove('hidden');
        flipbookModal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        if (!pageFlip) {
            await loadReport();
        }
    });
}

if (flipbookClose) {
    flipbookClose.addEventListener('click', () => {
        flipbookModal.classList.add('hidden');
        flipbookModal.classList.remove('flex');
        document.body.style.overflow = '';
    });
}

async function loadReport() {
    // Configurar el worker de pdf.js
    if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const pdfPath = 'Informe_pdf/Resumen_Ejecutivo_Gasco.pdf';
    console.log('Iniciando carga optimizada del PDF...');

    try {
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;
        const flipbookEl = document.getElementById('flipbook');
        flipbookEl.innerHTML = '';

        // Función para renderizar una página específica
        const renderPage = async (num) => {
            const page = await pdf.getPage(num);
            // Reducimos escala a 1.2 para equilibrio entre nitidez y velocidad
            const viewport = page.getViewport({ scale: 1.2 });

            const pageDiv = document.createElement('div');
            pageDiv.className = 'flipbook-page';

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            pageDiv.appendChild(canvas);
            return pageDiv;
        };

        // 1. Renderizar solo las primeras 2 páginas para iniciar rápido
        console.log('Cargando primeras páginas...');
        for (let i = 1; i <= Math.min(2, totalPages); i++) {
            const pageEl = await renderPage(i);
            flipbookEl.appendChild(pageEl);
        }

        // Inicializar Flipbook con las primeras páginas
        initPageFlip();

        // Actualizar UI básicp
        if (flipbookLoader) flipbookLoader.classList.add('hidden');
        if (flipbookContainer) flipbookContainer.classList.remove('opacity-0');
        if (flipbookControls) flipbookControls.classList.remove('hidden');
        const pageNumEl = document.getElementById('flipbook-page-num');
        if (pageNumEl) pageNumEl.innerText = `1 / ${totalPages}`;

        // 2. Cargar el resto en segundo plano
        if (totalPages > 2) {
            console.log('Cargando resto del documento en segundo plano...');
            for (let i = 3; i <= totalPages; i++) {
                const pageEl = await renderPage(i);
                flipbookEl.appendChild(pageEl);
            }
            // Actualizar el flipbook con las nuevas páginas
            pageFlip.updateFromHtml(document.querySelectorAll('.flipbook-page'));
            console.log('Documento completo cargado.');
        }

    } catch (error) {
        console.error('Error detallado de PDF.js:', error);
        let errorMsg = 'No se pudo cargar el informe ejecutivo.';
        if (window.location.protocol === 'file:') {
            errorMsg += '\n\nSugerencia: Usa un servidor local (Live Server / Python) para evitar bloqueos de seguridad del navegador.';
        } else {
            errorMsg += '\n\nPor favor, verifica que el archivo "Informe_pdf/Resumen_Ejecutivo_Gasco.pdf" exista en la carpeta del proyecto.';
        }
        alert(errorMsg);
        if (flipbookModal) {
            flipbookModal.classList.add('hidden');
            flipbookModal.classList.remove('flex');
        }
        document.body.style.overflow = '';
    }
}

function initPageFlip() {
    const flipContainer = document.getElementById('flipbook');
    if (!flipContainer) return;

    // Detectar si es móvil para ajustar el tamaño inicial
    const isMobile = window.innerWidth < 768;

    pageFlip = new St.PageFlip(flipContainer, {
        width: 595,
        height: 842,
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: isMobile // Usar modo retrato en móvil
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.flipbook-page'));

    pageFlip.on('flip', (e) => {
        const totalPages = pageFlip.getPageCount();
        const pageNumEl = document.getElementById('flipbook-page-num');
        if (pageNumEl) {
            pageNumEl.innerText = `${e.data + 1} / ${totalPages}`;
        }

        if (pageTurnSound) {
            pageTurnSound.currentTime = 0;
            pageTurnSound.play().catch(() => { });
        }
    });

    const prevBtn = document.getElementById('flipbook-prev');
    const nextBtn = document.getElementById('flipbook-next');
    if (prevBtn) prevBtn.onclick = () => pageFlip.flipPrev();
    if (nextBtn) nextBtn.onclick = () => pageFlip.flipNext();
}

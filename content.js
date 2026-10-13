// 1. ОПТИМИЗИРОВАННЫЙ И ЛЕГКИЙ CSS
if (!document.getElementById('yandex-space-style')) {
    const style = document.createElement('style');
    style.id = 'yandex-space-style';
    style.innerHTML = `
        /* === ПЕРЕКРАШИВАЕМ ИНТЕРФЕЙС === */
        :root, html, body {
            --brand-color: #ffffff !important;
            --yp-brand-color: #ffffff !important;
            --text-brand: #ffffff !important;
            --color-text-brand: #ffffff !important;
        }

        /* Убираем логотип */
        [class*="NavbarDesktop_logo"] { 
            display: none !important; 
        }

        /* Перекрашиваем текст в белый */
        [aria-current="page"] span, [aria-current="page"] div, [aria-current="page"] svg,
        [class*="VibeResetButton"], [class*="UserProfile_userName"], [class*="UserProfile_plusLink"] {
            color: #ffffff !important; 
            fill: #ffffff !important;
        }

        /* === ИДЕАЛЬНЫЙ МИНИМАЛИЗМ: СКРЫВАЕМ ЛИШНИЕ ПУНКТЫ И ИКОНКИ === */
        li:has(a[href*="/landing/main"]),
        li:has(a[href*="/concerts"]),
        li:has(a[href*="/non-music"]),
        li:has(a[href*="/plus"]) {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            visibility: hidden !important;
        }

        /* Скрываем ТОЛЬКО сам значок 18+, не трогая плеер */
        span[class*="explicitMark"],
        span[class*="ExplicitMark"],
        svg[class*="explicitMark"],
        svg[class*="ExplicitMark"],
        svg:has(use[href*="#exclamation"]),
        svg:has(use[xlink\\:href*="#exclamation"]) {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            pointer-events: none !important;
        }

        /* === УСКОРЕННАЯ ОЧИСТКА ИНТЕРФЕЙСА === */
        [class*="VibePage_words"], [class*="WordsCard_root"],
        [class*="WheelDesktop_root"], [class*="VibePage_wheel"],
        canvas, [class*="VibeWidgetAnimation"] {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Прозрачность главных слоев */
        html, body, #root, div[class*="Layout"], div[class*="Page_"], div[class*="Content_"] {
            background: transparent !important;
            box-shadow: none !important;
        }

        /* === ТОЧЕЧНОЕ УБИЙСТВО ГРАДИЕНТОВ === */
        html, body, #root, div[class*="CommonLayout"], div[class*="VibePage"] {
            --vibe-gradient-stop-0: transparent !important;
            --vibe-gradient-stop-1: transparent !important;
            --vibe-gradient-stop-2: transparent !important;
            --vibe-gradient-stop-3: transparent !important;
            --vibe-gradient-stop-4: transparent !important;
            --vibe-gradient-stop-5: transparent !important;
            --vibe-gradient-stop-6: transparent !important;
            --vibe-gradient-stop-7: transparent !important;
            --vibe-gradient-stop-8: transparent !important;
            --vibe-gradient-stop-9: transparent !important;
            --vibe-gradient-stop-10: transparent !important;
            --vibe-gradient-stop-11: transparent !important;
            --vibe-gradient-stop-12: transparent !important;
            --vibe-gradient-stop-13: transparent !important;
            --vibe-gradient-stop-14: transparent !important;
            --vibe-gradient-stop-15: transparent !important;
        }

        /* === АППАРАТНОЕ УСКОРЕНИЕ ВИДЕО (GPU) === */
        #super-video-bg {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            object-fit: cover;
            z-index: -99999;
            pointer-events: none;
            background-color: #000;
            
            /* Мягкое форсирование видеокарты без перегрузки памяти */
            transform: translate3d(0, 0, 0);
        }
    `;
    document.documentElement.appendChild(style);
}

// 2. ОТЛОЖЕННАЯ ВСТАВКА ВИДЕО
function injectVideo() {
    if (document.getElementById('super-video-bg')) return;

    const video = document.createElement('video');
    video.id = 'super-video-bg';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('preload', 'auto'); 

    const sourceWebm = document.createElement('source');
    sourceWebm.src = chrome.runtime.getURL('background.webm');
    sourceWebm.type = 'video/webm';

    const sourceMp4 = document.createElement('source');
    sourceMp4.src = chrome.runtime.getURL('background.mp4');
    sourceMp4.type = 'video/mp4';

    video.appendChild(sourceWebm);
    video.appendChild(sourceMp4);

    if (document.body) {
        document.body.prepend(video);
    } else {
        document.documentElement.appendChild(video);
    }

    // НОВОЕ: Умная пауза. Если свернул вкладку — видео останавливается
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            video.pause();
        } else {
            video.play();
        }
    });
}

// Запускаем видео только тогда, когда сайт будет готов
if (document.readyState === 'complete') {
    injectVideo();
} else {
    window.addEventListener('load', injectVideo);
}
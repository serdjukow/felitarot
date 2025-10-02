// Felitarot Landing Page - Modular JavaScript
// ===========================================

// Application State
const AppState = {
    theme: localStorage.getItem("felitarot-theme") || "dark",
    isInitialized: false,
}

// Theme Management Module
const ThemeManager = {
    init() {
        this.applyTheme(AppState.theme)
        this.createToggleButton()
        this.bindEvents()
    },

    createToggleButton() {
        const navInner = document.querySelector(".nav-inner")
        if (!navInner) return

        const toggleBtn = document.createElement("button")
        toggleBtn.className = "theme-toggle"
        toggleBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span>${AppState.theme === "dark" ? "Light" : "Dark"}</span>
    `

        const ctaRow = navInner.querySelector(".cta-row")
        if (ctaRow) {
            ctaRow.appendChild(toggleBtn)
        }
    },

    bindEvents() {
        const toggleBtn = document.querySelector(".theme-toggle")
        if (toggleBtn) {
            toggleBtn.addEventListener("click", this.toggleTheme.bind(this))
        }
    },

    toggleTheme() {
        const newTheme = AppState.theme === "dark" ? "light" : "dark"
        this.applyTheme(newTheme)
        AppState.theme = newTheme
        localStorage.setItem("felitarot-theme", newTheme)

        // Update button text
        const toggleBtn = document.querySelector(".theme-toggle span")
        if (toggleBtn) {
            toggleBtn.textContent = newTheme === "dark" ? "Light" : "Dark"
        }
    },

    applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme)
    },
}

// Analytics Module (упрощенный - без счетчика заявок)
const Analytics = {
    init() {
        // Пока аналитика не нужна, модуль оставлен для будущего расширения
        console.log("Analytics module initialized (simplified)")
    },
}

// Utility Functions Module
const Utils = {
    init() {
        this.updateYear()
        this.setupEmailCopy()
        this.setupSmoothScrolling()
    },

    updateYear() {
        const yearElement = document.getElementById("y")
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear()
        }
    },

    setupEmailCopy() {
        const emailLink = document.querySelector('a[href^="mailto:"]')
        if (emailLink) {
            emailLink.addEventListener("click", function (e) {
                const email = this.getAttribute("href").replace("mailto:", "")
                if (navigator.clipboard) {
                    navigator.clipboard
                        .writeText(email)
                        .then(() => {
                            // Optional: Show success message
                            console.log("Email copied to clipboard")
                        })
                        .catch(() => {
                            console.log("Failed to copy email")
                        })
                }
            })
        }
    },

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]')
        anchorLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault()
                const targetId = this.getAttribute("href").substring(1)
                const targetElement = document.getElementById(targetId)

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                }
            })
        })
    },
}

// Performance Module
const Performance = {
    init() {
        this.lazyLoadImages()
        this.optimizeAnimations()
        this.optimizeForMobile()
    },

    lazyLoadImages() {
        // Lazy loading for images (if any are added later)
        const images = document.querySelectorAll("img[data-src]")
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    img.src = img.dataset.src
                    img.classList.remove("lazy")
                    observer.unobserve(img)
                }
            })
        })

        images.forEach((img) => imageObserver.observe(img))
    },

    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.documentElement.style.setProperty("--transition-duration", "0.01ms")
        }
    },

    optimizeForMobile() {
        // Улучшения для мобильных устройств
        this.detectMobile()
        this.optimizeTouchEvents()
        this.preventZoomOnInput()
    },

    detectMobile() {
        // Определяем мобильное устройство
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0

        if (isMobile || isTouch) {
            document.documentElement.classList.add("mobile-device")
        }
    },

    optimizeTouchEvents() {
        // Оптимизируем touch события
        let touchStartY = 0
        let touchEndY = 0

        document.addEventListener(
            "touchstart",
            (e) => {
                touchStartY = e.changedTouches[0].screenY
            },
            { passive: true }
        )

        document.addEventListener(
            "touchend",
            (e) => {
                touchEndY = e.changedTouches[0].screenY
                this.handleSwipe(touchStartY, touchEndY)
            },
            { passive: true }
        )
    },

    handleSwipe(startY, endY) {
        // Обработка свайпов (можно расширить)
        const diff = startY - endY
        const threshold = 50

        if (Math.abs(diff) > threshold) {
            // Можно добавить навигацию свайпами
            console.log("Swipe detected:", diff > 0 ? "up" : "down")
        }
    },

    preventZoomOnInput() {
        // Предотвращаем zoom при фокусе на input (iOS)
        const inputs = document.querySelectorAll("input, textarea, select")
        inputs.forEach((input) => {
            input.addEventListener("focus", () => {
                if (window.innerWidth < 768) {
                    document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no")
                }
            })

            input.addEventListener("blur", () => {
                document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes")
            })
        })
    },
}

// Main Application Initialization
const App = {
    init() {
        if (AppState.isInitialized) return

        console.log("Initializing Felitarot Landing Page...")

        // Initialize all modules
        ThemeManager.init()
        Analytics.init()
        Utils.init()
        Performance.init()

        // Mark as initialized
        AppState.isInitialized = true

        console.log("Felitarot Landing Page initialized successfully")
    },
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", App.init)
} else {
    App.init()
}

// Export for potential external use
window.FelitarotApp = {
    AppState,
    ThemeManager,
    Analytics,
    Utils,
    Performance,
}

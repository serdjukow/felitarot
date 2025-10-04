// Felitarot Landing Page - Modular JavaScript
// ===========================================

// Application State
const AppState = {
    theme: localStorage.getItem("felitarot-theme") || "dark",
    isInitialized: false,
    cookieConsent: localStorage.getItem("felitarot-cookie-consent") || null,
}

// Theme Management Module
const ThemeManager = {
    init() {
        // Load theme from localStorage only if functionality cookies are allowed
        if (AppState.cookieConsent === "accepted" || (AppState.cookieConsent === "custom" && this.areFunctionalityCookiesAllowed()) || AppState.cookieConsent === null) {
            this.applyTheme(AppState.theme)
        } else {
            // If functionality cookies are denied, use default theme
            this.applyTheme("dark")
        }

        this.createToggleButton()
        this.bindEvents()
    },

    createToggleButton() {
        const navInner = document.querySelector(".nav-inner")
        if (!navInner) return

        const toggleBtn = document.createElement("button")
        toggleBtn.className = "theme-toggle"
        toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
      </svg>
    `
        toggleBtn.setAttribute("aria-label", AppState.theme === "dark" ? "Переключить на светлую тему" : "Переключить на темную тему")

        // Добавляем кнопку в навигационное меню
        const navMenu = navInner.querySelector(".nav-menu")
        if (navMenu) {
            navMenu.appendChild(toggleBtn)
        }
    },

    bindEvents() {
        const toggleBtn = document.querySelector(".theme-toggle")
        if (toggleBtn) {
            toggleBtn.addEventListener("click", this.toggleTheme.bind(this))
        }
    },

    toggleTheme() {
        // Check if functionality cookies are allowed
        if (AppState.cookieConsent === "declined" || (AppState.cookieConsent === "custom" && !this.areFunctionalityCookiesAllowed())) {
            this.showCookieWarning()
            return
        }

        const newTheme = AppState.theme === "dark" ? "light" : "dark"
        this.applyTheme(newTheme)
        AppState.theme = newTheme
        localStorage.setItem("felitarot-theme", newTheme)

        // Update button aria-label
        const toggleBtn = document.querySelector(".theme-toggle")
        if (toggleBtn) {
            toggleBtn.setAttribute("aria-label", newTheme === "dark" ? "Переключить на светлую тему" : "Переключить на темную тему")
        }
    },

    areFunctionalityCookiesAllowed() {
        try {
            const settings = JSON.parse(localStorage.getItem("felitarot-cookie-settings") || "{}")
            return settings.functionality === true
        } catch {
            return false
        }
    },

    showCookieWarning() {
        const notification = document.createElement("div")
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--warn);
            color: #000;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            font-size: 0.9rem;
            box-shadow: var(--shadow);
            max-width: 300px;
        `
        notification.innerHTML = `
            <strong>🍪 Функциональные cookie отключены</strong><br>
            Для сохранения темы включите функциональные cookie в настройках.
            <button onclick="this.parentElement.remove()" style="
                background: rgba(0,0,0,0.1);
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                margin-top: 0.5rem;
                cursor: pointer;
            ">Понятно</button>
        `
        document.body.appendChild(notification)

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove()
            }
        }, 5000)
    },

    applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme)
    },

    updateThemeBasedOnConsent() {
        // Re-check if functionality cookies are allowed and update theme accordingly
        if (AppState.cookieConsent === "accepted" || (AppState.cookieConsent === "custom" && this.areFunctionalityCookiesAllowed())) {
            // Functionality cookies allowed - use saved theme
            this.applyTheme(AppState.theme)
        } else {
            // Functionality cookies denied - reset to default
            this.applyTheme("dark")
            AppState.theme = "dark"
        }
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
        this.bindMobileMenu()
        this.bindActiveNavigation()
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

    bindMobileMenu() {
        const toggle = document.querySelector(".mobile-menu-toggle")
        const mobileMenu = document.querySelector(".mobile-menu")

        console.log("Mobile menu elements:", { toggle, mobileMenu })

        if (toggle && mobileMenu) {
            toggle.addEventListener("click", (e) => {
                e.preventDefault()
                console.log("Mobile menu toggle clicked")
                toggle.classList.toggle("active")
                mobileMenu.classList.toggle("active")
            })

            // Закрыть меню при клике на ссылку
            const mobileLinks = document.querySelectorAll(".mobile-nav-link")
            mobileLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    toggle.classList.remove("active")
                    mobileMenu.classList.remove("active")
                })
            })

            // Закрыть меню при клике вне его
            document.addEventListener("click", (e) => {
                if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    toggle.classList.remove("active")
                    mobileMenu.classList.remove("active")
                }
            })
        }

        // Мобильный переключатель темы
        const mobileThemeToggle = document.getElementById("theme-toggle-mobile")
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener("click", () => {
                ThemeManager.toggleTheme()
            })
        }
    },

    bindActiveNavigation() {
        const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
        const sections = document.querySelectorAll("section[id]")

        // Функция для обновления активной ссылки
        const updateActiveLink = () => {
            let current = ""
            const scrollPosition = window.scrollY + 150 // Увеличиваем отступ для лучшего определения

            sections.forEach((section) => {
                const sectionTop = section.offsetTop
                const sectionHeight = section.offsetHeight
                const sectionBottom = sectionTop + sectionHeight

                // Проверяем, находится ли секция в видимой области
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    current = section.getAttribute("id")
                }
            })

            // Убираем активный класс со всех ссылок
            navLinks.forEach((link) => {
                link.classList.remove("active")
            })

            // Добавляем активный класс только к соответствующей ссылке
            if (current) {
                const activeLink = document.querySelector(`a[href="#${current}"]`)
                if (activeLink) {
                    activeLink.classList.add("active")
                }
            }
        }

        // Обновлять при скролле с throttling для производительности
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveLink()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll)

        // Обновлять при загрузке
        updateActiveLink()
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
        CookieManager.init()

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

// Cookie Consent Manager
const CookieManager = {
    init() {
        this.showBannerIfNeeded()
        this.bindEvents()
    },

    showBannerIfNeeded() {
        if (!AppState.cookieConsent) {
            const banner = document.getElementById("cookie-banner")
            if (banner) {
                banner.style.display = "block"
            }
        }
    },

    bindEvents() {
        const acceptBtn = document.getElementById("accept-cookies")
        const declineBtn = document.getElementById("decline-cookies")
        const settingsBtn = document.getElementById("cookie-settings")
        const settingsLink = document.getElementById("cookie-settings-link")

        if (acceptBtn) {
            acceptBtn.addEventListener("click", () => this.acceptCookies())
        }

        if (declineBtn) {
            declineBtn.addEventListener("click", () => this.declineCookies())
        }

        if (settingsBtn) {
            settingsBtn.addEventListener("click", () => this.showSettings())
        }

        if (settingsLink) {
            settingsLink.addEventListener("click", (e) => {
                e.preventDefault()
                this.showSettings()
            })
        }
    },

    acceptCookies() {
        AppState.cookieConsent = "accepted"
        localStorage.setItem("felitarot-cookie-consent", "accepted")

        // Update Google Analytics consent
        if (typeof gtag !== "undefined") {
            gtag("consent", "update", {
                analytics_storage: "granted",
                ad_storage: "granted",
                functionality_storage: "granted",
                personalization_storage: "granted",
            })
        }

        this.hideBanner()
    },

    declineCookies() {
        AppState.cookieConsent = "declined"
        localStorage.setItem("felitarot-cookie-consent", "declined")

        // Keep Google Analytics consent as denied
        if (typeof gtag !== "undefined") {
            gtag("consent", "update", {
                analytics_storage: "denied",
                ad_storage: "denied",
                functionality_storage: "denied",
                personalization_storage: "denied",
            })
        }

        this.hideBanner()

        // Show message about limited functionality
        this.showNotification("Cookie отклонены. Некоторые функции могут работать ограниченно.")

        // Optional: Show info about what's disabled
        setTimeout(() => {
            this.showLimitedFunctionalityInfo()
        }, 2000)
    },

    showLimitedFunctionalityInfo() {
        const info = document.createElement("div")
        info.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: var(--warn);
            color: #000;
            padding: 1rem;
            border-radius: 8px;
            z-index: 3000;
            font-size: 0.9rem;
            box-shadow: var(--shadow);
            max-width: 400px;
            margin: 0 auto;
        `
        info.innerHTML = `
            <strong>ℹ️ Ограниченная функциональность</strong><br>
            Без cookie некоторые функции могут работать ограниченно:
            <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
                <li>Аналитика отключена</li>
                <li>Настройки не сохраняются</li>
                <li>Персонализация недоступна</li>
            </ul>
            <button onclick="this.parentElement.remove()" style="
                background: rgba(0,0,0,0.1);
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                margin-top: 0.5rem;
                cursor: pointer;
            ">Понятно</button>
        `
        document.body.appendChild(info)

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (info.parentElement) {
                info.remove()
            }
        }, 10000)
    },

    showSettings() {
        const modal = document.getElementById("cookie-settings-modal")
        if (modal) {
            modal.style.display = "flex"
            this.bindModalEvents()
        }
    },

    bindModalEvents() {
        const closeBtn = document.getElementById("close-settings")
        const saveBtn = document.getElementById("save-settings")
        const acceptAllBtn = document.getElementById("accept-all-settings")
        const resetBtn = document.getElementById("reset-cookie-consent")

        if (closeBtn) {
            closeBtn.addEventListener("click", () => this.closeModal())
        }

        if (saveBtn) {
            saveBtn.addEventListener("click", () => this.saveCustomSettings())
        }

        if (acceptAllBtn) {
            acceptAllBtn.addEventListener("click", () => this.acceptCookies())
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", () => this.resetCookieConsent())
        }

        // Close modal on backdrop click
        const modal = document.getElementById("cookie-settings-modal")
        if (modal) {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    this.closeModal()
                }
            })
        }
    },

    closeModal() {
        const modal = document.getElementById("cookie-settings-modal")
        if (modal) {
            modal.style.display = "none"
        }
    },

    saveCustomSettings() {
        const analyticsToggle = document.getElementById("analytics-toggle")
        const functionalityToggle = document.getElementById("functionality-toggle")

        const analyticsEnabled = analyticsToggle ? analyticsToggle.checked : false
        const functionalityEnabled = functionalityToggle ? functionalityToggle.checked : false

        // Save settings
        const settings = {
            analytics: analyticsEnabled,
            functionality: functionalityEnabled,
            timestamp: Date.now(),
        }

        AppState.cookieConsent = "custom"
        localStorage.setItem("felitarot-cookie-consent", "custom")
        localStorage.setItem("felitarot-cookie-settings", JSON.stringify(settings))

        // Update Google Analytics consent based on settings
        if (typeof gtag !== "undefined") {
            gtag("consent", "update", {
                analytics_storage: analyticsEnabled ? "granted" : "denied",
                ad_storage: analyticsEnabled ? "granted" : "denied",
                functionality_storage: functionalityEnabled ? "granted" : "denied",
                personalization_storage: functionalityEnabled ? "granted" : "denied",
            })
        }

        this.closeModal()
        this.hideBanner()

        // Update theme based on new settings
        if (typeof ThemeManager !== "undefined") {
            ThemeManager.updateThemeBasedOnConsent()
        }

        // Show confirmation
        this.showNotification("Настройки cookie сохранены!")
    },

    showNotification(message) {
        // Simple notification - можно улучшить
        const notification = document.createElement("div")
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--acc);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            font-size: 0.9rem;
            box-shadow: var(--shadow);
        `
        notification.textContent = message
        document.body.appendChild(notification)

        setTimeout(() => {
            notification.remove()
        }, 3000)
    },

    // Функция для сброса cookie настроек (для тестирования)
    resetCookieConsent() {
        localStorage.removeItem("felitarot-cookie-consent")
        localStorage.removeItem("felitarot-cookie-settings")
        AppState.cookieConsent = null
        this.showBannerIfNeeded()
        this.showNotification("Настройки cookie сброшены. Выберите заново.")
    },

    hideBanner() {
        const banner = document.getElementById("cookie-banner")
        if (banner) {
            banner.style.display = "none"
        }
    },
}

// Export for potential external use
window.FelitarotApp = {
    AppState,
    ThemeManager,
    Analytics,
    Utils,
    Performance,
    CookieManager,
}

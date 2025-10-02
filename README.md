# Felitarot Landing Page

Eine moderne, modulare Landing-Page für Felitarot - Tarot-Beratungen und Online-Konsultationen.

## 🚀 Features

-   **Responsive Design** - Optimiert für alle Geräte
-   **Dark/Light Theme** - Umschaltbar mit LocalStorage-Persistierung
-   **Modulare Struktur** - Saubere Trennung von HTML, CSS und JavaScript
-   **Performance** - Lazy Loading und optimierte Animationen
-   **Accessibility** - Unterstützung für reduzierte Bewegungen

## 📁 Projektstruktur

```
felitarot/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Alle Styles (CSS-Variablen, Themes)
├── script.js           # Modulares JavaScript
└── README.md           # Diese Dokumentation
```

## 🎨 Design-System

### CSS-Variablen

-   `--bg` - Haupt-Hintergrund
-   `--card` - Karten-Hintergrund
-   `--acc` - Akzentfarbe (Lila)
-   `--text` - Haupttext
-   `--muted` - Sekundärtext

### Themes

-   **Dark Theme** (Standard) - Dunkler Hintergrund mit lila Akzenten
-   **Light Theme** - Heller Hintergrund mit angepassten Kontrasten

## ⚙️ JavaScript-Module

### ThemeManager

-   Theme-Umschaltung
-   LocalStorage-Persistierung
-   Dynamische Button-Updates

### Analytics

-   Модуль подготовлен для будущего расширения
-   Пока аналитика не реализована

### Utils

-   Automatische Jahres-Update
-   Email-Kopieren in Zwischenablage
-   Smooth Scrolling für Anker-Links

### Performance

-   Lazy Loading für Bilder
-   Reduzierte Animationen für Accessibility

## 🔧 Anpassungen

### Links aktualisieren

```html
<!-- In index.html -->
<a href="https://t.me/felitarot" target="_blank">Telegram</a>
<a href="https://instagram.com/felitarot_official" target="_blank">Instagram</a>
```

### Preise ändern

```html
<!-- In der Pricing-Sektion -->
<div class="price">30 €</div>
```

### Analytics hinzufügen (в будущем)

```javascript
// В script.js - Analytics.sendAnalytics()
// Пока модуль упрощен, можно расширить при необходимости
```

## 🚀 Deployment

1. Alle Dateien auf den Server hochladen
2. Sicherstellen, dass alle Pfade korrekt sind
3. HTTPS für Clipboard-API verwenden
4. Analytics-Endpunkt konfigurieren (optional)

## 📱 Browser-Unterstützung

-   Chrome 60+
-   Firefox 55+
-   Safari 12+
-   Edge 79+

## 🎯 Performance

-   Lazy Loading für Bilder
-   CSS-Variablen für schnelle Theme-Umschaltung
-   Modulare JavaScript-Struktur
-   Optimierte Animationen

## 📊 Analytics

Пока аналитика не реализована:

-   Модуль подготовлен для будущего расширения
-   Можно добавить счетчик заявок при необходимости
-   LocalStorage используется только для темы

## 🔒 Datenschutz

-   Keine externen Analytics-Tracker
-   LocalStorage nur für Theme-Einstellungen
-   Keine Cookies
-   GDPR-konform

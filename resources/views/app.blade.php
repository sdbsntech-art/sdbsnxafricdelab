<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
        
        <!-- Primary SEO Meta Tags -->
        <title inertia>SDBSNX | Cours d’informatique au Sénégal</title>
        <meta name="description" content="SDBSNX propose des ressources gratuites en informatique et développement d’applications : cours, TD, examens et vidéos pour les niveaux L1, L2 et L3.">
        <meta name="author" content="SDBSNX">
        <meta name="publisher" content="SDBSNX">
        <meta name="theme-color" content="#1E5B45">

        <!-- PWA Configuration -->
        <link rel="manifest" href="/manifest.json">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="SDBSNX">
        <link rel="icon" type="image/png" href="/sdbsnx-logo.png">
        <link rel="apple-touch-icon" href="/sdbsnx-logo.png">

        <!-- Google Fonts: Outfit, Plus Jakarta Sans, JetBrains Mono -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

        <script>
            // Apply saved theme immediately
            (function() {
                var savedTheme = localStorage.getItem('sdbsnx_theme');
                if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                }
            })();

            // Protection immédiate anti-inspection, clic droit et touches DevTools
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            document.addEventListener('keydown', function(e) {
                // F12
                if (e.key === 'F12' || e.keyCode === 123) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                var isCmd = e.ctrlKey || e.metaKey;
                // Ctrl+Shift+I / J / C
                if (isCmd && e.shiftKey && ['i','I','j','J','c','C'].indexOf(e.key) !== -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                // Ctrl+U (Code source) & Ctrl+S (Sauvegarder)
                if (isCmd && ['u','U','s','S'].indexOf(e.key) !== -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        </script>

        <!-- Scripts & Styles -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased min-h-screen transition-colors duration-200">
        @inertia
    </body>
</html>

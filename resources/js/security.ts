/**
 * SDBSNX Security & Source Code Protection Module
 * 
 * 1. Bloque le clic droit (menu contextuel).
 * 2. Désactive la touche F12 (Inspecteur d'éléments / DevTools).
 * 3. Désactive les raccourcis d'inspection :
 *    - Ctrl+Shift+I / Cmd+Opt+I (Outils de développement)
 *    - Ctrl+Shift+J / Cmd+Opt+J (Console JavaScript)
 *    - Ctrl+Shift+C / Cmd+Opt+C (Sélecteur d'éléments)
 *    - Ctrl+U / Cmd+U (Affichage du code source)
 *    - Ctrl+S / Cmd+S (Enregistrement de la page)
 * 4. Affiche un avertissement de sécurité légal dans la console.
 */

export function initSecurityProtection(): void {
    if (typeof window === 'undefined') {
        return;
    }

    // 1. Bloquer le clic droit (contextmenu)
    document.addEventListener('contextmenu', (e: MouseEvent) => {
        e.preventDefault();
        return false;
    }, { capture: true });

    // 2. Bloquer les raccourcis clavier
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        // Touche F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        const isCtrlOrCmd = e.ctrlKey || e.metaKey;

        // Ctrl + Shift + I (Inspect)
        // Ctrl + Shift + J (Console)
        // Ctrl + Shift + C (Inspect Element)
        if (isCtrlOrCmd && e.shiftKey) {
            const keyLower = e.key.toLowerCase();
            if (keyLower === 'i' || keyLower === 'j' || keyLower === 'c') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }

        // Ctrl + U (View Source)
        if (isCtrlOrCmd && (e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Ctrl + S (Save Page)
        if (isCtrlOrCmd && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, { capture: true });

    // 3. Message de sécurité dissuasif dans la console
    const displayWarning = () => {
        try {
            console.clear();
            console.log(
                '%c⛔ ARRÊT ! ESPACE SÉCURISÉ SDBSNX',
                'color: #EF4444; font-size: 28px; font-weight: 900; -webkit-text-stroke: 1px black; padding: 6px 12px; background: #1A0505; border-radius: 8px;'
            );
            console.log(
                '%cCette console et les outils de développement sont strictement restreints. Toute tentative d\'injection de code, de rétro-ingénierie ou d\'extraction non autorisée est tracée et sanctionnée conformément à la loi sénégalaise n° 2008-12 relative à la protection des données et au Code pénal.',
                'color: #1E5B45; font-size: 13px; font-weight: bold; line-height: 1.6; margin-top: 8px;'
            );
            console.log(
                '%cPlateforme officielle SDBSNX • Direction Technique : sdbsntech@gmail.com',
                'color: #7D897F; font-size: 11px; font-family: monospace;'
            );
        } catch {
            // Silence
        }
    };

    displayWarning();
}


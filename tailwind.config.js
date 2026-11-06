import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
                heading: ['"Outfit"', ...defaultTheme.fontFamily.sans],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                // Authentic SDBSNX Chic Dark Green & Gold Palette (ida-cours.site)
                sdbsnx: {
                    DEFAULT: '#1E5B45',
                    50: '#F2F8F5',
                    100: '#E2F0EA',
                    200: '#C3E1D4',
                    300: '#98CBBA',
                    400: '#62A87A',
                    500: '#377657',
                    600: '#1E5B45', // Official SDBSNX Forest Green
                    700: '#184837',
                    800: '#14392C',
                    900: '#102D23',
                    950: '#081A13',
                },
                // Gold / Chic Warm Accent (ida-cours.site)
                gold: {
                    DEFAULT: '#A8743F',
                    50: '#FAF6F0',
                    100: '#F3ECDE',
                    200: '#E7D7BD',
                    300: '#D5A45F', // Light Gold
                    400: '#C4904C',
                    500: '#A8743F', // Official SDBSNX Chic Gold
                    600: '#8F5D30',
                    700: '#724527',
                    800: '#5E3823',
                    900: '#4D2E1F',
                },
                // Exact surfaces from ida-cours.site
                surface: {
                    // Dark theme surfaces
                    dark: {
                        bg: '#101713',
                        secondary: '#151E18',
                        card: '#1A241D',
                        hover: '#202D24',
                        elevated: '#19231C',
                        border: 'rgba(255, 255, 255, 0.08)',
                    },
                    // Light theme surfaces
                    light: {
                        bg: '#F7F5EF',
                        secondary: '#F0EEE6',
                        card: '#FFFFFF',
                        hover: '#FBFAF6',
                        elevated: '#FFFEFB',
                        border: 'rgba(40, 55, 43, 0.12)',
                    },
                },
                // UN-CHK Brand Compatible Colors
                unchk: {
                    blue: {
                        DEFAULT: '#1E5B45',
                        50: '#F2F8F5',
                        100: '#E2F0EA',
                        200: '#C3E1D4',
                        300: '#98CBBA',
                        400: '#62A87A',
                        500: '#1E5B45',
                        600: '#184837',
                        700: '#14392C',
                        800: '#102D23',
                        900: '#081A13',
                    },
                    green: {
                        DEFAULT: '#377657',
                        50: '#E6F7EF',
                        100: '#CCEEE0',
                        200: '#99DEC0',
                        300: '#66CEA1',
                        400: '#33BE81',
                        500: '#377657',
                        600: '#1E5B45',
                        700: '#184837',
                        800: '#14392C',
                        900: '#081A13',
                    },
                    orange: {
                        DEFAULT: '#A8743F',
                        50: '#FAF6F0',
                        100: '#F3ECDE',
                        200: '#E7D7BD',
                        300: '#D5A45F',
                        400: '#C4904C',
                        500: '#A8743F',
                        600: '#8F5D30',
                        700: '#724527',
                        800: '#5E3823',
                        900: '#4D2E1F',
                    },
                    navy: '#101713',
                    surface: '#1A241D',
                },
            },
        },
    },

    plugins: [forms],
};

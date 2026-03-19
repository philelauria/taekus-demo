/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
                    secondary: 'rgb(var(--color-background-secondary) / <alpha-value>)',
                    tertiary: 'rgb(var(--color-background-tertiary) / <alpha-value>)',
                },
                surface: {
                    DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
                    elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
                },
                'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
                'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
                'text-tertiary': 'rgb(var(--color-text-tertiary) / <alpha-value>)',
                'text-inverse': 'rgb(var(--color-text-inverse) / <alpha-value>)',
                brand: {
                    DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
                    light: 'rgb(var(--color-brand-light) / <alpha-value>)',
                    dark: 'rgb(var(--color-brand-dark) / <alpha-value>)',
                },
                success: {
                    DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
                    light: 'rgb(var(--color-success-light) / <alpha-value>)',
                },
                warning: {
                    DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
                    light: 'rgb(var(--color-warning-light) / <alpha-value>)',
                },
                error: {
                    DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
                    light: 'rgb(var(--color-error-light) / <alpha-value>)',
                },
                info: {
                    DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
                    light: 'rgb(var(--color-info-light) / <alpha-value>)',
                },
                border: {
                    DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
                    light: 'rgb(var(--color-border-light) / <alpha-value>)',
                },
                divider: 'rgb(var(--color-divider) / <alpha-value>)',
                disabled: 'rgb(var(--color-disabled) / <alpha-value>)',
                placeholder: 'rgb(var(--color-placeholder) / <alpha-value>)',
                'btn-primary': 'rgb(var(--color-btn-primary) / <alpha-value>)',
                'btn-primary-text': 'rgb(var(--color-btn-primary-text) / <alpha-value>)',
                'btn-secondary': 'rgb(var(--color-btn-secondary) / <alpha-value>)',
                'btn-secondary-text': 'rgb(var(--color-btn-secondary-text) / <alpha-value>)',
                'btn-disabled': 'rgb(var(--color-btn-disabled) / <alpha-value>)',
                'btn-disabled-text': 'rgb(var(--color-btn-disabled-text) / <alpha-value>)',
                card: {
                    DEFAULT: 'rgb(var(--color-card) / <alpha-value>)',
                    text: 'rgb(var(--color-card-text) / <alpha-value>)',
                    accent: 'rgb(var(--color-card-accent) / <alpha-value>)',
                },
            },
        },
    },
    plugins: [],
}

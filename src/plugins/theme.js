import { themes } from './themes'

export function createTheme({ dark = 'sandstorm', light = 'tape' } = {}) {
    const applyColor = ([property, hex]) => document.documentElement.style.setProperty(property, hex)

    const applyTheme = themeName => getColorsTuples(themeName).forEach(applyColor)

    const toColorVariable = key => `--${key.replace('_', '-')}`

    const getColorsTuples = themeName => {
        if (!themes[themeName]) themeName = 'marble'
        return Object.entries(themes[themeName]).map(([key, value]) => [toColorVariable(key), value])
    }

    const mediaMatcher = window.matchMedia('(prefers-color-scheme: light)')

    const theme = {
        install: () => {
            mediaMatcher.addEventListener('change', event => applyTheme(event.matches ? light : dark))
            applyTheme(mediaMatcher.matches ? light : dark)
        },
    }

    return theme
}

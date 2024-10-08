import { themes } from './themes'

const extractColors = svg => {
    return {
        b_high: svg.getElementById('b_high').getAttribute('fill'),
        b_inv: svg.getElementById('b_inv').getAttribute('fill'),
        b_low: svg.getElementById('b_low').getAttribute('fill'),
        b_med: svg.getElementById('b_med').getAttribute('fill'),
        background: svg.getElementById('background').getAttribute('fill'),
        f_high: svg.getElementById('f_high').getAttribute('fill'),
        f_inv: svg.getElementById('f_inv').getAttribute('fill'),
        f_low: svg.getElementById('f_low').getAttribute('fill'),
        f_med: svg.getElementById('f_med').getAttribute('fill'),
    }
}

// algo by: krabs-github (https://gist.github.com/krabs-github)
// original source: https://gist.github.com/krabs-github/ec56e4f1c12cddf86ae9c551aa9d9e04
// HSP equation: http://alienryderflex.com/hsp.html
const isLightColor = hex => {
    const color = +('0x' + hex.slice(1).replace(hex.length < 5 && /./g, '$&$&'))
    const blue = color & 255
    const green = (color >> 8) & 255
    const red = color >> 16
    return Math.sqrt(0.299 * Math.pow(red, 2) + 0.587 * Math.pow(green, 2) + 0.114 * Math.pow(blue, 2)) > 127.5
}

const isSvgFile = ({ name }) => name.slice(name.lastIndexOf('.')) === '.svg'

const isValidColorName = name => ['b_high', 'b_inv', 'b_low', 'b_max', 'b_med', 'background', 'f_high', 'f_inv', 'f_low', 'f_max', 'f_med'].includes(name)

const isValidHexColor = value => /^#([0-9A-F]{3}){1,2}$/i.test(value)

const isValidColorTuple = ([name, hex]) => isValidColorName(name) && isValidHexColor(hex)

const toColorVariable = key => `--${key.replace('_', '-')}`

const withMaxedColors = base => (isLightColor(base.background))
    ? {...base, 'b_max': '#ffffff', 'f_max': '#000000' }
    : {...base, 'b_max': '#000000', 'f_max': '#ffffff' }

const fakeStorage = { getItem: () => null, setItem: () => {} }

export function createTheme({ dark = 'sandstorm', light = 'tape', storageKey = 'theme' } = {}) {
    const mediaMatcher = window.matchMedia('(prefers-color-scheme: light)')
    const reader = new FileReader()
    const storage = localStorage || fakeStorage

    reader.onload = event => {
        try {
            const svg = new DOMParser().parseFromString(event.target.result, 'text/xml')
            const colors = extractColors(svg)
            applyColors(colors)
            storeColors({ colors, variant: getCurrentVariant() })
        } catch (error) {
            console.warn('invalid SVG theme: ', error)
        }
    }

    function applyColors(colors) {
        const colorsTuples = Object.entries(withMaxedColors(colors))
        // eslint-disable-next-line no-unused-vars
        if (!colorsTuples.every(isValidColorTuple)) return
        colorsTuples.forEach(([name, hex]) => document.documentElement.style.setProperty(toColorVariable(name), hex))
    }

    function applyStoredColorScheme(variant) {
        try {
            const colors = getStoredColors(variant)
            applyColors(colors)
        } catch (error) {
            console.warn('failed to fetch colors from storage: ', error)
            console.warn('applying default colors')
            applyColors(getDefaultColors(variant))
        }
    }

    function getCurrentVariant() {
        return mediaMatcher.matches ? 'light' : 'dark'
    }

    function getDefaultColors(variant) {
        return variant === 'light' ? themes[light] : themes[dark]
    }

    function getStoredColors(variant) {
        const data = storage.getItem(storageKey)
        if (!data) return getDefaultColors(variant)
        const schemes = JSON.parse(data)
        return schemes[variant] || getDefaultColors(variant)
    }

    function onDragOver(event) {
        event.preventDefault()
        event.stopPropagation()
        event.dataTransfer.dropEffect = 'copy'
    }

    function onDrop(event) {
        if (event.dataTransfer.files.length === 0) return
        event.preventDefault()
        event.stopPropagation()
        const file = event.dataTransfer.files[0]
        if (!isSvgFile(file)) return
        reader.readAsText(file)
    }

    function storeColors({ colors, variant }) {
        const storedColors = JSON.parse(storage.getItem(storageKey) || '{}')
        storage.setItem(storageKey, JSON.stringify({ ...storedColors, [variant]: colors }))
    }

    const theme = {
        install: () => {
            mediaMatcher.addEventListener('change', event => applyStoredColorScheme(event.matches ? 'light' : 'dark'))
            window.addEventListener('dragover', onDragOver)
            window.addEventListener('drop', onDrop)
            applyStoredColorScheme(getCurrentVariant())
        },
    }

    return theme
}

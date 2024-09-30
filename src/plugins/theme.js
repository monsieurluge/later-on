import { themes } from './themes'

const fakeLocalStorage = { getItem: () => null, setItem: () => {} }
const isHexColor = value => /^#([0-9A-F]{3}){1,2}$/i.test(value)
const isSvgFile = ({ name }) => name.slice(name.lastIndexOf('.')) === '.svg'
const isValidColorTuple = ([name, hex]) => ['b_high', 'b_inv', 'b_low', 'b_med', 'background', 'f_high', 'f_inv', 'f_low', 'f_med'].includes(name) && isHexColor(hex)
const toColorVariable = key => `--${key.replace('_', '-')}`

export function createTheme({ dark = 'sandstorm', light = 'tape' } = {}) {
    const mediaMatcher = window.matchMedia('(prefers-color-scheme: light)')
    const storage = !localStorage ? fakeLocalStorage : localStorage
    const storageKey = 'later-on-theme'

    function applyColor([name, hex]) {
        document.documentElement.style.setProperty(toColorVariable(name), hex)
    }

    function applyColors(colors) {
        const colorsTuples = Object.entries(colors)
        if (!colorsTuples.every(isValidColorTuple)) return
        colorsTuples.forEach(applyColor)
        storage.setItem(storageKey, JSON.stringify(colors))
    }

    function applyLastColorScheme() {
        const lastEntry = storage.getItem(storageKey)
        if (lastEntry) {
            applyColors(JSON.parse(lastEntry))
        } else {
            applyTheme(mediaMatcher.matches ? light : dark)
        }
    }

    function applyTheme(themeName) {
        if (!themes[themeName]) themeName = 'marble'
        applyColors(themes[themeName])
    }

    function extractColors(content) {
        const svg = new DOMParser().parseFromString(content, 'text/xml')
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

    function onDragOver(event) {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
    }

    function onDrop(event) {
        if (event.dataTransfer.files.length === 0) return
        event.preventDefault()
        event.stopPropagation()
        const file = event.dataTransfer.files[0]
        if (!isSvgFile(file)) return
        const reader = new FileReader()
        reader.onload = event => {
            try {
                new DOMParser().parseFromString(event.target.result, 'text/xml')
                applyColors(extractColors(event.target.result))
            } catch (error) {
                console.warn('invalid SVG theme: ', error)
            }
        }
        reader.readAsText(file)
    }

    const theme = {
        install: () => {
            mediaMatcher.addEventListener('change', event => applyTheme(event.matches ? light : dark))
            window.addEventListener('dragover', onDragOver)
            window.addEventListener('drop', onDrop)
            applyLastColorScheme()
        },
    }

    return theme
}

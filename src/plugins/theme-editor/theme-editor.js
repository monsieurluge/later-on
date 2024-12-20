import { ColorSchemeDisplayModule } from './color-scheme-display.module'
import { HexConverterProcessor } from './hex-converter.processor'
import { HslConverterProcessor } from './hsl-converter.processor'
import { RotaryEncoderModule } from './rotary-encoder.module'
import { createDivElement, createModulesGridElement } from './shared/dom-element'
import style from './style.css'

export function ThemeEditor() {
    let editor = null
    let handleUpdate = () => {}

    function attachToDocument({ position }) {
        editor.style.bottom = position.bottom || ''
        editor.style.left = position.left || ''
        editor.style.right = position.right || ''
        editor.style.top = position.top || ''
        document.body.appendChild(editor)
    }

    function create() {
        editor = createDivElement({ classes: ['hidden'], id: 'ted' })
        const modules = createModulesGridElement()
        // create all the modules and processors
        const colorScheme = ColorSchemeDisplayModule()
        const hueEncoder = RotaryEncoderModule({ freeRotation: true })
        const saturationEncoder = RotaryEncoderModule()
        const lightnessEncoder = RotaryEncoderModule()
        const hexConverter = HexConverterProcessor()
        const hslConverter = HslConverterProcessor()
        // install them
        colorScheme.install({ location: modules, position: { x: 1, y: 1 } })
        hueEncoder.install({ location: modules, position: { x: 1, y: 4 } })
        saturationEncoder.install({ location: modules, position: { x: 2, y: 4 } })
        lightnessEncoder.install({ location: modules, position: { x: 3, y: 4 } })
        // plug them
        hueEncoder.plug().to(hslConverter.input('hue'))
        saturationEncoder.plug().to(hslConverter.input('saturation'))
        lightnessEncoder.plug().to(hslConverter.input('lightness'))
        hslConverter.plug().to(colorScheme.input())
        hexConverter.plug('hue').to(hueEncoder.input())
        hexConverter.plug('saturation').to(saturationEncoder.input())
        hexConverter.plug('lightness').to(lightnessEncoder.input())
        colorScheme.plug('selected').to(hexConverter.input())
        colorScheme.plug('updated').to(output => handleUpdate(output))
        // global DOM manipulation
        editor.appendChild(modules)
        const stylesheet = document.createElement('style')
        stylesheet.innerHTML += style
        document.head.appendChild(stylesheet)
    }

    function display() {
        editor.classList.remove('hidden')
    }

    function hide() {
        editor.classList.add('hidden')
    }

    function plug() {
        return {
            to: callback => (handleUpdate = callback),
        }
    }

    create()

    return Object.freeze({
        attachToDocument,
        display,
        hide,
        plug,
    })
}

import { hexToHsl } from './shared/color'

export function HexConverterProcessor() {
    let handleHueUpdate = () => {}
    let handleLightnessUpdate = () => {}
    let handleSaturationUpdate = () => {}

    function input() {
        return hex => {
            const { h, l, s } = hexToHsl(hex)
            handleHueUpdate((h / 359) * 100) // must return a value between 0 & 100
            handleLightnessUpdate(l)
            handleSaturationUpdate(s)
        }
    }

    function plug(name) {
        if (name === 'hue') {
            return { to: callback => (handleHueUpdate = callback) }
        }
        if (name === 'lightness') {
            return { to: callback => (handleLightnessUpdate = callback) }
        }
        if (name === 'saturation') {
            return { to: callback => (handleSaturationUpdate = callback) }
        }
        return { to: () => {} }
    }

    return Object.freeze({ input, plug })
}

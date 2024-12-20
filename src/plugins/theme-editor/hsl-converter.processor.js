import { hslToHex } from './shared/color'

export function HslConverterProcessor() {
    let handleUpdate = () => {}
    let hue = 0
    let lightness = 0
    let saturation = 0

    function input(name) {
        if (name === 'hue') {
            return value => {
                hue = (value * 359) / 100
                handleUpdate(hslToHex(hue, saturation, lightness))
            }
        }
        if (name === 'lightness') {
            return value => {
                lightness = value
                handleUpdate(hslToHex(hue, saturation, lightness))
            }
        }
        if (name === 'saturation') {
            return value => {
                saturation = value
                handleUpdate(hslToHex(hue, saturation, lightness))
            }
        }
        return () => {}
    }

    function plug() {
        return {
            to: callback => (handleUpdate = callback),
        }
    }

    return Object.freeze({ input, plug })
}

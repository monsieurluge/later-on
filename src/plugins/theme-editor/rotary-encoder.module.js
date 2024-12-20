import { createDivElement } from './shared/dom-element'

/**
 * Rotary Encoder Module
 * input: a Number value, between 0 and 100 (for configuration)
 * output: a Number value, between 0 and 100
 */
export function RotaryEncoderModule({ freeRotation = false, value = 0 } = {}) {
    const height = 2
    const max = 100
    const min = 0
    const width = 1

    let angle = 0
    let encoder = null
    let handleUpdate = () => {}
    let knob = null

    function create() {
        encoder = createDivElement({ classes: ['ted_encoder', 'ted-module'] })
        knob = createKnobElement()
        encoder.appendChild(knob)
        if (!freeRotation) {
            const spot = createDivElement({ classes: ['ted_encoder-spot'] })
            encoder.appendChild(spot)
        }
        setValue(value)
    }

    function createKnobElement() {
        const element = createDivElement({ classes: ['ted_encoder-knob'] })
        const knobMarker = createDivElement({ classes: ['ted_encoder-knob-marker'] })
        element.appendChild(knobMarker)
        element.addEventListener('mousedown', function (event) {
            event.stopPropagation()
            event.preventDefault()
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', () => window.removeEventListener('mousemove', onMouseMove))
        })
        return element
    }

    function input() {
        return setValue
    }

    function install({ location, position }) {
        encoder.style.gridColumnStart = position.x
        encoder.style.gridColumnEnd = position.x + width
        encoder.style.gridRowStart = position.y
        encoder.style.gridRowEnd = position.y + height
        location.appendChild(encoder)
    }

    function onMouseMove(event) {
        setAngle(angle + event.movementX * 5)
    }

    function plug() {
        return {
            to: callback => (handleUpdate = callback),
        }
    }

    function setAngle(newAngle) {
        const oldAngle = angle
        angle = newAngle
        if (angle > 360) {
            angle = freeRotation ? angle - 360 : 360
        }
        if (angle < 0) {
            angle = freeRotation ? 360 + angle : 0
        }
        if (oldAngle === angle) return
        value = Math.round((angle / 360) * (max - min) + min)
        updateRotation(angle)
        handleUpdate(value)
    }

    function setValue(newValue) {
        const oldValue = value
        value = newValue
        if (value < min) value = min
        if (value > max) value = max
        if (oldValue === value) return
        updateRotation(Math.round((value / max) * 360))
        handleUpdate(value)
    }

    function updateRotation(newAngle) {
        angle = newAngle
        knob.style.transform = `rotate(${angle}deg)`
        !freeRotation && angle === 360 ? encoder.classList.add('maxed') : encoder.classList.remove('maxed')
    }

    create()

    return Object.freeze({ input, install, plug })
}

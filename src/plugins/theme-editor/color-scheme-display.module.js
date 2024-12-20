import { createDivElement } from './shared/dom-element'

export function ColorSchemeDisplayModule() {
    const height = 2
    const width = 3

    let backgroundWrapper = null
    let colorScheme = null
    let handleSelect = () => {}
    let handleUpdate = () => {}
    let selected = '--background'

    function create() {
        colorScheme = createDivElement({ classes: ['ted_colors-scheme', 'ted-module'] })
        backgroundWrapper = createBackgroundWrapperElement('ted_colors-scheme_wrapper')
        const fHigh = createColorElement({ name: '--f-high', x: 0, y: 0 })
        const fMed = createColorElement({ name: '--f-med', x: 1, y: 0 })
        const fLow = createColorElement({ name: '--f-low', x: 2, y: 0 })
        const fInv = createColorElement({ name: '--f-inv', x: 3, y: 0 })
        const bHigh = createColorElement({ name: '--b-high', x: 0, y: 1 })
        const bMed = createColorElement({ name: '--b-med', x: 1, y: 1 })
        const bLow = createColorElement({ name: '--b-low', x: 2, y: 1 })
        const bInv = createColorElement({ name: '--b-inv', x: 3, y: 1 })
        backgroundWrapper.appendChild(fHigh)
        backgroundWrapper.appendChild(fMed)
        backgroundWrapper.appendChild(fLow)
        backgroundWrapper.appendChild(fInv)
        backgroundWrapper.appendChild(bHigh)
        backgroundWrapper.appendChild(bMed)
        backgroundWrapper.appendChild(bLow)
        backgroundWrapper.appendChild(bInv)
        colorScheme.appendChild(backgroundWrapper)
    }

    function createBackgroundWrapperElement(id) {
        const wrapperElement = createDivElement({ id, classes: ['ted_color'] })
        wrapperElement.dataset.name = '--background'
        wrapperElement.addEventListener('click', event => selectOnly('--background', event))
        return wrapperElement
    }

    function createColorElement({ name, x, y }) {
        const colorElement = createDivElement({ classes: ['ted_color'] })
        colorElement.dataset.name = name
        colorElement.style.gridColumnStart = `${x}`
        colorElement.style.gridColumnEnd = `${x + 1}`
        colorElement.style.gridRowStart = `${y}`
        colorElement.style.gridRowEnd = `${y + 1}`
        colorElement.style.backgroundColor = `var(${name})`
        colorElement.addEventListener('click', event => selectOnly(name, event))
        return colorElement
    }

    function input() {
        return hex => handleUpdate({ property: selected, color: hex })
    }

    function install({ location, position }) {
        colorScheme.style.gridColumnStart = position.x
        colorScheme.style.gridColumnEnd = position.x + width
        colorScheme.style.gridRowStart = position.y
        colorScheme.style.gridRowEnd = position.y + height
        location.appendChild(colorScheme)
    }

    function plug(name) {
        if (name === 'selected') {
            return {
                to: callback => (handleSelect = callback),
            }
        }
        if (name === 'updated') {
            return {
                to: callback => (handleUpdate = callback),
            }
        }
        return {
            to: () => {},
        }
    }

    function selectOnly(name, event) {
        event.stopPropagation()
        colorScheme.querySelectorAll('.ted_color').forEach(node => {
            const nodeName = node.dataset.name || 'unknown'
            if (nodeName === name) {
                node.classList.add('selected')
                selected = name
                handleSelect(document.documentElement.style.getPropertyValue(name))
            } else {
                node.classList.remove('selected')
            }
        })
    }

    create()

    return Object.freeze({ input, install, plug })
}

export function createBaseElement({ classes = [], id = null, type = 'div' } = {}) {
    const element = document.createElement(type)
    if (id) element.id = id
    classes.forEach(value => element.classList.add(value))
    return element
}

export const createDivElement = args => createBaseElement({ ...args, type: 'div' })

export const createModulesGridElement = args => {
    const element = createBaseElement({ ...args, type: 'div' })
    element.classList.add('modules-grid')
    return element
}

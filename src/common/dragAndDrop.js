export function isStringDragEvent(event) {
    const data = event.dataTransfer.items
    let result = true
    for (let i = 0; i < data.length; i += 1) {
        result = result && data[i].kind === 'string'
    }
    return result;
}

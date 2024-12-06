import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useAppState } from '@/stores/appState'

const doNothing = () => {}

const isTaskDraggingEvent = event => {
    const data = event.dataTransfer?.items || []
    let isStringType = true
    for (let i = 0; i < data.length; i += 1) {
        isStringType = isStringType && data[i].kind === 'string'
    }
    return isStringType
}

export function useTaskDropZone({ name = 'drop zone', onDrop = doNothing, target } = {}) {
    const appStateStore = useAppState()
    const isOver = ref(false)
    const isOverBottom = ref(false)
    const isOverTop = ref(false)

    const handleEvent = type => event => {
        if (!isTaskDraggingEvent(event)) return

        if (type === 'dragover') {
            event.preventDefault()
            event.stopPropagation()
            console.log('is over')
            isOver.value = true
            appStateStore.setDropTarget(name)
            const targetRect = event.target.getBoundingClientRect()
            const pos = event.clientY - targetRect.top
            if (pos < targetRect.height / 2) {
                isOverBottom.value = false
                isOverTop.value = true
            } else {
                isOverBottom.value = true
                isOverTop.value = false
            }
        }

        if (type === 'dragleave') {
            reset()
        }

        if (type === 'drop') {
            reset()
            onDrop({
                name: event.dataTransfer.getData('taskName')
            })
        }
    }

    function reset() {
        isOver.value = false
        isOverBottom.value = false
        isOverTop.value = false
    }

    useEventListener(target, 'dragover', handleEvent('dragover'))
    useEventListener(target, 'dragleave', handleEvent('dragleave'))
    useEventListener(target, 'drop', handleEvent('drop'))

    return {
        isOver,
        isOverBottom,
        isOverTop,
    }
}

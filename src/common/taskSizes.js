export const taskSizes = new Map()
taskSizes.set('size', { next: 'small' })
taskSizes.set('small', { next: 'medium' })
taskSizes.set('medium', { next: 'large' })
taskSizes.set('large', { next: 'size' })

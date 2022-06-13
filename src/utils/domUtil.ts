export const domUtil = {
    getCanvasContext: (canvasElement: HTMLCanvasElement) => {
        const ctx = canvasElement.getContext('2d')
        if (!ctx) {
            throw Error('Unable to obtain canvas context')
        }
        return ctx
    }
}

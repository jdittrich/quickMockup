import elements from './elements/index.js'

function QuickMockupApp(canvasContainerId, width, height) {
    this.elements = elements
    this.canvas = new draw2d.Canvas( canvasContainerId, width, height )
    this.canvas.setScrollArea('#'+canvasContainerId)

    this.canvas.installEditPolicy(new draw2d.policy.canvas.CanvasPolicy({
        onMouseDown: function(canvas) {
            const selectedFigure = canvas.getPrimarySelection()
            if (selectedFigure && selectedFigure !== canvas.getFigures().last()) {
                canvas.getPrimarySelection().toFront()
            }
        }
    }))

    this.createNewElementFromDrop = (canvas, { key, event }) => {
        const element = new elements[key]({})
        canvas.add(element.figure, canvas.fromDocumentToCanvasCoordinate(event.clientX, event.clientY))
        element.figure.toFront()
        canvas.setCurrentSelection(element.figure)
    }
    this.canvas.on('newElementDrop', this.createNewElementFromDrop)

    this.duplicateSelectedElement = () => {
        const selectedFigure = this.canvas.getPrimarySelection()

        if (selectedFigure) {
            const duplicate = selectedFigure.clone()
            duplicate.translate(10, 10)
            this.canvas.add(duplicate)
            this.canvas.setCurrentSelection(duplicate)
        }
    }
}

export default QuickMockupApp

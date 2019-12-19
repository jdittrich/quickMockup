import ToFrontBoundingBoxSelectionPolicy from './policy/canvas/ToFrontBoundingBoxSelectionPolicy.js'

class Canvas {
    constructor (canvasContainerId, settings) {
        this._canvasContainerId = canvasContainerId
        this._settings = settings
        this._elements = []
    }

    get settings() {
        return this._settings
    }

    get canvas() {
        return this._canvas
    }

    get elements() {
        return this._elements.slice()
    }

    get canvas() {
        return this._canvas
    }

    get canvasContainer() {
        return document.getElementById(this._canvasContainerId)
    }

    init() {
        const { canvas: { width, height } = {} } = this._settings
        this._canvas = new draw2d.Canvas( this._canvasContainerId, width, height )
        this._canvas.setScrollArea(`#${this._canvasContainerId}`)

        this._canvas.installEditPolicy(new ToFrontBoundingBoxSelectionPolicy())

        this.initKeyBindings()
    }

    initKeyBindings() {
        if (!this._settings.keyBindings) {
            return
        }

        this._keyDownHandlers = {}
        Object.keys(this._settings.keyBindings).forEach(key => {
            const handlerMethodName = this._settings.keyBindings[key]

            if (!this[handlerMethodName]) {
                console.log(`undefined method ${handlerMethodName}`)
                return
            }

            let modifiers = []
            let char = key

            if (key.length > 1) {
                const splits = key.split('+')
                modifiers = splits.slice(0, splits.length - 2)
                char = splits[splits.length - 1]

                if (char === '') {
                    char = '+'
                }

                modifiers = modifiers.map(m => `${m}Key`)
            }

            const keydownListener = keydownEvent => {
                if (keydownEvent.key !== char) {
                    return
                }

                for (i in modifiers) {
                    const modifier = modifiers[i]

                    if (!keydownEvent[modifier]) {
                        return
                    }
                }

                this[handlerMethodName].apply(this, [keydownEvent])
                keydownEvent.preventDefault()
            }

            this._keyDownHandlers[key] = keydownListener
            window.addEventListener('keydown', keydownListener)
        })
    }

    addNewElement(elementClass, {x, y}, select = false, composite = null) {
        const element = new elementClass(this.settings.defaultElementAttributes || {})

        this.elements.push(element)

        this.canvas.getCommandStack().execute(
            new draw2d.command.CommandAdd(this.canvas, element.figure, this.canvas.fromDocumentToCanvasCoordinate(x, y))
        )
        element.figure.setCanvas(this.canvas)

        if (select) {
            this.canvas.setCurrentSelection(element.figure)
        }

        if (composite) {
            composite.figure.assignFigure(element.figure)
        }

        element.figure.toFront()

        return element
    }

    undo() {
        this.canvas.getCommandStack().undo()
    }

    redo() {
        this.canvas.getCommandStack().undo()
    }

    duplicateSelectedElement() {
        const selectedFigure = this.canvas.getPrimarySelection()

        if (selectedFigure) {
            const duplicate = selectedFigure.clone()
            const x = selectedFigure.getX() + 10
            const y = selectedFigure.getY() + 10
            this.canvas.getCommandStack().execute(
                new draw2d.command.CommandAdd(this.canvas, duplicate, x, y, selectedFigure.getComposite())
            )
            if ( selectedFigure.getComposite() !== null ) {
                selectedFigure.getComposite().assignFigure(duplicate)
            }
            this.canvas.setCurrentSelection(duplicate)
        }
    }
}

export default Canvas

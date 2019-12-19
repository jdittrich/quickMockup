import elements from '../src/elements/index.js'

let dragInfo = null

class Toolbar {
    constructor(toolbarId, canvas, settings) {
        this._toolbarId = toolbarId
        this._canvas = canvas
        this._settings = settings
    }

    get canvas() {
        return this._canvas
    }

    get toolbarContainer() {
        return document.getElementById(this._toolbarId)
    }

    init(canvas, userDefinedElements = []) {
        this.initDropListeners()
        this._virtualCanvasContainer = document.createElement('div')
        this._virtualCanvasContainer.setAttribute('id', 'toolbar-virtual-canvas')
        this._virtualCanvasContainer.style.display = 'none'
        document.body.appendChild(this._virtualCanvasContainer)

        this._virtualCanvas = new draw2d.Canvas('toolbar-virtual-canvas' )

        Object.values(elements).forEach(elementClass => { this.initElement(elementClass) })

        if (userDefinedElements.length) {
            // later append or add new tab or smth for user-defined elements
        }

        this._virtualCanvas.destroy()
        this._virtualCanvasContainer.remove()
    }

    initElement(elementClass) {
        const element = new elementClass({ width: 160, height: 40 })

        const elementDiv = document.createElement('div')
        elementDiv.setAttribute('draggable', true)
        elementDiv.className = 'Toolbar__element'

        this._virtualCanvas.add(element.figure)
        const elementThumbnailSVG = element.figure.shape
        const elementSVGContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

        elementSVGContainer.innerHTML = elementThumbnailSVG.paper.canvas.innerHTML
        elementDiv.appendChild(elementSVGContainer)

        this._virtualCanvas.remove(element.figure)

        this.initElementDragListeners(elementClass, elementDiv)

        this.toolbarContainer.appendChild(elementDiv)
    }

    initDropListeners() {
        this.canvas.canvasContainer.addEventListener('dragenter', ev => ev.preventDefault())
        this.canvas.canvasContainer.addEventListener('dragover', ev => ev.preventDefault())
        this.canvas.canvasContainer.addEventListener('drop', dropEvent => {
            if (dragInfo === null) {
                return true
            }

            const { elementClass, offsetLeft, offsetTop } = dragInfo

            const x = dropEvent.clientX - offsetLeft
            const y = dropEvent.clientY - offsetTop
            this.canvas.addNewElement(elementClass, {x, y})

            dropEvent.preventDefault()
        })
    }

    initElementDragListeners(elementClass, elementDiv) {
        elementDiv.addEventListener('dragstart', dragstartEvent => {
            dragstartEvent.dataTransfer.setData('text', 'element')

            const elementDivRect = dragstartEvent.target.getBoundingClientRect()
            const offsetLeft = dragstartEvent.clientX - elementDivRect.left
            const offsetTop = dragstartEvent.clientY - elementDivRect.top

            dragInfo = {
                elementClass,
                offsetLeft,
                offsetTop
            }
        })

        elementDiv.addEventListener('dragend', dragendEvent => {
            dragInfo = null
        })
    }
}

export default Toolbar

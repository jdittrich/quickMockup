import ElementOptionsPolicy from './ElementOptionsPolicy.js'

/**
 * Controls the options container, and provides api
 * for ElementOptionsPolicy to get feedback from draw2d on figure
 * selection
 */
class ElementOptionsHost {
    constructor() {
        this._elementPolicy = {}
        this._containerHTML = this.createOptionsContainer()
        this._currentElement = null
    }

    get elementPolicy() {
        return this._elementPolicy
    }

    get containerHTML() {
        return this._containerHTML
    }

    get currentElement() {
        return this._currentElement
    }

    getPolicyForElement(element) {
        if (!this.elementPolicy[element.figure.id]) {
            this.elementPolicy[element.figure.id] = new ElementOptionsPolicy({
                optionsHost: this,
                element
            })
        }

        return this.elementPolicy[element.figure.id]
    }

    createOptionsContainer() {
        const container = document.createElement('div')
        container.style.position = 'absolute'
        container.style.display = 'none'
        container.style.backgroundColor = '#EEE'
        container.style.minWidth = '100px'
        container.style.minHeight = '100px'
        container.style.zIndex = 1000
        container.style.top = '0px'
        container.style.left = '0px'
        container.style.boxShadow = 'rgba(100, 100, 100, .3) 0px 1px 2px'
        container.style.padding = '8px'

        document.body.appendChild(container)

        return container
    }

    onElementSelected(element) {
        if (this._currentElement === element) {
            return
        }

        this._currentElement = element

        this.containerHTML.firstChild && this.containerHTML.firstChild.remove()
        this.containerHTML.appendChild(element.optionsHTML)
        this.adjustContainerPosition()
        this.containerHTML.style.display = 'block'
    }

    onElementUnselected(element) {
        if (this._currentElement !== element) {
            return
        }

        this.containerHTML.firstChild && this.containerHTML.firstChild.remove()
        this._currentElement = null
        this.containerHTML.style.display = 'none'
    }

    onElementMoved(element) {
        if (this.currentElement !== element) {
            return
        }

        this.adjustContainerPosition()
    }

    adjustContainerPosition() {
        if (!this.currentElement) {
            return
        }

        const elementFigureBBox = this.currentElement.figure.getBoundingBox()
        const containerPosition = this.currentElement.figure.getCanvas().fromCanvasToDocumentCoordinate(elementFigureBBox.getRight(), elementFigureBBox.getTop())
        this.containerHTML.style.left = containerPosition.getX() + 20 + 'px'
        this.containerHTML.style.top = containerPosition.getY() - 20 + 'px'
    }
}

export default ElementOptionsHost

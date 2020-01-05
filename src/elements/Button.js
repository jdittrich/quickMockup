import Element from './Element.js'
import MultilineInplaceEditor from '../ui/MultilineInplaceEditor.js'

class Button extends Element {
    constructor({
        text = 'Button',
        fontColor = '#444',
        width = 150,
        height = 30,
        stroke = 2,
        fontSize,
        ...props
    } = {}) {
        super(props)

        this.text = new draw2d.shape.basic.Label({
            stroke: 0,
            text,
            fontColor,
            fontSize
        })

        stroke = Math.max(0, Math.min(4, stroke))
        this._figure = new draw2d.shape.basic.Rectangle({
            bgColor: '#CCC',
            color: '#444',
            stroke,
            width,
            height,
            ...props
        })

        this._figure.add(this.text, new draw2d.layout.locator.CenterLocator())
    }

    static get name() {
        return 'Button'
    }

    get optionsHTML() {
        const optionsHTML = document.createElement('div')

        // button text editor
        const textEditor = document.createElement('input')

        textEditor.style.display = 'block'
        textEditor.value = this.text.getText()
        textEditor.addEventListener('input', ({ target: { value } }) => {
            this.text.setText(value)
        })
        textEditor.setAttribute('placeholder', 'label')

        optionsHTML.appendChild(textEditor)

        // button text color editor
        const textColorEditor = document.createElement('input')

        textColorEditor.style.display = 'block'
        textColorEditor.value = this.text.getFontColor().getHTMLStyle()
        textColorEditor.addEventListener('input', ({ target: { value } }) => {
            this.text.setFontColor(value)
        })
        textColorEditor.setAttribute('placeholder', 'font color')

        optionsHTML.appendChild(textColorEditor)

        // button stroke width
        const strokeEditor = document.createElement('input')

        strokeEditor.style.display = 'block'
        strokeEditor.setAttribute('type', 'range')
        strokeEditor.setAttribute('min', 0)
        strokeEditor.setAttribute('max', 4)
        strokeEditor.value = this.figure.getStroke()
        strokeEditor.addEventListener('input', ({ target: { value } }) => {
            this.figure.setStroke(value)
        })

        optionsHTML.appendChild(strokeEditor)

        return optionsHTML
    }
}

export default Button


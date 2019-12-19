import Element from './Element.js'
import MultilineInplaceEditor from '../ui/MultilineInplaceEditor.js'

const textEditor = new MultilineInplaceEditor()

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
        this.text.on('dblclick', () => { textEditor.start(this.text) })

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
}

export default Button


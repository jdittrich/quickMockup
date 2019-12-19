import Element from './Element.js'
import MultilineInplaceEditor from '../ui/MultilineInplaceEditor.js'

const textEditor = new MultilineInplaceEditor()

class Text extends Element {
    constructor ({
        text = 'This is text',
        width = 100,
        ...props
    } = {}) {
        super(props)

        this._figure = new draw2d.shape.basic.Text({
            bgColor: 'transparent',
            color: 'black',
            padding: { left: 0, right: 0 },
            stroke: 0,
            text,
            ...props
        })

        this._figure.setDimension(width)

        this._figure.on('dblclick', () => { textEditor.start(this._figure) })
    }

    static get name() {
        return 'Text'
    }
}

export default Text

import Element from './Element.js'
import ContainerComposite from '../shape/composite/ContainerComposite.js'

const titleLabelEditor = new draw2d.ui.LabelInplaceEditor()

class Window extends Element {
    constructor ({
        title = 'Window',
        titleBarColor = '#333',
        titleBarBgColor = '#999',
        fontSize,
        ...props
    } = {}) {
        super(props)

        this.titleBarLabel = new draw2d.shape.basic.Label({
            bgColor: titleBarBgColor,
            text: title,
            fontColor: titleBarColor,
            stroke: 0,
            height: 24,
            fontSize
        })
        this.titleBarLabel.on('dblclick', () => { titleLabelEditor.start(this.titleBarLabel) })

        this._figure = new ContainerComposite({
            bgColor: 'rgba(255, 255, 255, .5)',
            color: 'rgba(0, 0, 0, .2)',
            stroke: 1,
            width: 640,
            height: 480,
            ...props
        })

        this._figure.add(this.titleBarLabel, new draw2d.layout.locator.XYAbsPortLocator(0, 0))
    }

    static get name() {
        return 'Window'
    }
}

export default Window

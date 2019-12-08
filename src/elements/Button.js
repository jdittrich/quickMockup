import MultilineInplaceEditor from '../ui/MultilineInplaceEditor.js'

const textEditor = new MultilineInplaceEditor()

function Button({
    text = 'Button',
    fontColor = '#444',
    width = 150,
    height = 30,
    stroke = 2,
    ...props
} = {}) {
    this.name = 'quickMockup.BUtton'

    this.text = new draw2d.shape.basic.Label({
        stroke: 0,
        text,
        fontColor
    })
    this.text.on('dblclick', () => { textEditor.start(this.text) })

    this.figure = new draw2d.shape.basic.Rectangle({
        bgColor: '#CCC',
        color: '#444',
        stroke,
        width,
        height,
        ...props
    })

    this.figure.add(this.text, new draw2d.layout.locator.CenterLocator())
}

export default Button

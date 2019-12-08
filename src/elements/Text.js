import MultilineInplaceEditor from '../ui/MultilineInplaceEditor.js'

const textEditor = new MultilineInplaceEditor()

function Text({
    text = 'This is text',
    ...props
} = {}) {
    this.name = 'quickMockup.Text'

    this.figure = new draw2d.shape.basic.Text({
        bgColor: 'transparent',
        color: 'black',
        resizeable: true,
        padding: { left: 0, right: 0 },
        text,
        ...props
    })

    this.figure.on('dblclick', () => { textEditor.start(this.figure) })
}

export default Text

import ContainerComposite from '../shape/composite/ContainerComposite.js'

function Container(props = {}) {
    this.name = 'quickMockup.Container'

    this.figure = new ContainerComposite({
        color: 'rgba(0, 0, 0, .2)',
        stroke: 1,
        width: 480,
        height: 360,
        ...props
    })
}

export default Container

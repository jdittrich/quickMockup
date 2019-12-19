import Element from './Element.js'
import ContainerComposite from '../shape/composite/ContainerComposite.js'

class Container extends Element {
    constructor (props = {}) {
        super(props)

        this._figure = new ContainerComposite({
            color: 'rgba(0, 0, 0, .2)',
            stroke: 1,
            width: 480,
            height: 360,
            ...props
        })
    }

    static get name() {
        return 'Container'
    }
}

export default Container

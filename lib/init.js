import Toolbar from '../src/Toolbar.js'
import Canvas from '../src/Canvas.js'

export default function ( toolbarId, canvasId, settings ) {
    const canvas = new Canvas(canvasId, settings)
    canvas.init()

    const toolbar = new Toolbar(toolbarId, canvas, settings)
    toolbar.init()

    return { canvas, toolbar }
}

import QuickMockupApp from '../src/app.js'
import createSidebarElement from '../src/sidebar/sidebarElement.js'

export default function ( toolbarId, canvasId ) {
    // canvas
    const app = new QuickMockupApp('canvas')

    window.addEventListener('keydown', e => {
        switch(e.key) {
            case 'd':
                if ( e.ctrlKey ) {
                    e.preventDefault()
                    app.duplicateSelectedElement()
                }
            case 'y':
                e.ctrlKey && app.canvas.getCommandStack().redo()
            break
            case 'z':
                e.ctrlKey && app.canvas.getCommandStack().undo()
            break
        }
    })

    // init toolbar
    // add one representational dom element for each element type we have
    const $toolbar = $('#'+toolbarId)
    Object.keys(app.elements).forEach(key => {
        const elementDiv = createSidebarElement(key, event => {
            app.canvas.fireEvent('newElementDrop', { key, event })
        })
        elementDiv.addClass('Toolbar__element')
        $toolbar.append(elementDiv)
    })
}

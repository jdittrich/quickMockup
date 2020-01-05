class Element {
    /**
     * Returns a human-readable name of the element
     * @return {string}
     */
    static get name() {
        return 'Element'
    }

    /**
     * Returns constructed draw2d figure. Should always return
     * same instance.
     * @return {draw2d.Figure}
     */
    get figure() {
        return this._figure
    }

    /**
     * Returns html node to be displayed inside
     * options toolbox. Its responsibility is to provide
     * html elements to allow the user to change configurable
     * aspects of the element, such as a button text.
     *
     * @return {HTMLElement}
     */
    get optionsHTML() {
        return document.createElement('div')
    }
}

export default Element

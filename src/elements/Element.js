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
}

export default Element

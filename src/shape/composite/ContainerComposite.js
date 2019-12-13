let enteredContainers = []

const Container = draw2d.shape.composite.StrongComposite.extend({
    init: function(...args) {
        this._super(...args)
        this.isPotentialContainer = false
    },

    assignFigure: function (figure) {
        this.assignedFigures.add(figure)
        figure.setComposite(this)
        return this
    },

    unassignFigure: function (figure) {
        this.assignedFigures.remove(figure)
        figure.setComposite(null)
        return this
    },

    onEnteredFigureMove: function (figure) {
        // Due to throttling this hanlder, a call might happen after
        // drag has ended, in which case we do not want to do anything
        if (!figure.isInDragDrop) {
            return
        }
        // when dragged element moves entirely inside the container,
        // we want to mark the container as potential container for that
        // figure
        if (this.getBoundingBox().contains(figure.getBoundingBox())) {
            this.setGlow(true)
            enteredContainers.push(this)
        } else {
            // otherwise we mark this container back as no potential container
            this.setGlow(false)
        }
    },

    onDragEnter: function(figure) {
        // start tracking the movement of dragged element
        this.throttledMoveHandler && figure.off(this.throttledMoveHandler)
        this.throttledMoveHandler = $.throttle(100, (canvas, { figure }) => {
            this.onEnteredFigureMove(figure)
        })
        figure.on('move', this.throttledMoveHandler)
    },

    onDragLeave: function(figure) {
        this.throttledMoveHandler && figure.off(this.throttledMoveHandler)

        // when a dragged figure enters another container that is inside the
        // boundaries of this container, then a drag leave and drag enter
        // events will be fired on this container consequently.
        // To avoid flickering glow triggering on this container, do not
        // turn off glow if dragged figure is still inside the boundaries
        // of this container
        if (!this.getBoundingBox().contains(figure.getBoundingBox())) {
            this.setGlow(false)
        }
        this.unassignFigure(figure)
    },

    onCatch: function (figure) {
        this.setGlow(false)
        this.throttledMoveHandler && figure.off(this.throttledMoveHandler)
        enteredContainers.forEach(c => c.setGlow(false))
        enteredContainers = []

        if (figure.getComposite()) {
            return
        }

        if (this.getBoundingBox().contains(figure.getBoundingBox())) {
            this.assignFigure(figure)
        }
    },

    setPosition: function (x, y) {
        let oldX = this.x
        let oldY = this.y

        this._super(x, y)

        let dx = this.x - oldX
        let dy = this.y - oldY

        if (dx === 0 && dy === 0) {
          return this
        }

        this.assignedFigures.each(function (i, figure) {
            figure.translate(dx, dy)
        })

        return this
    },

    toFront: function(figure) {
        this._super(figure)
    },

    setGlow: function (glow) {
        if (glow && !this.originalStroke) {
            this.originalStroke = this.getStroke()
            this.setStroke( this.originalStroke + 1)
        } else if (!glow && this.originalStroke) {
            this.setStroke(this.originalStroke)
            delete this.originalStroke
        }
    }

})

export default Container

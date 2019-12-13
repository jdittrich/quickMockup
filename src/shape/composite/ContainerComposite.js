let enteredContainers = []

const Container = draw2d.shape.composite.StrongComposite.extend({
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

        if (this.getBoundingBox().contains(figure.getBoundingBox())) {
            this.setGlow(true)
            // we add push into this array so that we unset glow
            // later when drag ends inside the contianer
            enteredContainers.push(this)
        } else {
            this.setGlow(false)
        }
    },

    onDragEnter: function(figure) {
        // only start tracking the movement of dragged element when
        // drag enters this container

        // remove old throttle handler as we will create a new one here
        // which won't be recognized as the old one inside the Figuer.on()
        // which would lead to having two+ handlers after each enter
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

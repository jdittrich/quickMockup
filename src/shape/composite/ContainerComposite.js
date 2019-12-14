const setAsPotentialContainer = function (container, figure) {
    container.setGlow(true)
    unsetAsPotentialContainer(container.getComposite(), figure)
}

const unsetAsPotentialContainer = function (container, figure) {
    if (!container) {
        return
    }

    if (container instanceof Container) {
        container.setGlow(false)
        container.throttledMoveHandler && figure.off(container.throttledMoveHandler)
    }

    unsetAsPotentialContainer(container.getComposite(), figure)
}

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
            setAsPotentialContainer(this, figure)
        }
    },

    onDragEnter: function(figure) {
        // only start tracking the movement of dragged element when
        // drag enters this container

        // remove old throttle handler as we will create a new one here
        // which won't be recognized as the old one inside the Figuer.on()
        // which would lead to having two+ handlers after each enter
        this.throttledMoveHandler && figure.off(this.throttledMoveHandler)
        this.throttledMoveHandler = $.throttle(10, (canvas, { figure }) => {
            this.onEnteredFigureMove(figure)
        })
        figure.on('move', this.throttledMoveHandler)
    },

    onDragLeave: function(figure) {
        if (!this.getBoundingBox().contains(figure.getBoundingBox())) {
            unsetAsPotentialContainer(this, figure)
        }
        this.unassignFigure(figure)
    },

    onCatch: function (figure) {
        unsetAsPotentialContainer(this, figure)

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
            const stroke = this.getStroke()
            const color = this.getColor()
            this.originalStroke = { color, stroke }

            this.setStroke(stroke + 1)
            this.setColor('#6666cc')
        } else if (!glow && this.originalStroke) {
            const { stroke, color } = this.originalStroke
            this.setStroke(stroke)
            this.setColor(color)
            delete this.originalStroke
        }
    }

})

export default Container

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

    onDragLeave: function(figure) {
        this.unassignFigure(figure)
    },

    onCatch: function (droppedFigure, x, y, shiftKey, ctrlKey) {
        if (droppedFigure.getComposite()) {
            return
        }

        if (this.getBoundingBox().contains(droppedFigure.getBoundingBox())) {
            this.assignFigure(droppedFigure)
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
    }

})

export default Container

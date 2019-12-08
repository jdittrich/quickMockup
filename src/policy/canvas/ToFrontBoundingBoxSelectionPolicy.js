export default draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({
    select: function(canvas, figure) {
        this._super(canvas, figure)
        figure && figure.toFront()
    }
})

// Currently draw2d allows only one selection policy to be added to
// the canvas. That's why we need to extend the BoudningBoxSelectionPolicy
// to add more behavior, so that we don't need to reimplement its behavior
// too.
export default draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({
    select: function(canvas, figure) {
        this._super(canvas, figure)
        figure && figure.toFront()
    }
})

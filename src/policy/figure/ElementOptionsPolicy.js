// extending the default figure selection policy (RectangleSelectionFeedbackPolicy)
// with addition behavior to inform ElementOptionsHost about what element
// is being selected, unselected or moved (which are the equivalent of the element's
// figure being selected, unselected or moved)
//
// This is necessary as draw2d does not provide us with other ways to get feedback
// when a figure is selected or not, like an event.
export default draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend({
    optionsHost: null,

    element: null,

    init: function({ optionsHost, element, ...attr }, setters, getters) {
        this._super(attr, setters, getters)

        this.optionsHost = optionsHost
        this.element = element
    },

    onSelect: function(canvas, figure) {
        this._super(canvas, figure)
        this.optionsHost.onElementSelected(this.element)
    },

    onUnselect: function(canvas, figure) {
        this._super(canvas, figure)
        this.optionsHost.onElementUnselected(this.element)
    },

    moved: function(canvas, figure) {
        this._super(canvas, figure)
        this.optionsHost.onElementMoved(this.element)
    }
})

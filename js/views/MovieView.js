var app = app || {};

app.MovieView = Backbone.View.extend({
  tagName: 'div',
  className: 'movieContainer clearfix',
  template: _.template( $( '#movieTemplate' ).html() ),

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  }
});
var app = app || {};

app.MoviesView = Backbone.View.extend({
  el: '.main',

  initialize: function() {
    this.$input = this.$('#titleSearch');

    this.collection = new app.Movies();

    this.listenTo( this.collection, 'reset', this.render );
  },

  events:{
    'click .search-button':'searchMovie',
    'keypress #titleSearch': 'createOnEnter'
  },

  createOnEnter: function( event ) {
    var ENTER_KEY = 13;
    if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
      return;
    }

    this.searchMovie({});
    //this.$input.val('');
  },

  searchMovie: function( e ) {

    var apikey = "78ejsdd76tc6jsffmrxjddxu";
    var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
    var moviesSearchUrl = baseUrl + '/movies.json?apikey=' + apikey;
    //get the movie title
    var query = this.$input.val().trim();
    var pageLimit = "&page_limit=1";

    var that = this;


    this.collection.fetch({
      data : $.param({ page_limit: 5, apikey:'78ejsdd76tc6jsffmrxjddxu', q:query }),
      success : function(collection, response, options) {
        //console.log(that.collection);
      },
      error : function(collection, response, options) {
        console.log(response.statusText);
      },
      // A timeout is the only way to get an error event for JSONP calls!
      timeout : 5000,
      reset:true
    });
/*
    $.ajax({
      url : moviesSearchUrl + '&q=' + encodeURI(query) + pageLimit,
      dataType : "jsonp",
      success : function(data) {
        console.log(data);
      }
    });*/
  },

  // render library by rendering each book in its collection
  render: function(todos,options) {

    if(options.previousModels){
      options.previousModels.forEach(function(obj){
        obj.trigger('destroy');
      });
    }
    this.collection.each(function( item ) {
      this.renderMovie( item );
    }, this );
  },

  // render a book by creating a BookView and appending the
  // element it renders to the library's element
  renderMovie: function( item ) {
    var movieView = new app.MovieView({
      model: item
    });
    this.$el.append( movieView.render().el );
  }
});

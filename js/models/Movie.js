var app = app || {};

app.Movie = Backbone.Model.extend({
  defaults: {
    posterImage: '',
    title: 'No title',
    rating: 'Unknown',
    metaRating: 'Unknown',
    year: 'Unknown',
    summary: 'None'
  },

  parse: function( response ) {
    var that = this;
    var final = [];
    final.posterImage = response.posters.detailed;
    final.year = response.year;
    final.title = response.title;
    final.rating = response.ratings.critics_score;
    final.summary = response.synopsis;
    final.altId = response.hasOwnProperty('alternate_ids') && response.alternate_ids.imdb;

    console.log(final.altId);
    if(final.altId) {
      $.ajax({
        url : 'http://www.omdbapi.com/?i=tt' + final.altId,
        dataType : "json",
        success : function(data) {
          console.log("altData " + JSON.stringify(data));
          var newAttrs = {};
          newAttrs.metaRating = data.imdbRating;
          if(data.Poster.indexOf('http') > -1) {
            newAttrs.posterImage = data.Poster;
          }
          that.set(newAttrs);
        }
      });
    }

    return final;
  }
});
/*global Frontend, Backbone*/

Frontend.Models = Frontend.Models || {};

(function () {
    'use strict';

    Frontend.Models.Event = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        // properties of an event
        defaults: {
          title : '',
          description : ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();

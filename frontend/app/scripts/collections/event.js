/*global Frontend, Backbone*/

Frontend.Collections = Frontend.Collections || {};

(function () {
    'use strict';

    Frontend.Collections.Event = Backbone.Collection.extend({

        model: Frontend.Models.Event

    });

})();

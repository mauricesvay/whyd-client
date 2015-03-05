'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var Router = Backbone.Router.extend({

    routes: {
        '' : 'index',
        'hot': 'hot',
        'hot/:category': 'hot',
        'profile': 'profile'
    },

    initialize: function(options) {
        this.appView = options.appView;
    },

    index: function() {
        this.navigate("profile", {trigger: true});
    },

    hot: function(category) {
        this.appView.viewHot(category);
    },

    profile: function() {
        this.appView.viewProfile();
    },
});

module.exports = Router;

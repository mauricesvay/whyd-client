'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var Router = Backbone.Router.extend({

    routes: {
        '' : 'index'
    },

    index: function() {
        console.log('Router: index');
    }
});

module.exports = Router;

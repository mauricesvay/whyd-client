'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/index.tpl');

var AppView = Backbone.View.extend({

    el: $('.app'),
    tpl: _.template(template),

    initialize: function() {
        this.render();
    },

    render: function() {
        var out = this.tpl({});
        this.$el.html( out );
        return this;
    }

});

module.exports = AppView;

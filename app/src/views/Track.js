'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/track.tpl');

var TrackView = Backbone.View.extend({

    tpl: _.template(template),
    tagName: 'li',

    render: function() {
        var out = this.tpl(this.model.toJSON());
        this.$el.html( out );
        return this;
    }

});

module.exports = TrackView;

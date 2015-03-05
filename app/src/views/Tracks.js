'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/tracks.tpl');

var TrackView = require('./Track');

var TracksView = Backbone.View.extend({

    tpl: _.template(template),
    className: 'tracks',
    events: {
        'click a': 'select',
        'click .more': 'loadMore'
    },

    initialize: function() {
        var self = this;

        this.listenTo(this.model, 'sync', this.render);
    },

    render: function() {
        var self = this;

        var out = this.tpl({});
        this.$el.html( out );
        var list = this.$el.find('.list');

        this.model.each(function(model){
            var view = new TrackView({model: model});
            list.append(view.render().el);
        });
        return this;
    },

    select: function(e) {
        e.preventDefault();

        var target = $(e.currentTarget);
        var id = target.attr('data-id');

        this.trigger('tracks:select', {id: id});
    },

    loadMore: function() {
        this.model.loadMore();
    }

});

module.exports = TracksView;

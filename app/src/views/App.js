'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/index.tpl');

var Tracks = require('../collections/Tracks');
var Playlist = require('../collections/Playlist');
var Hot = require('../collections/Hot');

var TracksView = require('../views/Tracks');
var PlayerView = require('../views/Player');

// var userId = '4e2db06a981d90d694c12c82';
var userId = 'mauricesvay';

var AppView = Backbone.View.extend({

    el: $('.app'),
    tpl: _.template(template),

    events: {
        'click .more': 'loadMore',
        'click .toggle-menu': 'toggleMenu',
        'click .menu': 'toggleMenu'
    },

    initialize: function() {
        this.render();
        this.queue = null;
    },

    render: function() {
        var self = this;
        var out = this.tpl({});
        this.$el.html(out);

        this.playerView = new PlayerView({
            el: $('.player')[0]
        });

        //Auto next
        this.listenTo(this.playerView, 'ended', function() {
            if (!self.queue) {
                return;
            }
            var index = self.queue.indexOf(self.currentTrack);
            var nextTrack;
            if (self.currentTrack && (index < self.queue.length - 1)) {
                nextTrack = self.queue.at(index + 1);
                self.playerView.playTrack(nextTrack);
                self.currentTrack = nextTrack;
            }
        });

        return this;
    },

    toggleMenu: function() {
        $('.menu').toggleClass('active');
    },

    setCurrentView: function(view) {
        if (this.currentView) {
            this.currentView.undelegateEvents();
            this.currentView.remove();
        }
        this.currentView = view;
        this.$el.find('.content').append(view.el);

        if (view.title) {
            this.$el.find('h1').text(view.title);
        }
    },

    viewProfile: function() {
        var self = this;
        var userId = window.prompt('User ID', 'mauricesvay');
        var tracks = new Tracks([], {
            userId: userId
        });
        var tracksView = new TracksView({
            model: tracks
        });
        tracksView.title = "Profile";
        this.setCurrentView(tracksView);

        // Click on track
        this.listenTo(tracksView, 'tracks:select', function(payload) {
            if (payload.id) {
                var track = tracks.where({
                    _id: payload.id
                });
                if (track.length) {
                    self.playerView.playTrack(track[0]);
                    this.queue = tracks;
                    this.currentTrack = track[0];
                }
            }
        });

        tracks.fetch();
    },

    viewHot: function(category) {
        var self = this;
        var tracks = new Hot([], {
            category: category
        });

        var tracksView = new TracksView({
            model: tracks
        });
        tracksView.title = "Hot" + (category ? ' / ' + category : '');
        self.setCurrentView(tracksView);

        this.listenTo(tracksView, 'tracks:select', function(payload) {
            if (payload.id) {
                var track = tracks.where({
                    _id: payload.id
                });
                if (track.length) {
                    self.playerView.playTrack(track[0]);
                    self.queue = tracks;
                    self.currentTrack = track[0];
                }
            }
        });

        tracks.fetch();
    }

});

module.exports = AppView;

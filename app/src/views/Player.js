'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var moment = require('moment');

var template = require('../templates/track.tpl');

var PlayerView = Backbone.View.extend({

    el: $('.player')[0],

    events: {
        'click .play': 'play',
        'click .pause': 'pause',
        'click .forward': 'forward'
    },

    initialize: function() {
        window.SC.initialize({
            client_id: "a0c0bafccf991c78f3ff17f56b4e5a3c"
        });
    },

    onClick: function(e) {
        console.log(e.target);
    },

    reset: function() {
        var self = this;
        if (self.player) {
            var previous = self.player;
            previous.pause();
            Popcorn.destroy(previous);
        }
        this.setTime(0);
    },

    bindEvents: function(popcornInstance) {
        var events = [ 'abort', 'canplay', 'canplayall', 'canplaythrough',
        'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadstart',
        'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking',
        'suspend', 'timeupdate', 'trackend', 'trackstart', 'volumechange', 'waiting'];

        for (var i=0,l=events.length; i<l; i++) {
            popcornInstance.on(events[i], this.onPopcornEvent.bind(this) );
        }
    },
    onPopcornEvent: function(e) {
        switch (e.detail.type) {
            case 'playing':
                this.setTitle(this.title);
                this.$el.addClass('playing');
                break;
            case 'pause':
                this.$el.removeClass('playing');
                break;
            case 'timeupdate':
                this.setTime(
                    Math.floor( this.player.currentTime() )
                );
                break;
            case 'ended':
                this.trigger('ended');
            default:
                console.log('Popcorn event ' + e.detail.type);
        }
    },

    play: function() {
        if (this.player) {
            this.player.play();
        }
    },
    pause: function() {
        if (this.player) {
            this.player.pause();
        }
    },
    forward: function() {
        if (this.player) {
            var duration = this.player.duration();
            this.player.currentTime(duration - 10);
        }
    },

    setTime: function(seconds) {
        this.$el.find('.currentTime').text(
            moment.unix( seconds ).format('mm:ss')
        );
    },

    setTitle: function(title) {
        this.$el.find('.title').text(title);
    },

    playTrack: function(track) {

        var self = this;
        var source = track.get('source');

        this.reset();
        this.setTitle('Loading');
        this.title = track.get('name');

        switch (source) {
            case 'soundcloud':
                window.SC.get(track.get('link'), null, function(res){
                    if (!res.errors && res.permalink_url) {
                        var wrapper = Popcorn.HTMLSoundCloudAudioElement( "#player" );
                        wrapper.src = res.permalink_url;
                        self.player = Popcorn( wrapper );
                        self.player.play();

                        self.bindEvents(self.player);
                    } else {
                        console.log(res);
                        alert(res.errors[0].error_message);
                    }
                });
                break;
            case 'youtube':
                var wrapper = Popcorn.HTMLYouTubeVideoElement( "#player" );
                wrapper.src = track.get('link');
                this.player = Popcorn( wrapper );
                this.player.play();
                this.bindEvents(self.player);
                break;
        }
    }

});

module.exports = PlayerView;

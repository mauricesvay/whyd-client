'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var Tracks = require('./Tracks');

var Playlist = Tracks.extend({

    url: function() {
        return [
            'http://whyd.com/u/',
            this.options.userid,
            '/playlist/',
            this.options.playlistid,
            '?format=json',
            '&limit=' + (this.options.limit || 10)
        ].join('');
    }

});

module.exports = Playlist;

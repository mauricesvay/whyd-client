'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var url;
    if ( originalOptions.data ) {
        url = originalOptions.url + '?' + $.param(originalOptions.data);
    } else {
        url = originalOptions.url
    }
    if (options.crossDomain) {
        options.url = "http://www.inertie.org/ba-simple-proxy.php?mode=native&url=" + encodeURIComponent(url);
        // options.url = "http://furious-stream-4406.herokuapp.com?src=" + encodeURIComponent(url);
        // options.url = "https://cors-anywhere.herokuapp.com/" + encodeURIComponent(url);
        // options.url = "https://cors-anywhere.herokuapp.com/" + url;
        options.crossDomain = false;
    }
});

var Track = require('../models/Track');

var Tracks = Backbone.Collection.extend({

    model: Track,
    hasMore: true,

    url: function() {

        var url = [
            'http://whyd.com/',
            this.options.userId,
            '?format=json',
            '&limit=' + (this.options.limit || 10),
        ].join('');

        if ( this.getLastId() ) {
            url += '&after=' + this.getLastId()
        }

        return url;
    },

    initialize: function(models, options) {
        this.options = options;
    },

    fetch: function(options) {
        options = options || {};
        return Backbone.Collection.prototype.fetch.call(this, _.extend(options, {remove:false}));
    },

    loadMore: function(options) {
        return this.fetch(options);
    },

    getLastId: function() {
        if (this.length > 0) {
            return this.at(this.length - 1).get('_id');
        }
    }

});

module.exports = Tracks;

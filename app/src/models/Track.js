'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var Track = Backbone.Model.extend({
    initialize: function( attribute, options) {
        this._setLink(attribute['eId'])
    },

    _setLink: function( eId ) {

        if (!eId) {
            console.log(this.toJSON());
            return;
        }

        var res;
        var link = '';
        var source = '';
        if (res = eId.match(/^\/yt\/(.*)/)) {
            link = 'https://www.youtube.com/watch?v=' + res[1];
            source = 'youtube';
        }

        if (res = eId.match(/api.soundcloud.com\/tracks\/(.*)/)) {
            link = '/tracks/' + res[1];
            source = 'soundcloud';
        }

        this.set('link', link);
        this.set('source', source);
    }
});

module.exports = Track;

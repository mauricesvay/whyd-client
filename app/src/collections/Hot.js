'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var Tracks = require('./Tracks');

// @FIXME: API response is different from Tracks
// it shouldnt inherit from Tracks
var Hot = Tracks.extend({

    categories: [
        'hiphop','pop','electro','indie','folk','rock','metal','rnb',
        'soul','blues','punk','jazz','classical','reggae','latin','world'
    ],

    url: function() {
        return [
            'http://whyd.com/hot',
            this.getCurrentCategory() ? '/' + this.getCurrentCategory() : '',
            '?format=json',
            '&limit=' + (this.options.limit || 10)
        ].join('');
    },

    getCurrentCategory: function() {
        return this.categories.indexOf(this.options.category) !== -1 ? this.options.category : null;
    },

    sync: function(method, model, options) {
        if (method === 'read') {
            $.ajax({
                url: this.url(),
                method: 'get',
                dataType: 'json',
                success: function( data ) {
                    if (data.tracks && data.tracks.length > 0) {
                        options.success && options.success(data.tracks);
                    }
                }
            });
        }
    }

});

module.exports = Hot;

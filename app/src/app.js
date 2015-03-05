'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require("backbone");
Backbone.$ = $;

var Router = require('./router/Router');
var AppView = require('./views/App');

var appView = new AppView();
var router = new Router({appView: appView});
Backbone.history.start();

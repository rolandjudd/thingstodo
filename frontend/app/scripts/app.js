/** @jsx React.DOM */

// require frontend javascript dependencies
var React = window.React = require('react'),
    $ = require('jquery-browserify'),
    EventBox = require('./EventBox');
    mountNode = document.getElementById('app');

// Document ready react load
$(document).ready(function() {
    var events_url = window.location.origin + "/events";
    React.renderComponent(<EventBox url={events_url} pollInterval={15000} />, mountNode);
});

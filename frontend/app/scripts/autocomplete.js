/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    handleChange: function() {
        var place = this.state.autocomplete.getPlace();
        this.props.onUserInput(place.geometry.location.lat(), place.geometry.location.lng());
    },
    // grab location from google maps
    handleGeolocation: function() {
        if (navigator.geolocation) {
            var autocomplete = this.state.autocomplete;
            navigator.geolocation.getCurrentPosition(function(position) {
                var geolocation = new google.maps.LatLng(
                    position.coords.latitude, position.coords.longitude);
                autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
                                                                    geolocation));
            });
            this.setState({autocomplete: autocomplete});
        }
    },
    componentDidMount: function() {
        var autocomplete = new google.maps.places.Autocomplete(
            this.refs.cmplt.getDOMNode(), {types: ['geocode']});
        this.setState({autocomplete: autocomplete}, function() {
            google.maps.event.addListener(this.state.autocomplete, 'place_changed', this.handleChange);
        });
    },
    render: function() {
        return (
           <input className="autocomplete form-control" ref="cmplt" placeholder="Enter the address"
               onFocus={this.handleGeolocation} type="text" />
        );
    }
});

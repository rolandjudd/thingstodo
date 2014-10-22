/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    handleSubmit: function() {
        var place = this.state.autocomplete.getPlace();
        console.log(place);
        this.props.onUserInput(place.geometry.location.toString());
    },
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
                     console.log(this.state.autocomplete);
        });
    },
    render: function() {
        return (
           <input className="Autocomplete" ref="cmplt" placeholder="Enter the address"
                onFocus={this.handleGeolocation} onChange={this.handleSubmit} type="text">
           </input>
        )
    }
});

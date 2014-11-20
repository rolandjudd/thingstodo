/** @jsx React.DOM */

var React = window.React = require('react');

// render a single content
var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                {this.props.children}
            </div>
        );
    }
});

module.exports = Comment;

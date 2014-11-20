/** @jsx React.DOM */

var React = window.React = require('react');

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

/** @jsx React.DOM */

var React = window.React = require('react'),
    Comment = require('./Comment');

var CommentList = React.createClass({
    render: function () {
        var commentNodes;
        if (this.props.data) {
            commentNodes = this.props.data.map(function(comment, index) {
                return (
                    <Comment key={index}>
                        {comment.comment}
                    </Comment>
                );
            });
        }
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

module.exports = CommentList;

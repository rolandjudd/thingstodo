/** @jsx React.DOM */

var React = window.React = require('react'),
    CommentList = require('./CommentList');

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        commentBox = this;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'GET',
        })
          .done(function (data) {
              commentBox.setState({data: data});
          })
          .fail(function (xhr, status, err) {
              console.error(commentBox.props.url, status, err.toString());
          });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        //setInterval(this.loadEventsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList data={this.state.data} />
            </div>
        );
    }
});

module.exports = CommentBox;

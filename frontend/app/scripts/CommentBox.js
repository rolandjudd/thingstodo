/** @jsx React.DOM */

var React = window.React = require('react'),
    CommentForm = require('./CommentForm'),
    CommentList = require('./CommentList');

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        var commentBox = this;
        // grab comments from the server
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'GET',
        })
          .done(function (data) {
              // handle success
              commentBox.setState({data: data});
          })
          .fail(function (xhr, status, err) {
              // handle failure
              console.error(commentBox.props.url, status, err.toString());
          });
    },

    handleCommentSubmit: function (comment) {
        var commentBox = this;
        var comments = this.state.data;
        comments.push(comment);

        console.log(comment);

        this.setState({data: comments}, function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(comment)
            })
              .done(function (data) {
                  commentBox.setState({data: data});
              })
              .fail(function (xhr, status, err) {
                  console.error(xhr.responseText);
                  alert(xhr.responseText);
                  console.error(eventBox.props.url, status, err.toString());
              });
        });
    },

    // initial state is no data
    getInitialState: function () {
        return {data: []};
    },

    componentDidMount: function () {
        this.loadCommentsFromServer();
        //setInterval(this.loadEventsFromServer, this.props.pollInterval);
    },
    
    render: function () {
        // create CommentList with data
        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList data={this.state.data} />
                <CommentForm eventId={this.props.eventId} onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

module.exports = CommentBox;

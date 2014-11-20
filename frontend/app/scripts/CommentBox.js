/** @jsx React.DOM */

var React = window.React = require('react'),
    CommentList = require('./CommentList');

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        commentBox = this;
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
            </div>
        );
    }
});

module.exports = CommentBox;

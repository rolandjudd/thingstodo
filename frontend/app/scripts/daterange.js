/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

    render: function () {
        return (
            <DateRangePicker startDate={moment()} endDate={moment().add(1, 'days')} 
                timePicker={true} onApply={this.handleDate}>
                <button className="btn btn-default">
                    {label}
                </button>
            </DateRangePicker>
        );
    }
}

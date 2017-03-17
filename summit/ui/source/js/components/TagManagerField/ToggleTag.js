import React from 'react';

class ToggleTag extends React.Component {

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.selected != this.props.selected;
    }

    render() {
        const buttonClass = this.props.selected
            ? 'btn-primary btn-tag-selected'
            : 'btn-default';

        return (
            <a href="#" className={`btn btn-tag ${buttonClass}`} onClick={this.clickHandler}>
                <span className="pound">#</span>{this.props.name}
            </a>
        );
    }

    clickHandler(event) {
        event.preventDefault();
        this.props.toggle(this.props.name);
    }
}

ToggleTag.PropTypes = {
    name: React.PropTypes.string,
    toggle: React.PropTypes.func,
    selected: React.PropTypes.bool
};

export default ToggleTag;

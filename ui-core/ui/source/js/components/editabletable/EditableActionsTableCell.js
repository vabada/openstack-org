import React from 'react';

export default class EditableActionsTableCell extends React.Component {

    constructor(props) {
        super(props);

    }

    onDelete(id, ev) {
        ev.preventDefault();
        this.props.actions.delete(id);
    }

    onSave(id, ev) {
        ev.preventDefault();
        this.props.actions.save(id);
    }

    onEdit(id, ev) {
        ev.preventDefault();
        this.props.actions.edit(id);
    }

    onCancel(id, ev) {
        ev.preventDefault();
        this.props.actions.cancel(id);
    }

    render() {
        let {actions, id, editing} = this.props;
        return (
            <td key='actions'>
                {editing ?
                (
                    <a href="" onClick={this.onSave.bind(this,id)} >
                        <i className="fa fa-floppy-o"></i>
                    </a>
                    <a href="" onClick={this.onCancel.bind(this,id)} >
                        <i className="fa fa-times"></i>
                    </a>
                ) : (
                    {'edit' in actions &&
                        <a href="" onClick={this.onEdit.bind(this,id)} >
                            <i className="fa fa-pencil-square-o"></i>
                        </a>
                    }
                    {'delete' in actions &&
                        <a href="" onClick={this.onDelete.bind(this,id)} >
                            <i className="fa fa-trash-o"></i>
                        </a>
                    }
                )}

            </td>
        );
    }
};

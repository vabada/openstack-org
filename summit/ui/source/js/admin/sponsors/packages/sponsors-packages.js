import React from 'react';
import { connect } from 'react-redux';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";

class SponsorsPackages extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />

            </div>
        );
    }
}

export default connect (
    state => {
        return {
            loading: state.loading,
            msg: state.msg,
            msg_type: state.msg_type
        }
    },
    dispatch => ({

    })
)(SponsorsPackages);

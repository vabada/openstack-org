/**
 * Copyright 2017 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react';
import { connect } from 'react-redux';


class WiFiPanel extends React.Component {

	constructor (props) {
		super(props);

        this.state = {
            wifis: props.wifis,
            new_wifi_network: '',
            new_wifi_pass: ''
        }

        this.handleChange = this.handleChange.bind(this);
        ;
	}

    handleChange(ev) {
        const value = ev.target.value;
        const name = ev.target.name;
        this.setState({[name]: value});
    }

    handleAddWifi(ev) {
        ev.preventDefault();
        let wifis = this.state.wifis;
        wifis.push({
            network: this.state.new_wifi_network,
            password: this.state.new_wifi_pass
        });

        this.setState({
            wifis: wifis,
            new_wifi_network: '',
            new_wifi_pass: ''
        });

    }

    handleDeleteWifi(key, ev) {
        ev.preventDefault();
        let wifis = this.state.wifis;

        wifis.splice(key,1);

        this.setState({
            wifis: wifis
        });

    }

	render () {

		return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Network</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.wifis.map((wifi, i) => (
                            <tr key={i}>
                                <td>{wifi.network}</td>
                                <td>{wifi.password}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={this.handleDeleteWifi.bind(this, i)}> Delete </button>
                                </td>
                            </tr>
                        ))}
                        <tr id="new_wifi_row">
                            <td>
                                <input type="text" className="form-control" name="new_wifi_network" value={this.state.new_wifi_network} onChange={this.handleChange} />
                            </td>
                            <td>
                                <input type="text" className="form-control" name="new_wifi_pass" value={this.state.new_wifi_pass} onChange={this.handleChange} />
                            </td>
                            <td>
                                <button className="btn btn-default" onClick={this.handleAddWifi.bind(this)}> Add </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

		);
	}
}


export default connect (
    state => ({

    }),
    dispatch => ({
    })
)(WiFiPanel);
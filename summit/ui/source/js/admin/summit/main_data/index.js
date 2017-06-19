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
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SummitMainDataApp from './summit-main-data';
import Message from '../../generic/containers/Message';
import store from './store';
import '../../generic/less/style.less';

const containerId = 'summit-main-data';

document.addEventListener('DOMContentLoaded', function init() {
    if (document.getElementById(containerId)) {
        render(
            <Provider store={store}>
                <SummitMainDataApp summit={summit} />
            </Provider>,
            document.getElementById(containerId)
        );
    }

    if (document.getElementById('app-msg-wrapper')) {
        render(
            <Provider store={store}>
                <Message />
            </Provider>,
            document.getElementById('app-msg-wrapper')
        );
    }
});



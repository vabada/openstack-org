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

import {LOADING, STOP_LOADING, RECEIVE_ALL, PACKAGE_DELETED} from './actions';

export const sponsorsPackages = (
    state = {
        loading: false,
        items: []
    },
    action = {}
) => {
    switch(action.type){
        case LOADING:
        {
            return {
                ...state,
                loading: true,
            }
        }
        break;

        case STOP_LOADING:
        {
            return {
                ...state,
                loading: false,
            }
        }
        break;

        case RECEIVE_ALL:
        {
            const { response } = action.payload;
            return {
                ...state,
                items: response,
                loading: false
            }
        }
        break;

        case PACKAGE_DELETED:
        {
            const { response } = action.payload;
            return {
                ...state,
                items: state.items.filter(p => p.id != response),
                loading: false
            }
        }
        break;

        default:
            return state;
    }
};
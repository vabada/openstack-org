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

import {StaticProps, LOADING, STOP_LOADING, RECEIVE_ALL, ADDON_DELETED, ADDON_UPDATED, ADDON_ADDED} from './actions';

export const sponsorsAddOns = (
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

        case ADDON_DELETED:
        {
            const { response } = action.payload;
            return {
                ...state,
                items: state.items.filter(p => p.id != response),
                loading: false
            }
        }
        break;

        case ADDON_UPDATED:
        {
            const { response } = action.payload;
            return {
                ...state,
                loading: false,
                msg: 'Add On saved successfully!',
                msg_type: 'success'
            }
        }
        break;

        case ADDON_ADDED:
        {
            window.location = StaticProps.base_url;
            break;
        }
        break;

        default:
            return state;
    }
};
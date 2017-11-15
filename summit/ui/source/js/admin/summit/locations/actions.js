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


import URI from "urijs";
import { getRequest, putRequest, postRequest, deleteRequest, createAction } from "~core-utils/actions";

export const LOADING = 'LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const RECEIVE_ALL = 'RECEIVE_ALL';
export const ITEM_DELETED = 'ITEM_DELETED';
export const ITEM_UPDATED = 'ITEM_UPDATED';
export const ITEM_ADDED = 'ITEM_ADDED';

export const StaticProps = {...window.ReactStaticProps};

const api_url = `api/v1/summits/${StaticProps.summit.id}/locations`;
const controller_url = `/${StaticProps.base_url}/${StaticProps.summit.id}/summit/locations`;

export const postOrder = (params) => dispatch => {
    putRequest(
        createAction(LOADING),
        createAction(STOP_LOADING),
        `${api_url}/reorder`,
        params
    )(params)(dispatch);
}

export const fetchAll = getRequest(
    createAction(LOADING),
    createAction(RECEIVE_ALL),
    api_url
);

export const editItem = (params) => dispatch => {
    let url = URI(`${controller_url}/${params.id}`).toString();
    window.location = url;
}

export const deleteItem = (params) => dispatch => {
    deleteRequest(
        createAction(LOADING),
        createAction(ITEM_DELETED),
        `${api_url}/${params.id}`,
    params
)(params)(dispatch);
}

export const saveItem = (params) => dispatch => {
    if (params.item.id) {
        putRequest(
            createAction(LOADING),
            createAction(ITEM_UPDATED),
            `${api_url}/${params.item.id}`,
            params
        )(params)(dispatch);
    } else {
        postRequest(
            createAction(LOADING),
            createAction(ITEM_ADDED),
            `${api_url}`,
            params
        )(params)(dispatch);
    }

}




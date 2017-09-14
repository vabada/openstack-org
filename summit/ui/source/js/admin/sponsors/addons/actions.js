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
export const ADDON_DELETED = 'ADDON_DELETED';
export const ADDON_UPDATED = 'ADDON_UPDATED';
export const ADDON_ADDED = 'ADDON_ADDED';

export const StaticProps = {...window.ReactStaticProps};

export const postOrder = (params) => dispatch => {
    putRequest(
        createAction(LOADING),
        createAction(STOP_LOADING),
        `api/v1/summits/${StaticProps.summit.id}/add-ons/reorder`,
        params
    )(params)(dispatch);
}

export const fetchAll = getRequest(
    createAction(LOADING),
    createAction(RECEIVE_ALL),
    `api/v1/summits/${StaticProps.summit.id}/add-ons`
);

export const editAddOn = (params) => dispatch => {
    let url = URI(`/${StaticProps.base_url}/${StaticProps.summit.id}/sponsors/addons/${params.id}`).toString();
    window.location = url;
}

export const deleteAddOn = (params) => dispatch => {
    deleteRequest(
        createAction(LOADING),
        createAction(ADDON_DELETED),
        `api/v1/summits/${StaticProps.summit.id}/add-ons/${params.id}`,
    params
)(params)(dispatch);
}

export const saveAddOn = (params) => dispatch => {
    if (params.summit_addon.id) {
        putRequest(
            createAction(LOADING),
            createAction(ADDON_UPDATED),
            `api/v1/summits/${StaticProps.summit.id}/add-ons/${params.summit_addon.id}`,
            params
        )(params)(dispatch);
    } else {
        postRequest(
            createAction(LOADING),
            createAction(ADDON_ADDED),
            `api/v1/summits/${StaticProps.summit.id}/add-ons`,
            params
        )(params)(dispatch);
    }

}




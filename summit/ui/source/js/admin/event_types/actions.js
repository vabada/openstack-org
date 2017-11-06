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
export const EVENT_TYPE_DELETED = 'EVENT_TYPE_DELETED';
export const EVENT_TYPE_UPDATED = 'EVENT_TYPE_UPDATED';
export const EVENT_TYPE_ADDED = 'EVENT_TYPE_ADDED';

export const StaticProps = {...window.ReactStaticProps};

export const fetchAll = getRequest(
    createAction(LOADING),
    createAction(RECEIVE_ALL),
    `api/v1/summits/${StaticProps.summit.id}/events/types`
);

export const editEventType = (params) => dispatch => {
    let url = URI(`/${StaticProps.base_url}/${StaticProps.summit.id}/events/types/${params.id}`).toString();
    window.location = url;
}

export const deleteEventType = (params) => dispatch => {
    deleteRequest(
        createAction(LOADING),
        createAction(EVENT_TYPE_DELETED),
        `api/v1/summits/${StaticProps.summit.id}/events/types/${params.id}`,
    params
)(params)(dispatch);
}

export const saveEventType = (params) => dispatch => {
    if (params.event_type.id) {
        putRequest(
            createAction(LOADING),
            createAction(EVENT_TYPE_UPDATED),
            `api/v1/summits/${StaticProps.summit.id}/events/types/${params.event_type.id}`,
            params
        )(params)(dispatch);
    } else {
        postRequest(
            createAction(LOADING),
            createAction(EVENT_TYPE_ADDED),
            `api/v1/summits/${StaticProps.summit.id}/events/types/${params.type}`,
            params
        )(params)(dispatch);
    }
}

export const seedDefault = (params) => dispatch => {
    postRequest(
        createAction(LOADING),
        createAction(RECEIVE_ALL),
        `api/v1/summits/${StaticProps.summit.id}/events/types/seed`,
        params
    )(params)(dispatch);
}




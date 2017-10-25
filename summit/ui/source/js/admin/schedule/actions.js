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
import { getRequest, putRequest, createAction, deleteRequest, postRequest, defaultErrorHandler } from "~core-utils/actions";
import URI from "urijs";
import moment from 'moment';

export const REQUEST_UNSCHEDULE_EVENTS_PAGE = "REQUEST_UNSCHEDULE_EVENTS_PAGE";
export const RECEIVE_UNSCHEDULE_EVENTS_PAGE = "RECEIVE_UNSCHEDULE_EVENTS_PAGE";
export const REQUEST_PUBLISH_EVENT          = 'REQUEST_PUBLISH_EVENT';

export const getUnScheduleEventsPage = (summitId, source = 'presentations', page = 1, page_size = 10, order = 'SummitEvent.Title', track_id = null, status = null ) =>
    (dispatch, getState) => {
    return getRequest(
        createAction(REQUEST_UNSCHEDULE_EVENTS_PAGE),
        createAction(RECEIVE_UNSCHEDULE_EVENTS_PAGE),
        `api/v1/summits/${summitId}/events/unpublished/${source}`,
        defaultErrorHandler
    )({
        expand: 'speakers',
        track_id: track_id,
        status: status,
        page: page,
        page_size: page_size,
        order: order,
    })(dispatch);
};

export const publishEvent = (event, day, startTime, minutes) =>
    (dispatch, getState) => {
     dispatch(createAction(REQUEST_PUBLISH_EVENT)(
         {
             event,
             day,
             startTime,
             minutes,
         }
     ));
};

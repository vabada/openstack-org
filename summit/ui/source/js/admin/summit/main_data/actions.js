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
import { putRequest, createAction } from "~core-utils/actions";

export const UPDATE_SUMMIT = 'UPDATE_SUMMIT';
export const SUMMIT_UPDATED = 'SUMMIT_UPDATED';


export const saveSummitMainData = (params) => dispatch => {
    putRequest(
        createAction(UPDATE_SUMMIT),
        createAction(SUMMIT_UPDATED),
        `api/v1/summits/${params.summit.id}`,
        params
)(params)(dispatch);
}


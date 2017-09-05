<?php

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
final class SummitFactory implements ISummitFactory
{

    /**
     * @param ISummit $summit
     * @param $summit_data
     * @return ISummit
     */
    public function update(ISummit &$summit, $summit_data)
    {
        $summit->Title = $summit_data['title'];
        $summit->Link = $summit_data['link'];
        $summit->Active = $summit_data['active'];
        $summit->AvailableOnApi = $summit_data['available_api'];
        $summit->DateLabel = $summit_data['date_label'];
        $summit->RegistrationLink = $summit_data['registration_link'];
        $summit->SecondaryRegistrationLink = $summit_data['registration_link_2'];
        $summit->SecondaryRegistrationBtnText = $summit_data['registration_label_2'];
        $summit->MaxSubmissionAllowedPerUser = $summit_data['max_submissions'];
        $summit->ComingSoonBtnText = $summit_data['coming_soon_label'];
        $summit->ExternalEventId = $summit_data['eventbrite_id'];
        return $summit;
    }

    /**
     * @param ISummit $summit
     * @param $summit_dates
     * @return ISummit
     */
    public function updateDates(ISummit &$summit, $summit_dates)
    {
        $summit->SummitBeginDate = $summit_dates['begin_date'];
        $summit->SummitEndDate = $summit_dates['finish_date'];
        $summit->SubmissionBeginDate = $summit_dates['submissions_begin'];
        $summit->SubmissionEndDate = $summit_dates['submissions_finish'];
        $summit->VotingBeginDate = $summit_dates['voting_begin'];
        $summit->VotingEndDate = $summit_dates['voting_finish'];
        $summit->SelectionBeginDate = $summit_dates['selections_begin'];
        $summit->SelectionEndDate = $summit_dates['selections_finish'];
        $summit->RegistrationBeginDate = $summit_dates['registration_begin'];
        $summit->RegistrationEndDate = $summit_dates['registration_finish'];
        $summit->TimeZone = $summit_dates['time_zone'];
        $summit->StartShowingVenuesDate = $summit_dates['venues_date'];
        $summit->ScheduleDefaultStartDate = $summit_dates['default_date'];
        return $summit;
    }

    /**
     * @param ISummit $summit
     * @param $wifi_data
     * @return ISummit
     */
    public function updateWifi(ISummit &$summit, $wifi_data)
    {
        foreach ($wifi_data as $wifi) {
            if(isset($wifi['id']) && $wifi['id']) {
                $wifi_obj = SummitWIFIConnection::get()->byID($wifi['id']);
            } else {
                $wifi_obj = new SummitWIFIConnection();
            }

            $wifi_obj->SSID = $wifi['network'];
            $wifi_obj->Password = $wifi['password'];
            $wifi_obj->SummitID = $summit->getIdentifier();
            $wifi_obj->write();
        }
        return $summit;
    }
}
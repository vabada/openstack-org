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
}
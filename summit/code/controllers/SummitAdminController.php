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
final class SummitAdminController extends Controller
{
    /**
     * @var  SummitAppAdminController The parent controller
     */
    protected $parent;

    private static $allowed_actions = array
    (
        'summitMainData',
        'summitDates',
        'summitLocations',
        'editSummitLocations',
    );

    private static $url_handlers = array
    (
        'main_data'                                => 'summitMainData',
        'dates'                                    => 'summitDates',
        'locations'                                => 'summitLocations',
        'locations/$LOCATION_ID!'                  => 'editSummitLocations',
    );

    /**
     * SummitAdminController constructor.
     * @param SummitAppAdminController $parent
     */
    public function __construct(SummitAppAdminController $parent)
    {
        parent::__construct();
        $this->parent       = $parent;
    }

    public function Link($action = null)
    {
        return $this->parent->Link($action);
    }

    public function summitMainData(SS_HTTPRequest $request)
    {
        $summit_id = intval($request->param('SummitID'));
        $summit = Summit::get()->byID($summit_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');
        return $this->parent->getViewer('summit_maindata')->process
            (
                $this->customise
                    (
                        array
                        (
                            'Summit' => $summit
                        )
                    )
            );
    }

    public function summitDates(SS_HTTPRequest $request)
    {
        $summit_id = intval($request->param('SummitID'));
        $summit = Summit::get()->byID($summit_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');
        return $this->parent->getViewer('summit_dates')->process
            (
                $this->customise
                    (
                        array
                        (
                            'Summit' => $summit
                        )
                    )
            );
    }

    public function summitLocations(SS_HTTPRequest $request)
    {
        $summit_id = intval($request->param('SummitID'));
        $summit = Summit::get()->byID($summit_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');
        return $this->parent->getViewer('summit_locations')->process
            (
                $this->customise
                    (
                        array
                        (
                            'Summit' => $summit
                        )
                    )
            );
    }

    public function editSummitLocations(SS_HTTPRequest $request)
    {
        $summit_id  = intval($request->param('SummitID'));
        $summit     = Summit::get()->byID($summit_id);
        $location_id = $request->param('LOCATION_ID');

        $location = SummitAbstractLocation::get()->byID($location_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');

        return $this->parent->getViewer('summit_editLocation')->process
            (
                $this->customise
                    (
                        array
                        (
                            'Summit'         => $summit,
                            'Location'       => $location,
                        )
                    )
            );
    }

}
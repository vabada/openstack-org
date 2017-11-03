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
final class SummitSponsorsAdminController extends Controller
{
    /**
     * @var  SummitAppAdminController The parent controller
     */
    protected $parent;

    private static $allowed_actions = array
    (
        'sponsorPackages',
        'sponsorAddons',
        'editPackage',
        'editAddon',
    );

    private static $url_handlers = array
    (
        'packages/$PACKAGE_ID!'     => 'editPackage',
        'packages'                  => 'sponsorPackages',
        'addons/$ADDON_ID!'         => 'editAddon',
        'addons'                    => 'sponsorAddons',
    );

    /**
     * SummitSponsorsAdminController constructor.
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

    public function sponsorPackages(SS_HTTPRequest $request)
    {
        $summit_id = intval($request->param('SummitID'));
        $summit = Summit::get()->byID($summit_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');

        return $this->parent->getViewer('sponsors_packages')->process
            (
                $this->customise
                    (
                        array
                        (
                            'Summit' => $summit,
                        )
                    )
            );
    }

    public function sponsorAddons(SS_HTTPRequest $request)
    {
        $summit_id = intval($request->param('SummitID'));
        $summit = Summit::get()->byID($summit_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');
        return $this->parent->getViewer('sponsors_addons')->process
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

    public function editPackage(SS_HTTPRequest $request)
    {
        $summit_id  = intval($request->param('SummitID'));
        $summit     = Summit::get()->byID($summit_id);
        $package_id = $request->param('PACKAGE_ID');

        $package = SummitPackage::get()->byID($package_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');

        return $this->parent->getViewer('sponsors_editPackage')->process
            (
                $this->customise
                    (
                        array
                        (
                            'Summit'         => $summit,
                            'Package'        => $package,
                        )
                    )
            );
    }

    public function editAddon(SS_HTTPRequest $request)
    {
        $summit_id  = intval($request->param('SummitID'));
        $summit     = Summit::get()->byID($summit_id);
        $addon_id = $request->param('ADDON_ID');

        $addon = SummitAddOn::get()->byID($addon_id);

        Requirements::css('summit/css/simple-sidebar.css');
        Requirements::css('node_modules/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css');
        Requirements::javascript('summit/javascript/simple-sidebar.js');

        return $this->parent->getViewer('sponsors_editAddon')->process
            (
                $this->customise
                    (
                        array
                        (
                            'Summit'       => $summit,
                            'Addon'        => $addon,
                        )
                    )
            );
    }

}
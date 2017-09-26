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
interface ISummitSponsorshipManager
{
    /**
     * @param $package
     * @return void
     */
    public function deletePackage($package);

    /**
     * @param array $package_data
     * @return ISummitPackage
     */
    public function addPackage(array $package_data, $summit_id);

    /**
     * @param array $package_ids
     * @return array ISummitPackage
     */
    public function updatePackageOrder(array $package_ids);

    /**
     * @param array $package_data
     * @return ISummitPackage
     */
    public function updatePackage(array $package_data);

    /**
     * @param $addon
     * @return void
     */
    public function deleteAddOn($addon);

    /**
     * @param array $addon_ids
     * @return array ISummitAddOn
     */
    public function updateAddOnOrder(array $addon_ids);

    /**
     * @param array $addon_data
     * @return ISummitAddOn
     */
    public function updateAddOn(array $addon_data);

    /**
     * @param array $addon_data
     * @return ISummitAddOn
     */
    public function addAddOn(array $addon_data, $summit_id);

}
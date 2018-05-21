<?php
/**
 * Copyright 2018 OpenStack Foundation
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

class CustomCMSSettingsController extends CMSSettingsController
{
    public function init() {
        parent::init();
    }

    /**
     * Save the current sites {@link SiteConfig} into the database
     *
     * @param array $data
     * @param Form $form
     * @return String
     */
    public function clearSSCache($data, $form) {
        global $manifest;
        $manifest->regenerate(true);
        $tempDir  = TEMP_FOLDER;
        $cacheDir = $tempDir . DIRECTORY_SEPARATOR . 'cache';
        if (is_dir($cacheDir)) {
            system('rm -rf ' . escapeshellarg($cacheDir), $retval);
            system('rm -rf ' . escapeshellarg($tempDir), $retval);
        }
    }
}
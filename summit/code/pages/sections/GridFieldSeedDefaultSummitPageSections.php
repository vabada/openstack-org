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

/**
 * Class GridFieldSeedDefaultSummitPageSections
 */
final class GridFieldSeedDefaultSummitPageSections
    implements GridField_HTMLProvider, GridField_URLHandler, GridField_ActionProvider {

    protected $targetFragment;

    private static $allowed_actions = [
        'handleSeedDefaultSummitPageSectionsAction'
    ];

    public function __construct($targetFragment = 'before') {
        $this->targetFragment = $targetFragment;
    }

    //Generate the HTML fragment for the GridField
    public function getHTMLFragments($gridField) {
        $button = new GridField_FormAction(
            $gridField,
            'seedDefaultSummitPageSectionsAction',
            'Use Previous Sections',
            'seedDefaultSummitPageSectionsAction',
            null
        );
        $button->setAttribute('data-icon', 'add');
        return [
            $this->targetFragment =>  $button->Field() ,
        ];
    }
    /**
     * Return URLs to be handled by this grid field, in an array the same form
     * as $url_handlers.
     * Handler methods will be called on the component, rather than the
     * {@link GridField}.
     */
    public function getURLHandlers($gridField)
    {
        return [
            'seedDefaultSummitPageSectionsAction' => 'handleSeedDefaultSummitPageSectionsAction'
        ];
    }

    public function handleSeedDefaultSummitPageSectionsAction($grid, $request, $data = null) {

        $page_id = intval($request->param('ID'));
        if($page_id > 0 && $page = SummitAboutPage::get()->byID($page_id))
        {
            $page->seedDefaultPageSections();
        }
    }

    public function getActions($gridField) {
        return ['seedDefaultSummitPageSectionsAction'];
    }

    public function handleAction(GridField $gridField, $actionName, $arguments, $data)
    {
        if($actionName == 'seeddefaultsummitpagesectionsaction') {
            return $this->handleSeedDefaultSummitPageSectionsAction($gridField,Controller::curr()->getRequest(), $data);
        }
    }
}

<?php
/**
 * Copyright 2016 OpenStack Foundation
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
 * Class SummitAppAddOnsApi
 */
class SummitAppAddOnsApi extends AbstractRestfulJsonApi {


    /**
     * @var IEntityRepository
     */
    private $sponsorship_add_on_repository;

    /**
     * @var ISummitSponsorshipManager
     */
    private $sponsorship_manager;

    public function __construct
    (
        IEntityRepository $sponsorship_add_on_repository,
        ISummitSponsorshipManager $sponsorship_manager
    )
    {
        parent::__construct();
        $this->sponsorship_add_on_repository  = $sponsorship_add_on_repository;
        $this->sponsorship_manager    = $sponsorship_manager;
    }

    protected function isApiCall(){
        $request = $this->getRequest();
        if(is_null($request)) return false;
        return true;
    }

    /**
     * @return bool
     */
    protected function authorize(){
        return true;
        if(!Permission::check('ADMIN_SUMMIT_APP_FRONTEND_ADMIN')) return false;
        return $this->checkOwnAjaxRequest();
    }

    protected function authenticate() {
        return true;
    }

    static $url_handlers = array(
        'GET '        => 'getAddOnsBySummit',
    );

    static $allowed_actions = array(
        'getAddOnsBySummit',
    );

    /**
     * @CustomAnnotation\CachedMethod(lifetime=900, format="JSON")
     * @param SS_HTTPRequest $request
     * @return mixed|SS_HTTPResponse
     */
    public function getAddOnsBySummit(SS_HTTPRequest $request)
    {
        try {

            $summit_id = (int)$request->param('SUMMIT_ID');
            $query = new QueryObject(new SummitAddOn);
            $query->addAndCondition(QueryCriteria::equal('SummitID', $summit_id));
            $query->addOrder(QueryOrder::asc("Order"));
            list($list, $count) = $this->sponsorship_add_on_repository->getAll($query, 0, PHP_INT_MAX);
            $res = array();
            foreach ($list as $add_on) {
                array_push($res, SummitAddOnAssembler::toArray($add_on));
            }

            return $this->ok($res);
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::WARN);

            return $this->serverError();
        }
    }


}
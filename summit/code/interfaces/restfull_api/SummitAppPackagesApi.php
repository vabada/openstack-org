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

use Openstack\Annotations as CustomAnnotation;
/**
 * Class SummitAppPackagesApi
 */
class SummitAppPackagesApi extends AbstractRestfulJsonApi {


    /**
     * @var IEntityRepository
     */
    private $sponsorship_package_repository;

    /**
     * @var ISponsorshipManager
     */
    private $sponsorship_manager;

    public function __construct
    (
        IEntityRepository $sponsorship_package_repository,
        ISponsorshipManager $sponsorship_manager
    )
    {
        parent::__construct();
        $this->sponsorship_package_repository  = $sponsorship_package_repository;
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
        'GET '        => 'getPackagesBySummit',
    );

    static $allowed_actions = array(
        'getPackagesBySummit',
    );

    /**
     * @CustomAnnotation\CachedMethod(lifetime=900, format="JSON")
     * @param SS_HTTPRequest $request
     * @return mixed|SS_HTTPResponse
     */
    public function getPackagesBySummit(SS_HTTPRequest $request)
    {
        try {
            $query     = new QueryObject(new SummitPackage());
            $summit_id = (int)$request->param('SUMMIT_ID');
            $query->addAndCondition(QueryCriteria::equal('SummitID', $summit_id));
            $query->addOrder(QueryOrder::asc("Order"));
            list($list, $count) = $this->sponsorship_package_repository->getAll($query, 0, PHP_INT_MAX);
            $res = array();
            foreach ($list as $package) {
                array_push($res, SummitPackageAssembler::toArray($package));
            }

            return $this->ok($res);
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::WARN);

            return $this->serverError();
        }
    }


}
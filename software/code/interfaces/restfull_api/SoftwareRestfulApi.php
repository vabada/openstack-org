<?php

/**
 * Copyright 2015 OpenStack Foundation
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
class SoftwareRestfulApi extends AbstractRestfulJsonApi
{
    const ApiPrefix = 'api/v1/software';

    /**
     * @var ISoftwareManager
     */
    private $manager;

    /**
     * @return ISoftwareManager
     */
    public function getSoftwareManager()
    {
        return $this->manager;
    }

    /**
     * @param ISoftwareManager $manager
     */
    public function setSoftwareManager(ISoftwareManager $manager)
    {
        $this->manager = $manager;
    }

    protected function authenticate(){
        return true;
    }

    protected function isApiCall(){
        $request = $this->getRequest();
        if(is_null($request)) return false;
        return  strpos(strtolower($request->getURL()),self::ApiPrefix) !== false;
    }

    /**
     * @return bool
     */
    protected function authorize()
    {
        return $this->checkOwnAjaxRequest($this->getRequest());
    }


    private static $allowed_actions = array
    (
        'getComponentsbyRelease',
        'getReleases',
        'getContributors',
        'ingestContributors',
    );

    static $url_handlers = array
    (
        'GET releases/$RELEASE_ID/components'      => 'getComponentsbyRelease',
        'GET releases'                             => 'getReleases',
        'GET contributors'                         => 'getContributors',
        'POST contributors/ingest'                 => 'ingestContributors',
    );

    public function getComponentsbyRelease(SS_HTTPRequest $request)
    {
        $release_id = intval($request->param('RELEASE_ID'));
        $term       = Convert::raw2sql($request->getVar('term'));
        $adoption   = intval(Convert::raw2sql($request->getVar('adoption')));
        $maturity   = intval(Convert::raw2sql($request->getVar('maturity')));
        $age        = intval(Convert::raw2sql($request->getVar('age')));
        $sort       = Convert::raw2sql($request->getVar('sort'));
        $sort_dir   = '';
        if(!empty($sort))
        {
            $sort = explode(':',$sort);
            $sort_dir = $sort[1];
            $sort     = $sort[0];
        }

        $release = OpenStackRelease::get()->byID($release_id);
        if(is_null($release))
            return $this->notFound();

        $components = $this->manager->getComponentsGroupedByCategory
        (
            $release,
            $term,
            $adoption,
            $maturity,
            $age,
            $sort,
            $sort_dir
        );

        return $this->ok($components);

    }

    public function getReleases(SS_HTTPRequest $request)
    {
        $releases = OpenStackRelease::get()->toNestedArray();

        return $this->ok($releases);

    }

    public function getContributors(SS_HTTPRequest $request)
    {
        $releaseIds = Convert::raw2sql($request->getVar('releaseIds'));
        $page       = Convert::raw2sql($request->getVar('page'));
        $sort       = Convert::raw2sql($request->getVar('order'));
        $sort_dir   = Convert::raw2sql($request->getVar('orderDir'));
        $sort_dir   = ($sort_dir == 1) ? 'ASC' : 'DESC';
        $offset     = ($page * 10) - 10;

        switch($sort) {
            case 'last_name':
                $sort = 'LastName';
                break;
            case 'first_name':
                $sort = 'FirstName';
                break;
            case 'release':
                $sort = 'OpenStackRelease.Name';
                break;
        }

        $contributors = ReleaseCycleContributor::get();

        if ($releaseIds) {
            $contributors = $contributors->where("ReleaseID IN ({$releaseIds})");
        }

        $count = $contributors->count();
        $totalPages = ($count) ? floor($count/10) : 1;
        $contributors = $contributors
            ->leftJoin('OpenStackRelease', 'ReleaseID = OpenStackRelease.ID')
            ->sort($sort, $sort_dir)
            ->limit(10, $offset);

        $result = [];

        foreach ($contributors as $contributor) {
            $result[] = $contributor->toJsonReady();
        }

        return $this->ok(['data' => $result, 'total' => $count, 'totalPages' => $totalPages]);

    }

    public function ingestContributors(SS_HTTPRequest $request)
    {
        try {
            $files = FileUtils::reArrayFiles($_FILES['file']);

            foreach ($files as $file) {
                switch ($file['error']) {
                    case UPLOAD_ERR_OK:
                        $this->manager->ingestContributors($file);
                        break;
                    case UPLOAD_ERR_NO_FILE:
                        throw new RuntimeException('No file sent.');
                    case UPLOAD_ERR_INI_SIZE:
                    case UPLOAD_ERR_FORM_SIZE:
                        throw new RuntimeException('Exceeded filesize limit.');
                    default:
                        throw new RuntimeException('Unknown errors.');
                }
            }
        } catch(EntityValidationException $ex1) {
            SS_Log::log($ex1->getMessage(), SS_Log::WARN);
            return $this->validationError($ex1->getMessages());
        } catch(NotFoundEntityException $ex2) {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessage());
        } catch(Exception $ex) {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
            die(print_r($ex));
            return $this->serverError();
        }

        $contributors = ReleaseCycleContributor::get();
        $count = $contributors->count();
        $totalPages = ($count) ? floor($count/10) : 1;
        $contributors = $contributors->sort('LastName')->limit(10);


        $result = [];
        foreach ($contributors as $contributor) {
            $result[] = $contributor->toJsonReady();
        }

        return $this->ok(['data' => $result, 'total' => $count, 'totalPages' => $totalPages]);


    }

}
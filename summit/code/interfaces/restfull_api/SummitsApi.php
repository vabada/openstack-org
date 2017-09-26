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
use Openstack\Annotations as CustomAnnotation;
/**
 * Class SummitsApi
 */
final class SummitsApi extends AbstractRestfulJsonApi
{

    const ApiPrefix = 'api/v1/summits';

    /**
     * @var ISummitPackagePurchaseOrderManager
     */
    private $package_purchase_order_manager;

    /**
     * @var ISummitRepository
     */
    private $summit_repository;

    /**
     * @var ISummitManager
     */
    private $summit_manager;

    public function __construct(
        ISummitPackagePurchaseOrderManager $package_purchase_order_manager,
        ISummitRepository $summit_repository,
        ISummitManager $summit_manager
    ) {
        parent::__construct();

        $this->package_purchase_order_manager = $package_purchase_order_manager;
        $this->summit_repository              = $summit_repository;
        $this->summit_manager                 = $summit_manager;

        $this_var = $this;

        $this->addBeforeFilter('approvePurchaseOrder', 'check_approve', function ($request) use ($this_var) {
            if (!$this_var->checkAdminPermissions($request)) {
                return $this_var->permissionFailure();
            }
        });

        $this->addBeforeFilter('rejectPurchaseOrder', 'check_reject', function ($request) use ($this_var) {
            if (!$this_var->checkAdminPermissions($request)) {
                return $this_var->permissionFailure();
            }
        });

        // summit front end admin permissions ...

        $this->addBeforeFilter('getCompanies', 'check_reject', function ($request) use ($this_var) {
            if (!Permission::check("ADMIN_SUMMIT_APP_FRONTEND_ADMIN")) {
                return $this_var->permissionFailure();
            }
        });

        $this->addBeforeFilter('getSponsors', 'check_reject', function ($request) use ($this_var) {
            if (!Permission::check("ADMIN_SUMMIT_APP_FRONTEND_ADMIN")) {
                return $this_var->permissionFailure();
            }
        });

        $this->addBeforeFilter('getTags', 'check_reject', function ($request) use ($this_var) {
            if (!Permission::check("ADMIN_SUMMIT_APP_FRONTEND_ADMIN")) {
                return $this_var->permissionFailure();
            }
        });

    }

    public function checkAdminPermissions($request)
    {
        return Permission::check("SANGRIA_ACCESS");
    }

    protected function isApiCall()
    {
        $request = $this->getRequest();
        if (is_null($request)) {
            return false;
        }

        return strpos(strtolower($request->getURL()), self::ApiPrefix) !== false;
    }

    /**
     * @return bool
     */
    protected function authorize()
    {
        return true;
    }

    protected function authenticate()
    {
        return true;
    }

    static $url_handlers = array(
        'GET $SUMMIT_ID/tags'                                        => 'getTags',
        'GET $SUMMIT_ID/companies'                                   => 'getCompanies',
        'GET $SUMMIT_ID/sponsors'                                    => 'getSponsors',
        'GET $SUMMIT_ID/categories/$CAT_ID/extra_questions/$PRES_ID' => 'getExtraQuestionsForPresentation',
        'GET $SUMMIT_ID/category_groups/$GROUP_ID/categories'        => 'getCategoriesByGroup',
        '$SUMMIT_ID/add-ons'                                         => 'handleAddOns',
        '$SUMMIT_ID/packages'                                        => 'handlePackages',
        '$SUMMIT_ID/speakers'                                        => 'handleSpeakers',
        '$SUMMIT_ID/schedule'                                        => 'handleSchedule',
        '$SUMMIT_ID/events'                                          => 'handleEvents',
        '$SUMMIT_ID/attendees'                                       => 'handleAttendees',
        '$SUMMIT_ID/members'                                         => 'handleMembers',
        '$SUMMIT_ID/reports'                                         => 'handleReports',
        '$SUMMIT_ID/locations'                                       => 'handleLocations',
        '$SUMMIT_ID/registration-codes'                              => 'handleRegistrationCodes',
        '$SUMMIT_ID/tickets'                                         => 'handleTickets',
        'PUT packages/purchase-orders/$PURCHASE_ORDER_ID/approve'    => 'approvePurchaseOrder',
        'PUT packages/purchase-orders/$PURCHASE_ORDER_ID/reject'     => 'rejectPurchaseOrder',
        'PUT $SUMMIT_ID/dates'                                       => 'updateSummitDates',
        'PUT $SUMMIT_ID'                                             => 'updateSummit',
    );

    static $allowed_actions = array(
        'approvePurchaseOrder',
        'rejectPurchaseOrder',
        'handleSchedule',
        'handleEvents',
        'handleAttendees',
        'handleMembers',
        'handleReports',
        'getTags',
        'getSponsors',
        'getCompanies',
        'handleSpeakers',
        'handleLocations',
        'handleRegistrationCodes',
        'getCategoriesByGroup',
        'getExtraQuestionsForPresentation',
        'updateSummit',
        'updateSummitDates',
        'handleAddOns',
        'handlePackages',
        'handleTickets'
    );

    // this is called when typing a tag name to add as a tag on edit event
    public function getTags(SS_HTTPRequest $request){
        try
        {
            $query_string = $request->getVars();
            $query        = Convert::raw2sql($query_string['query']);
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = $this->summit_repository->getById($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $tags = DB::query("SELECT T.ID AS id, T.Tag AS name FROM Tag AS T
                                    WHERE T.Tag LIKE '{$query}%'
                                    ORDER BY T.Tag LIMIT 10;");

            $data = array();
            foreach ($tags as $tag) {
                $data[] = $tag;
            }

            return $this->ok($data);
        }
        catch(NotFoundEntityException $ex2)
        {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessage());
        }
        catch(Exception $ex)
        {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
            return $this->serverError();
        }
    }

    // this is called when typing a sponsor name to add as a tag on edit event
    public function getSponsors(SS_HTTPRequest $request){
        try
        {
            $query_string = $request->getVars();
            $query        = Convert::raw2sql($query_string['query']);
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = $this->summit_repository->getById($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $sponsors = DB::query("SELECT C.ID AS id, C.Name AS name FROM Company AS C
                                    WHERE C.Name LIKE '{$query}%'
                                    ORDER BY C.Name LIMIT 10;");

            $data = array();
            foreach ($sponsors as $sponsor) {
                $data[] = $sponsor;
            }

            return $this->ok($data);
        }
        catch(NotFoundEntityException $ex2)
        {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessage());
        }
        catch(Exception $ex)
        {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
            return $this->serverError();
        }
    }

    public function getCompanies(SS_HTTPRequest $request){
        try
        {
            $query_string = $request->getVars();
            $query        = Convert::raw2sql($query_string['query']);
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = $this->summit_repository->getById($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $orgs = DB::query(" SELECT O.ID AS id, O.Name AS name FROM Org AS O
                                WHERE O.Name LIKE '{$query}%'
                                ORDER BY O.Name LIMIT 10;");

            $data = array();
            foreach ($orgs as $org) {

                $data[] = $org;
            }

           return $this->ok($data);
        }
        catch(NotFoundEntityException $ex2)
        {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessage());
        }
        catch(Exception $ex)
        {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
            return $this->serverError();
        }
    }

    public function approvePurchaseOrder()
    {
        try {
            $order_id = (int)$this->request->param('PURCHASE_ORDER_ID');
            $this->package_purchase_order_manager->approvePurchaseOrder($order_id,
                new ApprovedPurchaseOrderEmailMessageSender);

            return $this->updated();
        } catch (NotFoundEntityException $ex1) {
            SS_Log::log($ex1, SS_Log::ERR);

            return $this->notFound($ex1->getMessage());
        } catch (EntityValidationException $ex2) {
            SS_Log::log($ex2, SS_Log::NOTICE);

            return $this->validationError($ex2->getMessages());
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::ERR);

            return $this->serverError();
        }
    }

    public function rejectPurchaseOrder()
    {
        try {
            $order_id = (int)$this->request->param('PURCHASE_ORDER_ID');
            $this->package_purchase_order_manager->rejectPurchaseOrder($order_id,
                new RejectedPurchaseOrderEmailMessageSender);

            return $this->updated();
        } catch (NotFoundEntityException $ex1) {
            SS_Log::log($ex1, SS_Log::ERR);

            return $this->notFound($ex1->getMessage());
        } catch (EntityValidationException $ex2) {
            SS_Log::log($ex2, SS_Log::NOTICE);

            return $this->validationError($ex2->getMessages());
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::ERR);

            return $this->serverError();
        }
    }

    public function handleSchedule(SS_HTTPRequest $request)
    {
        $api = SummitAppScheduleApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleEvents(SS_HTTPRequest $request)
    {
        $api = SummitAppEventsApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleAttendees(SS_HTTPRequest $request)
    {
        $api = SummitAppAttendeesApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleMembers(SS_HTTPRequest $request)
    {
        $api = SummitAppMembersApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleReports(SS_HTTPRequest $request)
    {
        $api = SummitAppReportsApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleSpeakers(SS_HTTPRequest $request)
    {
        $api = SummitAppSpeakersApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleLocations(SS_HTTPRequest $request)
    {
        $api = SummitAppLocationsApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleRegistrationCodes(SS_HTTPRequest $request)
    {
        $api = SummitAppRegistrationCodesApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleAddOns(SS_HTTPRequest $request)
    {
        $api = SummitAppAddOnsApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handlePackages(SS_HTTPRequest $request)
    {
        $api = SummitAppPackagesApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function handleTickets(SS_HTTPRequest $request)
    {
        $api = SummitAppTicketsApi::create();
        return $api->handleRequest($request, DataModel::inst());
    }

    public function getCategoriesByGroup(SS_HTTPRequest $request){
        try
        {
            $group_id     = intval($request->param('GROUP_ID'));
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = $this->summit_repository->getById($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $category_group = PresentationCategoryGroup::get()->byID($group_id);
            if ($category_group->is_a('PrivatePresentationCategoryGroup'))
                $categories = $category_group->Categories()->sort('Title');
            else
                $categories = $category_group->Categories()->filter('VotingVisible',1)->sort('Title');

            $category_map = array();
            foreach ($categories as $category) {
                $category_map[] = array('ID' => $category->ID, 'Html' => $category->FormattedTitleAndDescription);
            }

            return $this->ok($category_map);
        }
        catch(NotFoundEntityException $ex2)
        {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessage());
        }
        catch(Exception $ex)
        {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
            return $this->serverError();
        }
    }

    public function getExtraQuestionsForPresentation(SS_HTTPRequest $request){
        try
        {
            $category_id      = intval($request->param('CAT_ID'));
            $presentation_id  = intval($request->param('PRES_ID'));
            $presentation     = null;
            $summit_id        = intval($request->param('SUMMIT_ID'));
            $summit           = $this->summit_repository->getById($summit_id);

            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            if ($presentation_id) {
                $presentation = Presentation::get_by_id('Presentation', $presentation_id);
            }

            $category        = PresentationCategory::get_by_id('PresentationCategory', $category_id);
            $extra_questions = $category->ExtraQuestions();
            $question_map    = array();

            foreach ($extra_questions as $q) {
                //builder
                $type = $q->Type();
                $builder_class = $type.'QuestionTemplateUIBuilder';
                $builder = Injector::inst()->create($builder_class);
                $answer  = ($presentation) ? $presentation->findAnswerByQuestion($q) : null;
                $field   = $builder->build($q, $answer);

                $field->addHolderClass('track-question');
                $question_map[] = [
                    'Name'        => $q->Name,
                    'InsertAfter' => $q->AfterQuestion,
                    'Html'        => strval($field->FieldHolder()),
                    'Type'        => $q->Type()
                ];
            }

            return $this->ok($question_map);
        }
        catch(NotFoundEntityException $ex2)
        {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessage());
        }
        catch(Exception $ex)
        {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
            return $ex->getMessage();
        }
    }

    public function updateSummit(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));

            if(!$this->isJson()) return $this->validationError(array('invalid content type!'));
            $data        = $this->getJsonRequest();

            $summit = $this->summit_manager->updateSummit($data['summit']);
            return $this->updated();

        } catch (NotFoundEntityException $ex1) {
            SS_Log::log($ex1, SS_Log::ERR);
            return $this->notFound($ex1->getMessage());
        } catch (EntityValidationException $ex2) {
            SS_Log::log($ex2, SS_Log::NOTICE);
            return $this->validationError($ex2->getMessages());
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::ERR);
            return $this->serverError();
        }
    }

    public function updateSummitDates(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));

            if(!$this->isJson()) return $this->validationError(array('invalid content type!'));
            $data        = $this->getJsonRequest();

            $summit = $this->summit_manager->updateSummitDates($summit_id, $data['summit']);
            return $this->updated();

        } catch (NotFoundEntityException $ex1) {
            SS_Log::log($ex1, SS_Log::ERR);
            return $this->notFound($ex1->getMessage());
        } catch (EntityValidationException $ex2) {
            SS_Log::log($ex2, SS_Log::NOTICE);
            return $this->validationError($ex2->getMessage());
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::ERR);
            return $this->serverError();
        }
    }

}
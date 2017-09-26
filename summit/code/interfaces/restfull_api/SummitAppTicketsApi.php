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

/**
 * Class SummitAppTicketsApi
 */
class SummitAppTicketsApi extends AbstractRestfulJsonApi {

    /**
     * @var ISummitTicketManager
     */
    private $ticket_manager;

    public function __construct
    (
        ISummitTicketManager $ticket_manager
    )
    {
        parent::__construct();
        $this->ticket_manager    = $ticket_manager;
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
        'GET types'                => 'getTicketTypesBySummit',
        'POST types'               => 'addTicketType',
        'PUT types/$TYPE_ID!'      => 'updateTicketType',
        'DELETE types/$TYPE_ID!'   => 'deleteTicketType',
    );

    static $allowed_actions = array(
        'getTicketTypesBySummit',
        'addTicketType',
        'updateTicketType',
        'deleteTicketType',
    );

    public function getTicketTypesBySummit(SS_HTTPRequest $request)
    {
        try {
            $summit_id = (int)$request->param('SUMMIT_ID');
            $summit = Summit::get()->byID($summit_id);

            $res = array();
            foreach ($summit->SummitTicketTypes() as $ticket_type) {
                array_push($res, [
                    'id'            => $ticket_type->ID,
                    'external_id'   => $ticket_type->ExternalId,
                    'name'          => $ticket_type->Name,
                    'description'   => $ticket_type->Description,
                    'is_edit'       => false
                ]);
            }

            return $this->ok($res);
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::WARN);

            return $this->serverError();
        }
    }

    public function deleteTicketType(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $ticket_type_id   = intval($request->param('TYPE_ID'));

            $summit       = Summit::get()->byID($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $this->ticket_manager->deleteTicketType($ticket_type_id);

            return $this->ok($ticket_type_id);

        } catch (EntityValidationException $ex1) {
            SS_Log::log($ex1->getMessage(), SS_Log::WARN);
            return $this->validationError($ex1->getMessages());
        } catch (NotFoundEntityException $ex2) {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessages());
        } catch (Exception $ex3) {
            SS_Log::log($ex3, SS_Log::WARN);
            return $this->serverError();
        }
    }

    public function updateTicketType(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = Summit::get()->byID($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $data = $this->getJsonRequest();

            $this->ticket_manager->updateTicketType($data['ticket_type']);

            return $this->ok();

        } catch (EntityValidationException $ex1) {
            SS_Log::log($ex1->getMessage(), SS_Log::WARN);
            return $this->validationError($ex1->getMessages());
        } catch (NotFoundEntityException $ex2) {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessages());
        } catch (Exception $ex3) {
            SS_Log::log($ex3, SS_Log::WARN);
            return $this->serverError();
        }
    }

    public function addTicketType(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = Summit::get()->byID($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $data = $this->getJsonRequest();

            $new_ticket_type = $this->ticket_manager->addTicketType($data['ticket_type'], $summit_id);

            $res = [
                'id'            => $new_ticket_type->ID,
                'external_id'   => $new_ticket_type->ExternalId,
                'name'          => $new_ticket_type->Name,
                'description'   => $new_ticket_type->Description,
                'is_edit'       => false
            ];

            return $this->ok($res);

        } catch (EntityValidationException $ex1) {
            SS_Log::log($ex1->getMessage(), SS_Log::WARN);
            return $this->validationError($ex1->getMessages());
        } catch (NotFoundEntityException $ex2) {
            SS_Log::log($ex2->getMessage(), SS_Log::WARN);
            return $this->notFound($ex2->getMessages());
        } catch (Exception $ex3) {
            SS_Log::log($ex3, SS_Log::WARN);
            return $this->serverError();
        }
    }

}
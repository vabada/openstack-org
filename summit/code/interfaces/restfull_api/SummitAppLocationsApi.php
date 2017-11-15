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
final class SummitAppLocationsApi extends AbstractRestfulJsonApi
{
    /**
     * @var IEntityRepository
     */
    private $summit_repository;

    /**
     * @var ISummitLocationManager
     */
    private $location_manager;

    public function __construct
    (
        ISummitRepository $summit_repository,
        ISummitLocationManager $location_manager
    )
    {
        parent::__construct();
        $this->summit_repository = $summit_repository;
        $this->location_manager = $location_manager;
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
        if(!Permission::check('ADMIN_SUMMIT_APP_FRONTEND_ADMIN')) return false;
        return $this->checkOwnAjaxRequest();
    }

    protected function authenticate() {
        return true;
    }

    static $url_handlers = array(
        'GET day'               => 'getLocationsByDay',
        'GET '                  => 'getLocations',
        'POST '                 => 'addLocation',
        'PUT reorder'           => 'updateLocationOrder',
        'PUT $LOC_ID!'          => 'updateLocation',
        'DELETE $LOC_ID!'       => 'deleteLocation',
    );

    static $allowed_actions = array(
        'getLocationsByDay',
        'getLocations',
        'updateLocationOrder',
        'deleteLocation',
        'updateLocation',
        'addLocation',
    );

    public function getLocationsByDay(SS_HTTPRequest $request) {
        try {
            $query_string = $request->getVars();
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $day          = strtolower(Convert::raw2sql($query_string['day']));
            $summit       = $this->summit_repository->getById($summit_id);

            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            if(!$summit->isDayBelongs($day))
                throw new EntityValidationException
                (
                    sprintf('day %s does not belongs to summit id %s', $day, $summit_id)
                );

            $response = array
            (
                'day'       => $day,
                'summit_id' => intval($summit_id),
                'locations' => array()
            );

            foreach($summit->getTopVenues() as $venue)
            {
                $class_name = $venue->ClassName;
                if($class_name != 'SummitVenue' && $class_name != 'SummitExternalLocation' && $class_name != 'SummitHotel') continue;
                $count = $summit->getPublishedEventsCountByDateLocation($day, $venue);
                array_push($response['locations'], array('id' => intval($venue->ID), 'events_count' => intval($count)));
                if($class_name == 'SummitVenue'){
                    foreach($venue->Rooms() as $room){
                        $count = $summit->getPublishedEventsCountByDateLocation($day, $room);
                        array_push($response['locations'], array('id' => intval($room->ID), 'events_count' => intval($count)));
                    }
                }
            }
            return $this->ok($response);
        }
        catch(Exception $ex)
        {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
            return $this->serverError();
        }
    }

    public function getLocations(SS_HTTPRequest $request)
    {
        try {
            $summit_id = (int)$request->param('SUMMIT_ID');
            $list = SummitAbstractLocation::get()->filter('SummitID', $summit_id)->sort('Order');
            $res = array();
            foreach ($list as $location) {
                array_push($res, SummitLocationAssembler::toArray($location));
            }

            return $this->ok($res);
        } catch (Exception $ex) {
            SS_Log::log($ex, SS_Log::WARN);

            return $this->serverError();
        }
    }

    public function updateLocationOrder(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = Summit::get()->byID($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $data = $this->getJsonRequest();
            $location_ids = explode(',',$data['ids']);

            $locations = $this->location_manager->updateLocationOrder($location_ids);

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

    public function deleteLocation(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $location_id   = intval($request->param('LOC_ID'));

            $summit       = Summit::get()->byID($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $location       = SummitAbstractLocation::get()->byID($location_id);
            if(is_null($location)) throw new NotFoundEntityException('SummitLocation', sprintf(' id %s', $location_id));

            $this->location_manager->deleteLocation($location);

            return $this->ok($location_id);

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

    public function updateLocation(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = Summit::get()->byID($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $data = $this->getJsonRequest();

            $this->location_manager->updateLocation($data['item']);

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

    public function addLocation(SS_HTTPRequest $request)
    {
        try {
            $summit_id    = intval($request->param('SUMMIT_ID'));
            $summit       = Summit::get()->byID($summit_id);
            if(is_null($summit)) throw new NotFoundEntityException('Summit', sprintf(' id %s', $summit_id));

            $data = $this->getJsonRequest();

            $this->location_manager->addLocation($data['item'], $summit_id);

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
}
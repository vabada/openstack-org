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
final class SummitLocationManager implements ISummitLocationManager
{
    /**
     * @var IEntityRepository
     */
    private $location_repository;

    /**
     * @var ITransactionManager
     */
    private $tx_service;

    /**
     * SummitSponsorshipManager constructor.
     * @param IEntityRepository $location_repository
     * @param ITransactionManager $tx_service
     */
    public function __construct
    (
        IEntityRepository $location_repository,
        ITransactionManager $tx_service
    )
    {
        $this->location_repository  = $location_repository;
        $this->tx_service           = $tx_service;
    }

    /**
     * @param $location
     * @return void
     */
    public function deleteLocation($location)
    {
        $repository = $this->location_repository;

        $this->tx_service->transaction(function() use ($location, $repository){
            $repository->delete($location);
        });
    }

    /**
     * @param array $location_ids
     * @return array SummitAbstractLocation
     */
    public function updateLocationOrder(array $location_ids)
    {

        return $this->tx_service->transaction(function () use ($location_ids) {
            $order = 0;
            $location_list = [];

            foreach ($location_ids as $location_id) {
                $location = SummitAbstractLocation::get()->byID($location_id);
                if ($location) {
                    $location->Order = $order;
                    $location->write();
                    $location_list[] = $location;
                }

                $order++;
            }

            return $location_list;

        });
    }

    /**
     * @param array $location_data
     * @return SummitAbstractLocation
     */
    public function updateLocation(array $location_data)
    {

        return $this->tx_service->transaction(function () use ($location_data) {
            if(!isset($location_data['id'])) throw new EntityValidationException('missing required param: id');
            $location_id = intval($location_data['id']);
            $location = SummitAbstractLocation::get()->byID($location_id);

            if(is_null($location))
                throw new NotFoundEntityException('Summit Location', sprintf('id %s', $location_id));

            foreach ($location_data as $key => $value) {
                $location_data[$key] = Convert::raw2sql($value);
            }

            $location->Title = $location_data['title'];
            $location->SubTitle = $location_data['subtitle'];
            $location->Cost = $location_data['cost'];
            $location->ShowQuantity = $location_data['show_qty'];
            $location->CurrentlyAvailable = $location_data['available'];
            $location->MaxAvailable = $location_data['max_available'];

            $location->write();

            return $location;

        });
    }

    /**
     * @param array $location_data
     * @return SummitAbstractLocation
     */
    public function addLocation(array $location_data, $summit_id)
    {

        return $this->tx_service->transaction(function () use ($location_data, $summit_id) {
            $location = new SummitAbstractLocation();

            foreach ($location_data as $key => $value) {
                $location_data[$key] = Convert::raw2sql($value);
            }

            $location->SummitID = $summit_id;
            $location->Title = isset($location_data['title']) ? $location_data['title'] : '';
            $location->SubTitle = isset($location_data['subtitle']) ? $location_data['subtitle'] : '';
            $location->Cost = isset($location_data['cost']) ? $location_data['cost'] : 0;
            $location->ShowQuantity = isset($location_data['show_qty']) ? $location_data['show_qty'] : 0;
            $location->CurrentlyAvailable = isset($location_data['available']) ? $location_data['available'] : 0;
            $location->MaxAvailable = isset($location_data['max_available']) ? $location_data['max_available'] : 0;

            $location->write();

            return $location;

        });
    }

}
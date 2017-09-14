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
final class SummitSponsorshipManager implements ISummitSponsorshipManager
{
    /**
     * @var IEntityRepository
     */
    private $sponsorship_package_repository;

    /**
     * @var IEntityRepository
     */
    private $sponsorship_add_on_repository;

    /**
     * @var ITransactionManager
     */
    private $tx_service;

    /**
     * SummitSponsorshipManager constructor.
     * @param IEntityRepository $sponsorship_package_repository
     * @param IEntityRepository $sponsorship_add_on_repository
     * @param ITransactionManager $tx_service
     */
    public function __construct
    (
        IEntityRepository $sponsorship_package_repository,
        IEntityRepository $sponsorship_add_on_repository,
        ITransactionManager $tx_service
    )
    {
        $this->sponsorship_package_repository = $sponsorship_package_repository;
        $this->sponsorship_add_on_repository  = $sponsorship_add_on_repository;
        $this->tx_service                     = $tx_service;
    }

    /**
     * @param $package
     * @return void
     */
    public function deletePackage($package)
    {
        $repository = $this->sponsorship_package_repository;

        $this->tx_service->transaction(function() use ($package, $repository){
            $repository->delete($package);
        });
    }

    /**
     * @param array $package_ids
     * @return array ISummitPackage
     */
    public function updatePackageOrder(array $package_ids)
    {

        return $this->tx_service->transaction(function () use ($package_ids) {
            $order = 0;
            $package_list = [];

            foreach ($package_ids as $package_id) {
                $package = SummitPackage::get()->byID($package_id);
                if ($package) {
                    $package->Order = $order;
                    $package->write();
                    $package_list[] = $package;
                }

                $order++;
            }

            return $package_list;

        });
    }

    /**
     * @param array $package_data
     * @return ISummitPackage
     */
    public function updatePackage(array $package_data)
    {

        return $this->tx_service->transaction(function () use ($package_data) {
            if(!isset($package_data['id'])) throw new EntityValidationException('missing required param: id');
            $package_id = intval($package_data['id']);
            $package = SummitPackage::get()->byID($package_id);

            if(is_null($package))
                throw new NotFoundEntityException('Summit Package', sprintf('id %s', $package_id));

            foreach ($package_data as $key => $value) {
                $package_data[$key] = Convert::raw2sql($value);
            }

            $package->Title = $package_data['title'];
            $package->SubTitle = $package_data['subtitle'];
            $package->Cost = $package_data['cost'];
            $package->ShowQuantity = $package_data['show_qty'];
            $package->CurrentlyAvailable = $package_data['available'];
            $package->MaxAvailable = $package_data['max_available'];

            $package->write();

            return $package;

        });
    }

    /**
     * @param array $package_data
     * @return ISummitPackage
     */
    public function addPackage(array $package_data, $summit_id)
    {

        return $this->tx_service->transaction(function () use ($package_data, $summit_id) {
            $package = new SummitPackage();

            foreach ($package_data as $key => $value) {
                $package_data[$key] = Convert::raw2sql($value);
            }

            $package->SummitID = $summit_id;
            $package->Title = isset($package_data['title']) ? $package_data['title'] : '';
            $package->SubTitle = isset($package_data['subtitle']) ? $package_data['subtitle'] : '';
            $package->Cost = isset($package_data['cost']) ? $package_data['cost'] : 0;
            $package->ShowQuantity = isset($package_data['show_qty']) ? $package_data['show_qty'] : 0;
            $package->CurrentlyAvailable = isset($package_data['available']) ? $package_data['available'] : 0;
            $package->MaxAvailable = isset($package_data['max_available']) ? $package_data['max_available'] : 0;

            $package->write();

            return $package;

        });
    }

}
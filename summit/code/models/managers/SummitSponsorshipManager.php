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




}
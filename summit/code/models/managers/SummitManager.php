<?php
/**
 * Copyright 2014 Openstack Foundation
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
 * Class SummitManager
 */
final class SummitManager
    implements ISummitManager {

	/**
	 * @var IEntityRepository
	 */
	private $summit_repository;
    /**
     * @var ISummitFactory
     */
    private $summit_factory;

    /**
	 * @var ITransactionManager
	 */
	private $tx_manager;

	public function __construct(ISummitRepository $summit_repository,
                                ISummitFactory $summit_factory,
                                ITransactionManager $tx_manager){
		$this->summit_repository     = $summit_repository;
		$this->summit_factory        = $summit_factory;
        $this->tx_manager            = $tx_manager;
	}


    /**
     * @param $id
     * @return ISummit
     */
    public function deleteSummit($id){
        $repository = $this->summit_repository;

        $summit =  $this->tx_manager->transaction(function() use ($id, $repository){
            $summit = $repository->getById($id);
            if(!$summit)
                throw new NotFoundEntityException('Summit',sprintf('id %s',$id ));

            $repository->delete($summit);
        });
    }

    /**
     * @param $summit_data
     * @return ISummit
     */
    public function updateSummit($summit_data){
        $repository = $this->summit_repository;
        $factory    = $this->summit_factory;

        $summit =  $this->tx_manager->transaction(function() use ($summit_data, $repository, $factory){
            $summit = $repository->getById($summit_data['id']);
            if(!$summit)
                throw new NotFoundEntityException('Summit',sprintf('id %s', $summit['id']));

            $factory->update($summit, $summit_data);
            $factory->updateWifi($summit, $summit_data['wifis']);
            $summit->write();
            return $summit;
        });

        return $summit;
    }

    /**
     * @param $summit_id
     * @param $summit_dates
     * @return ISummit
     */
    public function updateSummitDates($summit_id, $summit_dates){
        $repository = $this->summit_repository;
        $factory    = $this->summit_factory;

        $summit =  $this->tx_manager->transaction(function() use ($summit_id, $summit_dates, $repository, $factory){
            $summit = $repository->getById($summit_id);
            if(!$summit)
                throw new NotFoundEntityException('Summit',sprintf('id %s', $summit['id']));

            $factory->updateDates($summit, $summit_dates);
            $summit->write();
            return $summit;
        });

        return $summit;
    }

} 
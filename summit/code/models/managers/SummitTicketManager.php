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
final class SummitTicketManager implements ISummitTicketManager
{
    /**
     * @var ITransactionManager
     */
    private $tx_service;

    /**
     * SummitSponsorshipManager constructor.
     * @param ITransactionManager $tx_service
     */
    public function __construct
    (
        ITransactionManager $tx_service
    )
    {
        $this->tx_service                     = $tx_service;
    }

    /**
     * @param $ticket_type_id
     * @return void
     */
    public function deleteTicketType($ticket_type_id)
    {
        $this->tx_service->transaction(function() use ($ticket_type_id){
            $ticket_type       = SummitTicketType::get()->byID($ticket_type_id);
            if(is_null($ticket_type)) throw new NotFoundEntityException('SummitTicketType', sprintf(' id %s', $ticket_type_id));

            $ticket_type->delete();
        });
    }

    /**
     * @param array $ticket_type_data
     * @return ISummitTicketType
     */
    public function updateTicketType(array $ticket_type_data)
    {

        return $this->tx_service->transaction(function () use ($ticket_type_data) {
            if(!isset($ticket_type_data['id'])) throw new EntityValidationException('missing required param: id');
            $ticket_type_id = intval($ticket_type_data['id']);
            $ticket_type = SummitTicketType::get()->byID($ticket_type_id);

            if(is_null($ticket_type))
                throw new NotFoundEntityException('Summit Ticket Type', sprintf('id %s', $ticket_type_id));

            foreach ($ticket_type_data as $key => $value) {
                $ticket_type_data[$key] = Convert::raw2sql($value);
            }

            $ticket_type->ExternalId = $ticket_type_data['external_id'];
            $ticket_type->Name = $ticket_type_data['name'];
            //$ticket_type->Description = $ticket_type_data['description'];

            $ticket_type->write();

            return $ticket_type;

        });
    }

    /**
     * @param array $ticket_type_data
     * @return ISummitTicketType
     */
    public function addTicketType(array $ticket_type_data, $summit_id)
    {

        return $this->tx_service->transaction(function () use ($ticket_type_data, $summit_id) {
            $ticket_type = new SummitTicketType();

            foreach ($ticket_type_data as $key => $value) {
                $ticket_type_data[$key] = Convert::raw2sql($value);
            }

            $ticket_type->SummitID = $summit_id;
            $ticket_type->ExternalId = isset($ticket_type_data['external_id']) ? $ticket_type_data['external_id'] : 0;
            $ticket_type->Name = isset($ticket_type_data['name']) ? $ticket_type_data['name'] : '';
            $ticket_type->Description = isset($ticket_type_data['description']) ? $ticket_type_data['description'] : '';

            $ticket_type->write();

            return $ticket_type;

        });
    }

}
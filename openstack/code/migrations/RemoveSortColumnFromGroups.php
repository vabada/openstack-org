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
final class RemoveSortColumnFromGroups extends AbstractDBMigrationTask
{
    protected $title = "Remove Sort Column From Groups";

    protected $description = "removing SortOrder column as its been replaced by SortIndex due to ambiguous error on sort";

    function doUp()
    {
        global $database;

        // copy order before removing column
        $sql = <<< SQL
		UPDATE Group_Members SET SortIndex = SortOrder;
SQL;

        DB::query($sql);


        if (DBSchema::existsColumn($database,'Group_Members','SortOrder')) {
            DBSchema::dropColumn($database,'Group_Members','SortOrder');
        }

    }

    function doDown()
    {

    }
}

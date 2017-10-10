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

class SurveyAnswer extends DataObject implements ISurveyAnswer
{

    static $db = [
        'Value' => 'Text',
    ];

    static $indexes = [

    ];

    static $has_one = [
        'Question'  => 'SurveyQuestionTemplate',
        'Step'      => 'SurveyStep',
        'UpdatedBy' => 'Member'
    ];

    static $many_many = [
        'Tags' => 'SurveyAnswerTag',
    ];

    static $has_many = [

    ];

    private static $defaults = [];

    /**
     * @return int
     */
    public function getIdentifier()
    {
        return (int)$this->getField('ID');
    }

    /**
     * @return string
     */
    public function value()
    {
        return $this->getField('Value');
    }

    /**
     * @return ISurveyQuestionTemplate
     */
    public function question()
    {
       return $this->getComponent('Question');
    }

    /**
     * @return ISurveyStep
     */
    public function step()
    {
        return $this->getComponent('Step');
    }

    /**
     * @return string
     */
    public function getFormattedAnswer()
    {
        $res      = $this->Value;
        $question = $this->Question();

        if($question instanceof SurveyMultiValueQuestionTemplate)
        {
            $res = explode(',', $res);
            $aux = '';

            foreach($res as $v){
                if($question instanceof SurveyDoubleEntryTableQuestionTemplate)
                {
                    $tuple = explode(':', $v);
                    $value1 = $question->getRowById(intval($tuple[0]));
                    $value2 = $question->getColumnById(intval($tuple[1]));
                    if(!is_null($value1) && !is_null($value2))
                        $aux .= sprintf("%s (%s),", $value1->label(), $value2->label());
                }
                else
                {
                    $value = $question->getValueById($v);
                    if (is_null($value))
                        continue;

                    $aux .= $value->label() . ',';
                }
            }
            $res = trim($aux, ',');
        }

        return $res;
    }
}
<div class="col-md-4 "style="height:450px;" data-question-id="{$Top.QuestionID}">
    <h3>$Label</h3>
    <p>N =  $Top.ParentPage.SurveyBuilderSurveyCountByQuestion($Top.QuestionID)</p>
    <table class="table">
        <tbody style="display: block; height: 325px; overflow-y: auto">
            <% loop getFormattedValues %>
            <tr>
                <td>
                    <% if $Top.ParentPage.IsQuestionOnFiltering($Up.ID) %>
                        <span>$Label</span>
                    <% else %>
                        <a href="$Top.ParentPage.Link($Top.ParentPage.Action)?qid=$Up.ID&vid=$ID$Top.ParentPage.SurveyBuilderDateFilterQueryString">$Label</a>
                    <% end_if %>
                </td>
                <td>$Top.ParentPage.SurveyBuilderCountAnswers($Up.ID, $ID)</td>
            </tr>
            <% end_loop %>
        </tbody>
    </table>
</div>
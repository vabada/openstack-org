<div class="presentation-app-body">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-3">
                <% include SpeakerSidebar ActiveLink='presentations' %>
            </div>
            <div class="col-lg-9 col-md-9">
                <div class="presentation-main-panel">
                    <div class="main-panel-section">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <h2>Forum Sessions and Presentations</h2>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <% if $Top.isCallForSpeakerOpen %>
                                    <% if $Top.isPresentationSubmissionAllowed  %>
                                        <a href="$Link('manage/new')" class="btn btn-success add-presentation-button">Add New</a>
                                    <% else %>
                                        <div class="alert alert-danger alert-dismissible" role="alert">
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <strong>Warning!</strong> You have reached the submission limit.
                                        </div>
                                    <% end_if %>
                                <% else %>
                                    <div class="alert alert-danger alert-dismissible" role="alert">
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <strong>Warning!</strong> CFP is closed!.
                                    </div>
                                <% end_if %>
                            </div>
                        </div>
                    </div>
                    <h3>Presentations/Forum Sessions <strong>You</strong> Submitted</h3>
                    <table class="table">
                        <tbody>
                            <% if $CurrentMember.SpeakerProfile.MyPresentations($Top.Summit.ID) %>
                                <% loop $CurrentMember.SpeakerProfile.MyPresentations($Top.Summit.ID) %>
                                <tr>
                                    <td class="item-name">
                                        <i class="fa fa-file-text-o"></i>
                                        <% if $Top.canEditPresentation($ID) %>
                                            <a href="$EditLink" class="edit-presentation-button"> $getTitleNice() </a>
                                        <% else %>
                                            <a href="$PreviewLink"> $getTitleNice() </a>
                                        <% end_if %>
                                    </td>
                                    <td class="item-selection-plan">
                                        <% if $SelectionPlan.Exists() %> $SelectionPlan.Name <% end_if %>
                                    </td>
                                    <% if $Status %>
                                        <td class="status <% if isPublished() %> accepted <% end_if %>">
                                            <i class="fa fa-tag"></i>&nbsp;$getStatusNice()
                                        </td>
                                    <% else %>
                                        <td class="status"></td>
                                    <% end_if %>
                                    <td class="action">
                                        <% if $CanDelete && $Top.canEditPresentation($ID) %>
                                            <a data-confirm="Whoa, there..."
                                               data-confirm-text="Are you sure you want to delete this?"
                                               data-confirm-ok="Yup. Get rid of it."
                                               data-confirm-cancel="Nope. My bad."
                                               data-confirm-color="#b80000"
                                               href="$DeleteLink">Delete</a>
                                        <% end_if %>
                                    </td>
                                </tr>
                                <% end_loop %>
                            <% else %>
                            <tr>
                                <td><i>You have not submitted any presentations/sessions.</i></td>
                            </tr>
                            <% end_if %>
                        </tbody>
                    </table>
                    <h3>Presentations <strong>Others</strong> Submitted With You As A Speaker</h3>
                    <table class="table">
                        <tbody>
                            <% if $CurrentMember.SpeakerProfile.OtherPresentations($Top.Summit.ID) %>
                                <% loop $CurrentMember.SpeakerProfile.OtherPresentations($Top.Summit.ID) %>
                                <tr>
                                    <td class="item-name">
                                        <i class="fa fa-file-text-o"></i>
                                        <% if $Top.canEditPresentation($ID) %>
                                            <a href="$EditLink"> $getTitleNice() </a>
                                        <% else %>
                                            <a href="$PreviewLink"> $getTitleNice() </a>
                                        <% end_if %>
                                    </td>
                                    <td>
                                        <% if $SelectionPlan.Exists() %> $SelectionPlan.Name <% end_if %>
                                    </td>
                                    <% if $Status %>
                                        <td class="status <% if isPublished() %> accepted <% end_if %>">
                                            <i class="fa fa-tag"></i>&nbsp;$getStatusNice()
                                        </td>
                                    <% else %>
                                        <td class="status"></td>
                                    <% end_if %>
                                    <td class="action">
                                        <% if $CanDelete && $Top.canEditPresentation($ID) %><a href="$DeleteLink">Delete</a><% end_if %>
                                    </td>
                                </tr>
                                <% end_loop %>
                            <% else %>
                            <tr>
                                <td><i>There are no presentations submitted by others with you as a speaker.</i></td>
                            </tr>
                            <% end_if %>
                        </tbody>
                    </table>
                    <h3>Presentations/Forum Sessions <strong>Others</strong> Submitted With You As A Moderator</h3>
                    <table class="table">
                        <tbody>
                            <% if $CurrentMember.SpeakerProfile.OtherModeratorPresentations($Top.Summit.ID) %>
                                <% loop $CurrentMember.SpeakerProfile.OtherModeratorPresentations($Top.Summit.ID) %>
                                <tr>
                                    <td class="item-name">
                                        <i class="fa fa-file-text-o"></i>
                                        <% if $Top.canEditPresentation($ID) %>
                                            <a href="$EditLink"> $getTitleNice() </a>
                                        <% else %>
                                            <a href="$PreviewLink"> $getTitleNice() </a>
                                        <% end_if %>
                                    </td>
                                    <td>
                                        <% if $SelectionPlan.Exists() %> $SelectionPlan.Name <% end_if %>
                                    </td>
                                    <% if $Status %>
                                        <td class="status <% if isPublished() %> accepted <% end_if %>">
                                            <i class="fa fa-tag"></i>&nbsp;$getStatusNice()
                                        </td>
                                    <% else %>
                                        <td class="status"></td>
                                    <% end_if %>
                                    <td class="action">
                                        <% if $CanDelete && $Top.canEditPresentation($ID) %><a href="$DeleteLink">Delete</a><% end_if %>
                                    </td>
                                </tr>
                                <% end_loop %>
                            <% else %>
                            <tr>
                                <td><i>There are no presentations/sessions submitted by others with you as a moderator.</i></td>
                            </tr>
                            <% end_if %>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <% if $getGoBackStep() %>
        <% include PresentationPage_SaveLaterModal StepUrl=$AbsoluteLink($Top.getGoBackStep()) %>
        <script>
            $('#save-later-modal').modal('toggle');
        </script>
    <% end_if %>
</div>

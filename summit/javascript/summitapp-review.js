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

$(document).ready(function(){
    $(".rating").rating({showCaption:false,showClear:false,step:0.5});

    $('.save').click(function() {
       saveReview();
    });

    $('.rating').on('rating.change', function(event, value, caption) {
        var event_id = $(this).data('event-id');
        $('#'+event_id).prop('disabled',false).text('Save');
    });

    $('.comment').change(function(){
        var event_id = $(this).data('event-id');
        $('#'+event_id).prop('disabled',false).text('Save');
    });
});

function clearReviewInputs(){
    $(".rating").rating('reset');
    $('#comment').val('');
}

function saveReview() {
    var event_id = $('#event_id').val();
    var rating = $('#rating').val();
    var comment = $('#comment').val();
    var member_id = $('#member_id').val();
    var summit_id = $('#summit_id').val();
    var review = {rating: rating, comment: comment, member_id: member_id, event_id: event_id, Approved : 0};

    if (rating == 0 || comment == ''){
        swal('Error', 'Please fill in the rating and the comment.', 'warning');
        return;
    }

    $('#'+event_id).prop('disabled',true);

    $.ajax({
        type: 'POST',
        url:  'api/v1/summits/'+summit_id+'/schedule/'+event_id+'/feedback',
        data: JSON.stringify(review),
        timeout:10000,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            clearReviewInputs();
            swal('Thanks!',
                'Your review has been sent and now is pending for approval.',
                'success');
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var http_code = jqXHR.status;
        if(http_code === 401){
            // user lost its session
            alert('you are not logged in!');
            location.reload();
        }
    });
}
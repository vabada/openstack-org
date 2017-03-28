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
    $(".rating").rating({showCaption:false,showClear:false,step:0.5, size: "xxxs"});

    $('.save').click(function() {
       saveReview();
    });


    function getReviews(event_id){
        $.ajax({
            type: 'GET',
            url:  '/SummitAppSchedPage_Controller/events/'+event_id+'/feedback',
            success: function (data) {
                $("#commentList").html(data);
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            var http_code = jqXHR.status;
            if(http_code === 401){
                alert('you are not logged in!');
                location.reload();
            }
        });


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
                swal({
                    title: 'Thanks!',
                    text: 'Your feedback has been sent!',
                    type: "success",
                }).then(function () {
                    $('.feedback_box').hide();
                    getReviews(event_id);
                });
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            var http_code = jqXHR.status;
            if(http_code === 401){
                alert('you are not logged in!');
                location.reload();
            }
        });
    }
});

<script type="application/javascript">
    var comments = [];

    <% loop $Event.getFeedback() %>
    comments.push(
            {
                rate:  "{$getRate.JS}",
                date : "{$getDateNice.JS}",
                note : "{$getNote.JS}",
            });
    <% end_loop %>
    var event = { feedbackCount:  "{$Event.getFeedback().count}", avgRate : "{$Event.getAvgRate()}"  };

</script>

<event-comments id="commentList" event="{ event }"  comments="{ comments }" limit="5"></event-comments>

$ModuleJS('event-detail')
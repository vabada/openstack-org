<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <% include SummitAdmin_SidebarMenu AdminLink=$Top.Link, SummitID=$Summit.ID, Active='summit_dates', TabActive='summit' %>
    </div><!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper" class="container-fluid summit-admin-container">
        <ol class="breadcrumb">
            <li><a href="$Top.Link">Home</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
            <li class="active">Dates</li>
        </ol>

        <div id="summit-dates"></div>
    </div>
</div>

<script>
    var summit =
        {
            id:   $Summit.ID,
            time_zone: "{$Summit.TimeZone.JS}",
            begin_date: "{$Summit.SummitBeginDate.JS}",
            finish_date: "{$Summit.SummitEndDate.JS}",
            venues_date: "{$Summit.StartShowingVenuesDate.JS}",
            default_date : "{$Summit.ScheduleDefaultStartDate.JS}",
            submissions_begin: "{$Summit.SubmissionBeginDate.JS}",
            submissions_finish: "{$Summit.SubmissionEndDate.JS}",
            voting_begin: "{$Summit.VotingBeginDate.JS}",
            voting_finish: "{$Summit.VotingEndDate.JS}",
            selections_begin : "{$Summit.SelectionBeginDate.JS}",
            selections_finish : "{$Summit.SelectionEndDate.JS}",
            registration_begin : "{$Summit.RegistrationBeginDate.JS}",
            registration_finish : "{$Summit.RegistrationEndDate.JS}",
        };

    var time_zones = [];

    <% loop $getTimeZones() %>
        time_zones.push('{$Name}');
    <% end_loop %>


</script>

$ModuleJS("summit-dates", false, "summit")
$ModuleCSS("summit-dates", false, "summit")
<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <% include SummitAdmin_SidebarMenu AdminLink=$Top.Link, SummitID=$Summit.ID, Active='main_data', TabActive='summit' %>
    </div><!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper" class="container-fluid summit-admin-container">
        <ol class="breadcrumb">
            <li><a href="$Top.Link">Home</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
            <li class="active">Main Data</li>
        </ol>

        <div id="summit-main-data"></div>
    </div>
</div>

<script>
var summit =
        {
            id:   $Summit.ID,
            title: "{$Summit.Title.JS}",
            link: "{$Summit.Link.JS}",
            active: {$Summit.Active},
            available_api: {$Summit.AvailableOnApi},
            date_label : "{$Summit.DateLabel.JS}",
            registration_link: "{$Summit.RegistrationLink.JS}",
            registration_link_2: "{$Summit.SecondaryRegistrationLink.JS}",
            registration_label_2: "{$Summit.SecondaryRegistrationBtnText.JS}",
            max_submissions: {$Summit.MaxSubmissionAllowedPerUser},
            coming_soon_label : "{$Summit.ComingSoonBtnText.JS}",
            eventbrite_id : "{$Summit.ExternalEventId.JS}",
            wifis: []
        };

        <% loop $Summit.WIFIConnections %>
            summit.wifis.push({
                id: {$ID},
                network: "{$SSID.JS}",
                password: "{$Password.JS}"
            });
        <% end_loop %>

</script>

$ModuleJS("summit-main-data", false, "summit")
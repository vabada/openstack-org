<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <% include SummitAdmin_SidebarMenu AdminLink=$Top.Link, SummitID=$Summit.ID, Active='events_types', TabActive='events' %>
    </div><!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper" class="container-fluid summit-admin-container" >
        <ol class="breadcrumb">
            <li><a href="$Top.Link">Home</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/events/types/">Event Types</a></li>
            <li class="active"><% if $EventType.Exists %> $EventType.Type <% else %> new <% end_if %></li>
        </ol>

        <div id="event-type-edit"></div>
    </div>
</div>

<script type="text/javascript">
    var summit =
        {
            id:   $Summit.ID,
            title: "{$Summit.Title.JS}",
            link: "{$Summit.Link.JS}",
        };

    var type = "{$Type.JS}";
    var event_type = {};

    <% if $EventType.Exists %>
        event_type =
            {
                id:   $EventType.ID,
                type: "{$EventType.Type.JS}",
                color: "{$EventType.Color.JS}",
                blackout: {$EventType.BlackoutTimes},
                use_sponsors: {$EventType.UseSponsors},
                sponsors_mandatory: {$EventType.AreSponsorsMandatory},
                attachment: {$EventType.AllowsAttachment},
            };

            <% if not $IsSummitEventType($EventType.Type) %>
                event_type.max_speakers = {$EventType.MaxSpeakers};
                event_type.min_speakers = {$EventType.MinSpeakers};
                event_type.max_moderators = {$EventType.MaxModerators};
                event_type.min_moderators = {$EventType.MinModerators};
                event_type.use_speakers = {$EventType.UseSpeakers};
                event_type.speakers_mandatory = {$EventType.AreSpeakersMandatory};
                event_type.use_moderator = {$EventType.UseModerator};
                event_type.moderator_mandatory = {$EventType.IsModeratorMandatory};
                event_type.moderator_label = "{$EventType.ModeratorLabel.JS}";
                event_type.available_cfp = {$EventType.ShouldBeAvailableOnCFP};
            <% end_if %>
    <% end_if %>

    window.ReactStaticProps = {
       summit: summit,
       base_url: "{$Top.Link}/{$Summit.ID}/events/types"
   };
</script>

$ModuleJS("event-type-edit")
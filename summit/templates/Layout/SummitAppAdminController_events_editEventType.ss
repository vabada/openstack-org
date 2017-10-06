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
            <li><a href="$Top.Link/{$Summit.ID}/sponsors/packages/">Event Types</a></li>
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

    var summit_package = {};

    <% if $EventType.Exists %>
        event_type =
            {
                id:   $EventType.ID,
                type: "{$EventType.Type.JS}",
            };
    <% end_if %>

    window.ReactStaticProps = {
       summit: summit,
       base_url: "{$Top.Link}/{$Summit.ID}/sponsors/packages"
   };
</script>

$ModuleJS("event-type-edit")
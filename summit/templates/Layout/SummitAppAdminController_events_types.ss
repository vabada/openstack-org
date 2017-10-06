<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <% include SummitAdmin_SidebarMenu AdminLink=$Top.Link, SummitID=$Summit.ID, Active='events_types', TabActive='events' %>
    </div><!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper" class="container-fluid summit-admin-container">
        <ol class="breadcrumb">
            <li><a href="$Top.Link">Home</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
            <li class="active">Event Types</li>
        </ol>

        <div id="event-types"></div>
    </div>
</div>

<script type="text/javascript">
    var summit =
        {
            id:   $Summit.ID,
            title: "{$Summit.Title.JS}",
            link: "{$Summit.Link.JS}",
            active: {$Summit.Active},
        };

    window.ReactStaticProps = {
       summit: summit,
       base_url: "{$Top.Link}"
   };
</script>

$ModuleJS("event-types")
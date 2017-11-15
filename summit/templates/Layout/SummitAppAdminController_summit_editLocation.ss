<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <% include SummitAdmin_SidebarMenu AdminLink=$Top.Link, SummitID=$Summit.ID, Active='locations', TabActive='summit' %>
    </div><!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper" class="container-fluid summit-admin-container" >
        <ol class="breadcrumb">
            <li><a href="$Top.Link">Home</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/summit/locations/">Locations</a></li>
            <li class="active"><% if $Location.Exists %> $Location.Name <% else %> new <% end_if %></li>
        </ol>

        <div id="summit-location-edit"></div>
    </div>
</div>

<script type="text/javascript">
    var summit =
        {
            id:   $Summit.ID,
            title: "{$Summit.Title.JS}",
            link: "{$Summit.Link.JS}",
        };

    var summit_location = {};

    <% if $Location.Exists %>
        summit_location =
            {
                id:   $Location.ID,
                name: "{$Location.Name.JS}",
                description: "{$Location.Description.JS}",
                order: {$Location.Order},
                type: "{$Location.LocationType.JS}",
            };
    <% end_if %>

    window.ReactStaticProps = {
       summit: summit,
       base_url: "{$Top.Link}/{$Summit.ID}/sponsors/packages"
   };
</script>

$ModuleJS("summit-location-edit")
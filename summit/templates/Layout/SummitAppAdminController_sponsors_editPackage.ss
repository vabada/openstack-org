<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <% include SummitAdmin_SidebarMenu AdminLink=$Top.Link, SummitID=$Summit.ID, Active=7 %>
    </div><!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper" class="container-fluid summit-admin-container" >
        <ol class="breadcrumb">
            <li><a href="$Top.Link">Home</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/promocodes/">Sponsor Packages</a></li>
            <li class="active"><% if $Package.Title %> $Package.Title <% else %> new <% end_if %></li>
        </ol>

        <div id="sponsors-package-edit"></div>
    </div>
</div>

<script type="text/javascript">
    var summit =
        {
            id:   $Summit.ID,
            title: "{$Summit.Title.JS}",
            link: "{$Summit.Link.JS}",
        };

    var summit_package =
        {
            id:   $Package.ID,
            title: "{$Package.Title.JS}",
            cost: "{$Package.Cost.JS}",
        };

    window.ReactStaticProps = {
       summit: summit,
       base_url: "{$Top.Link}"
   };
</script>

$ModuleJS("sponsors-package-edit")
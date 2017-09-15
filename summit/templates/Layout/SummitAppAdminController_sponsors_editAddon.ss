<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <% include SummitAdmin_SidebarMenu AdminLink=$Top.Link, SummitID=$Summit.ID, Active='sponsors_addons', TabActive='sponsors' %>
    </div><!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper" class="container-fluid summit-admin-container" >
        <ol class="breadcrumb">
            <li><a href="$Top.Link">Home</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
            <li><a href="$Top.Link/{$Summit.ID}/sponsors/addons/">Sponsor Addons</a></li>
            <li class="active"><% if $Addon.Exists %> $Addon.Title <% else %> new <% end_if %></li>
        </ol>

        <div id="sponsors-addon-edit"></div>
    </div>
</div>

<script type="text/javascript">
    var summit =
        {
            id:   $Summit.ID,
            title: "{$Summit.Title.JS}",
            link: "{$Summit.Link.JS}",
        };

    var summit_addon = {};

    <% if $Addon.Exists %>
        summit_addon =
            {
                id:   $Addon.ID,
                title: "{$Addon.Title.JS}",
                cost: "{$Addon.Cost.JS}",
                max_available: {$Addon.MaxAvailable},
                available: {$Addon.CurrentlyAvailable},
                show_qty: {$Addon.ShowQuantity},
            };
    <% end_if %>

    window.ReactStaticProps = {
       summit: summit,
       base_url: "{$Top.Link}/{$Summit.ID}/sponsors/addons"
   };
</script>

$ModuleJS("sponsors-addon-edit")
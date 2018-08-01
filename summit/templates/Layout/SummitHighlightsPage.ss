<div class="top-bar">
    <p>
        <i class="fa fa-exclamation-circle"></i>
        The OpenStack community had an amazing time in {$Summit.Title}, so don't miss the OpenStack Summit in {$Top.NextSummit.Name}!
        <a href="<% if $Summit.Next.Link %>$Summit.Next.Link<% else %>#<% end_if %>">More on the Summit in {$Top.NextSummit.Name}.</a>
    </p>
</div>
<div id="wrap">
    <div class="summit-hero-wrapper condensed" <% if SummitImage %>style="background: rgba(0, 0, 0, 0) url('{$SummitImage.Image.Link}') no-repeat scroll center bottom / cover ;"<% end_if %>>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <a href="/">
                        <img alt="OpenStack Summit"
                             src="/themes/openstack/static/images/summit-logo-small-white.svg" class="summit-hero-logo">
                    </a>
                    <h2>
                        $Summit.DateLabel
                    </h2>

                    <h1>
                        $Summit.Title
                    </h1>
                </div>
            </div>
            <a class="open-panel" href="#"><i class="fa fa-bars fa-2x collapse-nav"></i></a>
        </div>
        <div class="hero-tab-wrapper">
            <!-- Microsite Navigation -->
            <ul class="nav nav-tabs">
                <li class="current">
                    <a href="$Top.Link">Summit Highlights</a>
                </li>
                <li class="">
                    <a href="$Top.Link(sponsors)">Sponsors</a>
                </li>
                <li class="">
                    <a href="$Top.Link(summit-schedule)">Summit Schedule</a>
                </li>
                <li class="">
                    <a href="$Top.Link(videos)">Videos</a>
                </li>
            </ul>
            <!-- End Microsite Navigation -->
        </div>
        <% if SummitImage %>
        <a target="_blank" title="" data-placement="left" data-toggle="tooltip" class="photo-credit"
           href="$SummitImage.OriginalURL" data-original-title="{$SummitImage.Attribution}"><i
                class="fa fa-info-circle"></i></a>
        <% end_if %>
    </div>
    <!-- Begin Page Content -->
    <div class="white summit-highlights-intro">
        <div class="container">
            <div class="row">
                <div class="col-sm-10 col-sm-push-1">
                    <h1>Thank You, {$Summit.Title}!</h1>
                    <p>
                        {$ThankYouText}
                    </p>
                </div>
                <!--<div class="col-sm-6">
                    <div class="future-summit-promo tokyo" <% if NextSummitTinyBackgroundImage %>style="background: rgba(0, 0, 0, 0) url('{$NextSummitTinyBackgroundImage.Link}') no-repeat center center;"<% end_if %>>
                        <div class="future-summit-next">
                            Up Next
                        </div>
                        <div class="future-summit-promo-city">
                            $Summit.Next.Title
                        </div>
                        <p>
                           {$NextSummitText}
                        </p>
                        <% if $Summit.Next.RegistrationLink %>
                        <p>
                            <a class="future-summit-btn" href="$Summit.Next.RegistrationLink">Find Out More</a>
                        </p>
                    <% end_if %>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
    <div class="huge-success-video">
        <h1>{$SuccessTitle}</h1>
        <div class="summit-success-quote"><a href="{$SuccessAttributionURL}" target="_blank">{$SuccessAttribution}</a></div>
        <div class="summit-success-stats">
            <div class="stat">
                <div class="number attendance">
                    {$Top.AttendanceQty}
                </div>
                <div class="title">
                    Attendees
                </div>
            </div>
            <div class="stat">
                <div class="number companies">
                    {$Top.CompaniesRepresentedQty}
                </div>
                <div class="title">
                    Companies Represented
                </div>
            </div>
            <div class="stat">
                <div class="number countries">
                    {$Top.CountriesRepresentedQty}
                </div>
                <div class="title">
                    Countries Represented
                </div>
            </div>
            <div class="stat">
                <div class="number sessions">
                    {$Top.SessionsQty}
                </div>
                <div class="title">
                    Sessions
                </div>
            </div>
        </div>
        <% if getVideoUrls().Count > 0 %>
            <div class="container">
            <% loop getVideoUrls() %>
                <% if $Top.getVideoUrls().Count == 1 %>
                    <div class="big_stats_video_wrapper">
                        <iframe src="{$Url}" width="853" height="480" frameborder="0" allowfullscreen="" ></iframe>
                    </div>
                <% else %>
                    <div class="stats_video_wrapper">
                        <iframe src="{$Url}" frameborder="0" allowfullscreen="" ></iframe>
                    </div>
                <% end_if %>
            <% end_loop %>
            </div>
        <% end_if %>
        <video id="bgvid" poster="{$Top.StatisticsVideoPoster.Link}" loop="" autoplay="">
    </div>
    <% if KeynotesImages %>
        <script>
            var keynotes = [];
            <% loop SummitKeynoteHighlightAvailableDays %>
                var {$Label} = { day:'{$Label}', items:[] };
                keynotes.push({$Label});
            <% end_loop %>
            <% loop KeynotesImages.Sort(Order, ASC) %>
                {$Day}.items.push(
                        {
                            title       : '{$Title}',
                            description : '{$Description.RAW}',
                            image_url   : '{$Image.Link}',
                            preview_url : '{$ThumbnailLink}',
                        }
                );
            <% end_loop %>
        </script>
        <highlights keynotes="{ keynotes }"></highlights>
    <% end_if %>
    <%if ReleaseAnnouncedTitle %>
    <div class="summit-highlight-release">
        <div class="container">
            <div class="row">
                <h1>{$ReleaseAnnouncedTitle}</h1>

                <div class="col-sm-5 center">
                    <img alt=""
                         src="{$ReleaseAnnouncedImage.Link}">
                </div>
                <div class="col-sm-7">
                    <p>
                        {$ReleaseAnnouncedDescription}
                    </p>
                    <p>
                        <a class="highlight-software-btn" href="{$ReleaseAnnouncedButtonLink}">{$ReleaseAnnouncedButtonTitle}&nbsp;<i class="fa fa-chevron-right"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <% end_if %>
    <% if Pics %>
        <div class="summit-highlights-pics">
            <div class="container">
                <div class="row">
                    <h1>Oh, The Fun We Had!</h1>
                    <% loop Pics.sort(Order) %>
                        <div class="pic-container">
                            <div data-toggle="lightbox" class="thumbnails">
                                <a class="thumbnail" href="{$Image.Link}" title="{$Title}">
                                    <img alt="$Title"
                                         src="{$Image.Link}"
                                         class="img-responsive">
                                </a>
                            </div>
                        </div>
                    <% end_loop %>
                </div>
                <div class="row">
                    <div class="col-sm-12 center">
                        <a class="highlights-pic-link" href="<% if CurrentSummitFlickrUrl %>$CurrentSummitFlickrUrl<% else %>#<% end_if %>">See all of the pics from The Summit in {$Summit.Title} on Flickr</a>
                    </div>
                </div>
            </div>
        </div>
    <% end_if %>
    <div class="about-city-row" <% if NextSummitBackgroundImage %>style="background: rgba(0, 0, 0, 0) url('{$NextSummitBackgroundImage.Image.Link}') no-repeat scroll left top / cover;"<% end_if %> >
        <p>
            The next Summit will be here before you know it...
        </p>
        <h1>See You In {$Summit.Next.Title}</h1>
        <div class="summit-date">
            {$NextSummitText}
        </div>
        <% if $Summit.Next.Link %>
        <div>
            <br/><a class="btn register-btn-lrg" href="$Summit.Next.Link">Learn More</a>
        </div>
        <% end_if %>
        <% if NextSummitBackgroundImage %>
        <a target="_blank" title="" data-placement="left" data-toggle="tooltip" class="photo-credit"
           href="{$NextSummitBackgroundImage.OriginalURL}" data-original-title="{$NextSummitBackgroundImage.Attribution}"><i class="fa fa-info-circle"></i></a>
        <% end_if %>
    </div>
    <!-- End Page Content -->
    <div id="push"></div>
</div>
$ModuleJS('summit-highlights')

<ul class="sidebar-nav nav-pills nav-stacked" id="menu">
    <li <% if $Active == 'dashboard' %> class="active" <% end_if %>>
        <a href="$AdminLink/$SummitID/dashboard"><span class="fa-stack fa-lg pull-left"><i class="fa fa-dashboard fa-stack-1x "></i></span>Dashboard</a>
    </li>
    <li>
        <a href="#summit-nav" data-toggle="collapse" data-parent="#menu">
            <span class="fa-stack fa-lg pull-left"><i class="fa fa-university fa-stack-1x "></i></span>Summit
        </a>
        <div class="collapse <% if $TabActive == 'summit' %> in <% end_if %>" id="summit-nav">
            <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                <li <% if $Active == 'main_data' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/summit/main_data">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Main Data
                    </a>
                </li>
                <li <% if $Active == 'summit_dates' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/summit/dates">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Summit Dates
                    </a>
                </li>
            </ul>
        </div>
    </li>
    <li>
        <a href="#attendees-nav" data-toggle="collapse" data-parent="#menu">
            <span class="fa-stack fa-lg pull-left"><i class="fa fa-users fa-stack-1x "></i></span>Attendees
        </a>
        <div class="collapse <% if $TabActive == 'attendees' %> in <% end_if %>" id="attendees-nav">
            <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                <li <% if $Active == 'attendees' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/attendees">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Attendee List
                    </a>
                </li>
                <li <% if $Active == 'attendees_match' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/attendees/match">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Eventbrite Match
                    </a>
                </li>
            </ul>
        </div>
    </li>
    <li>
        <a href="#schedule-nav" data-toggle="collapse" data-parent="#menu">
            <span class="fa-stack fa-lg pull-left"><i class="fa fa-calendar fa-stack-1x "></i></span>Events
        </a>
        <div class="collapse <% if $TabActive == 'events' %> in <% end_if %>" id="schedule-nav">
            <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                <li <% if $Active == 'schedule' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/events/schedule">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Schedule
                    </a>
                </li>
                <li <% if $Active == 'edit_event' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/events">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>New Event
                    </a>
                </li>
                <li <% if $Active == 'events_bulk' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/events/bulk">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Bulk Actions
                    </a>
                </li>
                <li <% if $Active == 'events_types' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/events/types">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Event Types
                    </a>
                </li>
            </ul>
        </div>
    </li>
    <li>
        <a href="#speakers-nav" data-toggle="collapse" data-parent="#menu">
            <span class="fa-stack fa-lg pull-left"><i class="fa fa-users fa-stack-1x "></i></span>Speakers
        </a>
        <div class="collapse <% if $TabActive == 'speakers' %> in <% end_if %>" id="speakers-nav">
            <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                <li <% if $Active == 'speakers' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/speakers">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Speaker List
                    </a>
                </li>
                <li <% if $Active == 'speakers_merge' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/speakers/merge">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Merge
                    </a>
                </li>
            </ul>
        </div>
    </li>
    <li <% if $Active == 'reports' %> class="active" <% end_if %>>
        <a href="$AdminLink/$SummitID/reports"><span class="fa-stack fa-lg pull-left"><i class="fa fa-list fa-stack-1x "></i></span>Reports</a>
    </li>
    <li>
        <a href="#tickets-nav" data-toggle="collapse" data-parent="#menu">
            <span class="fa-stack fa-lg pull-left"><i class="fa fa-ticket fa-stack-1x "></i></span>Tickets
        </a>
        <div class="collapse <% if $TabActive == 'tickets' %> in <% end_if %>" id="tickets-nav">
            <ul class="nav-pills nav-stacked" style="list-style-type:none;" >
                <li <% if $Active == 'ticket_types' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/ticket_types">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Ticket Types
                    </a>
                </li>
                <li <% if $Active == 'promocodes' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/promocodes">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>PromoCodes
                    </a>
                </li>
                <li <% if $Active == 'promocodes_sponsors' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/promocodes/sponsors">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Sponsors
                    </a>
                </li>
                <li <% if $Active == 'promocodes_bulk' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/promocodes/bulk">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>PromoCodes Bulk
                    </a>
                </li>
            </ul>
        </div>
    </li>
    <li>
        <a href="#sponsors-nav" data-toggle="collapse" data-parent="#menu">
            <span class="fa-stack fa-lg pull-left"><i class="fa fa-ticket fa-stack-1x "></i></span>Sponsors
        </a>
        <div class="collapse <% if $TabActive == 'sponsors' %> in <% end_if %>" id="sponsors-nav">
            <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                <li <% if $Active == 'sponsors_packages' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/sponsors/packages">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Packages
                    </a>
                </li>
                <li <% if $Active == 'sponsors_addons' %> class="active" <% end_if %>>
                    <a href="$AdminLink/$SummitID/sponsors/addons">
                        <span class="fa-stack pull-left"><i class="fa fa-chevron-right fa-stack-1x" style="padding-top: 5px;"></i></span>Addons
                    </a>
                </li>
            </ul>
        </div>
    </li>
</ul>
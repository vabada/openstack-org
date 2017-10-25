<div class="row no-margin">
        <div class="col-md-12 no-margin no-padding">
            <ol class="breadcrumb">
                <li><a href="$Top.Link">Home</a></li>
                <li><a href="$Top.Link/{$Summit.ID}/dashboard">$Summit.Name</a></li>
                <li class="active">Schedule</li>
                <li><input id="event_shortcut" placeholder="Event ID"/><button id="event_shortcut_go">Go</button></li>
            </ol>
            <script type="application/javascript">
                var admin_url = "{$Top.Link}/{$Summit.ID}";
                var summit =
                        {
                            id:   $Summit.ID,
                            dates : {},
                            events: {},
                            speakers : {},
                            sponsors : {},
                            event_types:{},
                            locations : [],
                            locations_dictionary: {},
                            tags: {},
                            tracks : [],
                            tracks_dictionary : {},
                            presentation_levels: {},
                            current_user: null,
                            track_lists: [],
                            status_options: [],
                            selection_status_options: [],
                        };
                    <% loop $PresentationStatusOptions %>
                    summit.status_options.push("{$Status}");
                    <% end_loop %>
                    <% loop $PresentationSelectionStatusOptions %>
                    summit.selection_status_options.push("{$Status}");
                    <% end_loop %>
                    <% loop $Summit.getCategories() %>
                    summit.tracks.push(
                            {
                                id: {$ID},
                                name : "{$Title.JS}",
                            });
                    summit.tracks_dictionary[{$ID}]= {
                        id: {$ID},
                        name : "{$Title.JS}",
                    };
                    <% end_loop %>
                    <% loop $Top.getPresentationLevels %>
                    summit.presentation_levels['{$Level}'] =
                            {
                                level : "{$Level}",
                            };
                    <% end_loop %>
                    <% loop $Summit.EventTypes %>
                    summit.event_types[{$ID}] =
                            {
                                type : "{$Type.JS}",
                                color : "{$Color}",
                            };
                    <% end_loop %>
                    <% loop $Summit.TrackGroupLists %>
                    summit.track_lists.push(
                            {
                                name : "{$Category.Title.JS}",
                                id : "{$ID}",
                            });
                    <% end_loop %>

                    <% loop $Summit.getTopVenues() %>
                        <% if ClassName == SummitVenue || ClassName == SummitExternalLocation  %>


                        summit.locations.push({
                            id:$ID,
                            class_name : "{$ClassName}",
                            name       : "{$Name.JS}",
                            description : "{$Description.JS}",
                            address_1 : "{$Address1.JS}",
                            address_2 : "{$Address2.JS}",
                            city : "{$City}",
                            state : "{$State}",
                            country : "{$Country}",
                            lng : '{$Lng}',
                            lat : '{$Lat}',
                        });

                        summit.locations_dictionary[$ID] = {
                            id:$ID,
                            class_name : "{$ClassName}",
                            name       : "{$Name.JS}",
                            description : "{$Description.JS}",
                            address_1 : "{$Address1.JS}",
                            address_2 : "{$Address2.JS}",
                            city : "{$City}",
                            state : "{$State}",
                            country : "{$Country}",
                            lng : '{$Lng}',
                            lat : '{$Lat}',
                        };
                            <% if ClassName == SummitVenue %>
                                <% loop Rooms.sort('Name', 'ASC') %>
                                summit.locations.push({
                                    id         : $ID,
                                    class_name : "{$ClassName}",
                                    name       : "{$Name.JS}",
                                    capacity   : {$Capacity},
                                    venue_id   : {$VenueID},
                                });

                                summit.locations_dictionary[$ID] = {
                                    id         : $ID,
                                    class_name : "{$ClassName}",
                                    name       : "{$Name.JS}",
                                    capacity   : {$Capacity},
                                    venue_id   : {$VenueID},
                                };
                                <% end_loop %>
                            <% end_if %>
                        <% end_if %>
                    <% end_loop %>
                    <% loop $Summit.Dates %>
                    summit.dates['{$Date}']  = { label: '{$Label}', date:'{$Date}', selected: false };
                    summit.events['{$Date}'] = [];
                    <% end_loop %>
            </script>
            <div id="schedule-admin-dashboard-container"></div>
        </div>
</div>
$ModuleJS('schedule-admin-dashboard')
$ModuleCSS('schedule-admin-dashboard')
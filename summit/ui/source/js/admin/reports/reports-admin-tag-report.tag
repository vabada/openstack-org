<raw>
    <span></span>
    this.root.innerHTML = opts.content
</raw>

<reports-admin-tag-report>

    <div class="panel panel-default" if={ tags.length > 0 }>
        <div class="panel-heading">Tags ({ page_data.total })</div>

        <table class="table">
            <thead>
                <tr>
                    <th class="sortable" data-sort="tag" data-dir="ASC">Tag</th>
                    <th class="sortable" data-sort="tag_count" data-dir="DESC">Count</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tag_item" each={ tag, i in tags } onclick={ tagClick }>
                    <td>{ tag.tag }</td>
                    <td>{ tag.tag_count }</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="panel panel-default" if={ events.length > 0 }>
            <div class="panel-heading">Events ({ page_data.total })</div>

            <table class="table">
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th class="sortable" data-sort="event" data-dir="ASC">Event</th>
                        <th>Attending Media</th>
                        <th>Speakers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr each={ e, i in events }>
                        <td>{ e.id }</td>
                        <td>{ e.title }</td>
                        <td>{ e.attending_media }</td>
                        <td>{ e.speakers }</td>
                    </tr>
                </tbody>
            </table>
        </div>

    <nav>
    <ul id="report-pager" class="pagination"></ul>
    </nav>

    <script>
        this.dispatcher      = opts.dispatcher;
        this.page_data       = {total: 100, limit: opts.page_limit, page: 1};
        this.summit_id       = opts.summit_id;
        this.tags            = [];
        this.events          = [];
        var self             = this;


        this.on('mount', function() {
            self.getReport(1);

            $('.sortable').click(function(){
                self.parent.toggleSort($(this));
                self.getReport(self.page_data.page);
            });

        });

        getReport(page) {
            $('body').ajax_loader();
            var sort = $('.sorted').data('sort');
            var sort_dir = $('.sorted').data('dir');
            var term = $('#search-term').val();
            var published = $('#show-published').prop('checked');

            $.getJSON('api/v1/summits/'+self.summit_id+'/reports/tag_report',
                {page:page, items: self.page_data.limit, sort: sort, sort_dir: sort_dir, term: term, published: published},
                function(data){
                    self.tags = data.tags ? data.tags : [];
                    self.events = data.events ? data.events : [];
                    self.page_data.page = page;
                    self.page_data.total = parseInt(data.total);

                    var total_pages = (self.page_data.total) ? Math.ceil(self.page_data.total / self.page_data.limit) : 1;
                    var options = {
                        bootstrapMajorVersion:3,
                        currentPage: self.page_data.page ,
                        totalPages: total_pages,
                        numberOfPages: 10,
                        onPageChanged: function(e,oldPage,newPage){
                            self.getReport(newPage);
                        }
                    }

                    $('#report-pager').bootstrapPaginator(options);

                    self.update();
                    $('body').ajax_loader('stop');
            });
        }

        tagClick(ev) {
            $('#search-term').val('tagID:'+ev.item.tag.id);
            console.log(ev.item);
            self.getReport(1);
        }

        self.dispatcher.on(self.dispatcher.GET_TAG_REPORT,function() {
            self.getReport(1);
        });

        self.dispatcher.on(self.dispatcher.EXPORT_TAG_REPORT,function() {
            var sort     = ($('.sorted').length) ? $('.sorted').data('sort') : '';
            var sort_dir = ($('.sorted').length) ? $('.sorted').data('dir') : 'ASC';
            var term = $('#search-term').val();
            var published = $('#show-published').prop('checked');

            window.open('api/v1/summits/'+self.summit_id+'/reports/export/tag_report?term='+term+'&sort='+sort+'&sort_dir='+sort_dir+'&published='+published, '_blank');
        });

    </script>

</reports-admin-tag-report>
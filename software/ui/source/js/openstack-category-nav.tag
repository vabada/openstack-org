<openstack-category-nav>
    <!-- Projects Subnav -->
    <div class="container">
        <div class="outer-project-subnav">
            <div class="category-slider">
                <ul class="category-subnav">
                    <li class="category-item" each={ categories } >
                        <a id="{ 'category_' + ID }" data-slug={ Slug } href="#" data-id="{ ID }" onclick={ selectedCategory }>{ Name }</a>
                    </li>
                </ul>
            </div>
        </div>

    </div>

    <script>

        this.categories = Object.keys(opts.groups).map(key => opts.groups[key].category);
        this.ctrl       = riot.observable();
        this.api        = opts.api;
        this.default    = this.categories[0].ID;
        var self        = this;

        this.on('mount', function(){

            $( document ).ready(function() {
                self.handleDeepLink();
            });

        });

        selectedCategory(e) {
            self.clickCategory(e.item.ID);
        }

        clickCategory(id) {
            var slug = $('#category_'+ id).data('slug');
            $('.category-item').removeClass('active');
            $('#category_'+ id).parent().addClass('active');
            window.location.hash = slug;
            // change view
            self.api.trigger('change-category', slug)
        }

        handleDeepLink() {
            var hash = window.location.hash.replace('#', '');
            if(!$.isEmptyObject(hash) ) {
                if ($('*[data-slug="'+hash+'"]').length) {
                    self.clickCategory($('*[data-slug="'+hash+'"]').data('id'))
                }
            } else if(self.default !== null) {
                self.clickCategory(self.default)
            }
        }

        opts.api.on('loaded-components-by-release',function(data) {
            self.categories = Object.keys(data).map(catId => data[catId].category);
            self.update();
            if (self.categories.length) {
                self.clickCategory(self.categories[0].ID);
            }
        });

        module.exports = this.ctrl;
    </script>

</openstack-category-nav>

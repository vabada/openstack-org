<?php
/*
   Static content page for Austin
*/
class SummitStaticOpenSourceDays extends SummitPage {
}
class SummitStaticOpenSourceDays_Controller extends SummitPage_Controller {
    public function init()
    {
        #$this->top_section = 'full';
        parent::init();

        Requirements::block("summit/css/combined.css");
        Requirements::css("themes/openstack/static/css/combined.css");
        Requirements::css("summit/css/opensourceday.css");
#	Requirements::css('themes/openstack/javascript/secondary-nav.jquery/secondary-nav.jquery.css');
#        Requirements::javascript('themes/openstack/javascript/secondary-nav.jquery/secondary-nav.jquery.js');
    }
}

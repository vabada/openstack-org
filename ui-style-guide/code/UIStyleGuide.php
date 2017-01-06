<?php

class UIStyleGuide extends Controller
{

	private static $url_handlers = [
		'$Component!' => 'handleAction'
	];
	
	public function init()
	{		
		parent::init();
		if(!Director::isDev()) {
			return $this->httpError(403, 'The style guide is only viewable in dev mode');
		}		
		
		Requirements::javascript("ui-style-guide/ui/node_modules/babel-standalone/babel.js");

        $css_files = array(
            "themes/openstack/css/bootstrap.min.css",
            'themes/openstack/bower_assets/fontawesome/css/font-awesome.min.css',
            "themes/openstack/css/combined.css",
            "themes/openstack/css/navigation_menu.css",
            "themes/openstack/css/dropdown.css",
        );

        foreach($css_files as $css_file) {
            Requirements::css($css_file);
        }
	}


	public function index(SS_HTTPRequest $r) 
	{	
		return $this->renderWith('StyleGuide');
	}

	protected function handleAction($request, $action)
	{
		return $this->index($request);
	}
}
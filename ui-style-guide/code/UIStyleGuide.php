<?php

class UIStyleGuide extends Page_Controller
{

	public function init()
	{
		parent::init();
		if(!Director::isDev()) {
			return $this->httpError(403, 'The style guide is only viewable in dev mode');
		}		
	}


	public function index(SS_HTTPRequest $r) 
	{	
		return $this->renderWith(['StyleGuide','Page']);
	}
}
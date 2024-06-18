<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Group.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';

class GroupController extends Controller {

	public function getGroups() {
        $groups = Group::get();

        exit(json_encode($groups));
	}
}
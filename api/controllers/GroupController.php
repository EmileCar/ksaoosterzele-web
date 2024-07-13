<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Group.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';

class GroupController extends Controller {

	public function getGroups() {
		if (isset($_GET['select'])) {
			$groups = Group::select('id', 'name')->get();
		} else {
			$groups = Group::get();
		}

		exit(json_encode($groups));
	}
}
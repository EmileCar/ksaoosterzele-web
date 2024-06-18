<?php

class Controller {

  public $route;

  public function filter() {
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $actionMethod = $this->route['methods'][$requestMethod];
    call_user_func(array($this, $actionMethod));
  }
}

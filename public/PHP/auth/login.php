<?php

include('../storeFunction.php');

$user = hash('md5', file_get_contents('php://input'));
login($user);

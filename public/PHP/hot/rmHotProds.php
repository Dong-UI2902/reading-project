<?php

include('../storeFunction.php');

$newItem = json_decode(file_get_contents('php://input'));
if(checkCookie()) {
    rmHot("store/hot.txt", $newItem);
}
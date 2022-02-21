<?php

include('../storeFunction.php');

$newItem = json_decode(file_get_contents('php://input'));
if(checkCookie()) {
    addHot("store/hot.txt", $newItem);
}

<?php

include('../storeFunction.php');

$newItem = file_get_contents('php://input');
if(checkCookie()) {
    deleteProduct("store/data.txt", $newItem);
}

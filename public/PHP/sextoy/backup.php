<?php
$file = '../../data/store/data.txt';
$newfile = '../../data/store/data.txt.bak';

header('Status: ' . 200);
if (!copy($file, $newfile)) {
    header('Status: ' . 501);
    echo "failed to copy $file...\n";
}
?>
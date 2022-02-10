<?php

require_once('response.php');
function getData($file)
{
    if (!is_file($file)) {
        return error("Không tìm thấy File theo đường dẫn: " . $file);
    }

    if (!is_writable($file)) {
        return error("Không thể ghi vào " . $file);
    }

    $json = json_decode(file_get_contents($file), true);

    return success($json);
}
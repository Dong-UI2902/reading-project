<?php

const PATH = '../../data/';

function completePath(string $path): string
{
    return PATH . $path;
}

function getData($path)
{
    $file = completePath($path);

    if (!is_file($file)) {
        return "Không tìm thấy File theo đường dẫn: " . $file;
    }

    if (!is_writable($file)) {
        return "Không thể ghi vào " . $file;
    }

    return json_decode(file_get_contents($file), true);
}

function putContent($path, $json): bool
{
    if ($json) {
        $file = completePath($path);

        if (file_put_contents($file, json_encode($json), LOCK_EX)) {
            return true;
        }
    }

    return false;
}

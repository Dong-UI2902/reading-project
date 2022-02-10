<?php

function success($data)
{
    return [
        "message" => "success",
        "data" => $data,
    ];
}

function error($error)
{
    return [
        "message" => $error,
        "data" => null,
    ];
}

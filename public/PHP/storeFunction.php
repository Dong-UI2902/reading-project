<?php

include('dataTrait.php');

const CODE = 501;
const MESSAGE = 'Server data error';

function getCookie()
{
    return $_COOKIE['jwt'];
}

function checkCookie(): bool
{
    $cookie = getCookie();
    if ($cookie) {
        cookie(time: time() + 3600 * 2, value: $cookie);

        return true;
    }

    response(401, 'Unauthorized');
    cookie(time: time() - 999999);

    return false;
}

function cookie($time, $value = null)
{
    setcookie("jwt", $value, $time, "/");
}

function response($code, $message = null)
{
    $cookie = getCookie();
    if ($cookie) {
        cookie(time: time() + 3600 * 2, value: $cookie);
    }

    $phpSapiName = substr(php_sapi_name(), 0, 3);
    if ($phpSapiName == 'cgi' || $phpSapiName == 'fpm') {
        header('Status: ' . $code . ' ' . $message);
    } else {
        $protocol = $_SERVER['SERVER_PROTOCOL'] ?? 'HTTP/1.0';
        header($protocol . ' ' . $code . ' ' . $message);
    }
}

function addProduct($file, $newItem)
{
//    $file = "other/data.txt";
    $data = getData($file);
    $newItem->id = $data[count($data) - 1]['id'] + 1;

    if (is_array($data)) {
        $data[] = $newItem;
        if (putContent($file, $data)) {
            response(201, 'Created');
            echo json_encode($newItem);
        }
    } else {
        response(CODE, MESSAGE);
        echo json_encode($data);
    }
}

function updateProduct($file, $newItem)
{
    $data = getData($file);
    if ($data) {
        foreach ($data as $key => $value) {
            if ($value["id"] == $newItem->id) {
                $data[$key] = $newItem;
                if (putContent($file, $data)) {
                    response(204);
                }
                break;
            }
        }
    } else {
        response(CODE, MESSAGE);
        echo json_encode($data);
    }
}

function deleteProduct($file, $newItem)
{
    $data = getData($file);
    if ($data) {
        foreach ($data as $key => $value) {
            if ($value["id"] == $newItem) {
                unset($data[$key]);

                if (putContent($file, array_values($data))) {
                    response(204);
                }
                break;
            }
        }
    } else {
        response(CODE, MESSAGE);
        echo json_encode($data);
    }
}

function login($input)
{
    $file = "auth/users.txt";
    $data = getData($file);
    if ($data) {
        $result = "Sai tài khoản hoặc mật khẩu";
        response(401, 'Unauthorized');
        cookie(time: time() - 999999);
        $role = ["role"];
        $password = ["password"];

        foreach ($data as $key => $value) {
            $tempUser = json_encode(array_diff_key($value, array_flip($role)));
            $hashed = hash('md5', $tempUser);
            if ($input == $hashed) {
                response(200);
                cookie(time: time() + 3600 * 2, value: $hashed);

                $result = json_encode(array_diff_key($value, array_flip($password)));
                break;
            }
        }
        echo $result;
    } else {
        echo json_encode($data);
    }
}

function logout()
{
    response(204);
    cookie(time: time() - 999999);
}

function addHot($file, $newItem)
{
    $data = getData($file);

    if (is_array($data)) {
        $data[] = $newItem;
        if (putContent($file, $data)) {
            response(201, 'Created');
            echo json_encode($newItem);
        }
    } else {
        response(CODE, MESSAGE);
        echo json_encode($data);
    }
}

function rmHot($file, $newItem)
{
    $data = getData($file);

    if (is_array($data)) {
        foreach ($data as $key => $value) {
            if ($value == $newItem) {
                unset($data[$key]);

                if (putContent($file, array_values($data))) {
                    response(204);
                }
                break;
            }
        }
    } else {
        response(CODE, MESSAGE);
        echo json_encode($data);
    }
}

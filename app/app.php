<?php 
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('X-Fowarded-With: XmlHttpRequest');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
// if($method == "OPTIONS") {
//     die();
// }


$json = file_get_contents('php://input');
$data = json_decode($json);

$code = $data->code;
$redirect_uri = $data->redirect_uri;

/*
    code,
    client_id,
    client_secret,
    redirect_uri: 'http://127.0.0.1:5500',
    grant_type: 'authorization_code',
*/
/* GOOGLE */

$client_id = '495147047249-1spimj483r8arakm7qr9ld0ftht0d8vr.apps.googleusercontent.com';
$client_secret = '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';
$grant_type = "authorization_code";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"https://oauth2.googleapis.com/token");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,
            "code=$code&client_id=$client_id&client_secret=$client_secret&redirect_uri=$redirect_uri&grant_type=$grant_type");

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));


// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);

curl_close ($ch);

// further processing ....
// if ($server_output == "OK") { ... } else { ... }

/* GOOGLE */

echo json_encode([
    "respuesta" => true,
    "body"=> $server_output
]);

?>
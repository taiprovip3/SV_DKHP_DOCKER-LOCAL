<?php
ob_start();
header('Content-type: text/html; charset=utf-8');
function execPostRequest($url, $data) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data))
    );
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    //execute post
    $result = curl_exec($ch);
    //close connection
    curl_close($ch);
    return $result;
}
if(!isset($_POST['momo_method'])) {
    echo "Internal Server Error.";
    return;
} else {
    $momo_method = $_POST['momo_method'];
    if($momo_method == "") {
        echo "Internal Server Error!";
        return;
    }
}
if(!isset($_POST['total_payment'])) {
    echo "Internal Server Error!";
    return;
} else {
    $total_payment = $_POST['total_payment'];
    if($total_payment <= 0 ) {
        echo "Internal Server Error!";
        return;
    }
}
if(!isset($_POST['maSinhVien'])) {
    echo "Internal Server Error!";
    return;
} else {
    $maSinhVien = $_POST['maSinhVien'];
    if($maSinhVien <= 0) {
        echo "Internal Server Error!";
        return;
    }
}

    $maSinhVien = $_POST['maSinhVien'];
    //Bắt đầu tạo QR code để call API...
    $total = $_POST['total_payment'];
    $unDebtIds = 'Array';

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "http://localhost:8080/api/payment/createTransaction/".$maSinhVien."/".$total."/".$unDebtIds."/EMPTY");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);

    $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
    $partnerCode = 'MOMOBKUN20180529';
    $accessKey = 'klm05TvNBzhg7h7j';
    $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';

    $orderInfo = "Thanh toán qua MoMo QR (Quét mã app momo)";
    $amount = $total;
    $description = "testdescription";
    $partnerClientId = "";
    $orderId = time() ."";
    $redirectUrl = "http://localhost:4000/student/recharge/callback";
    $ipnUrl = "http://localhost:8000/momo/momo-ipn.php";
    $extraData = $output;

    $requestId = time() . "";
    $requestType = ($momo_method == "MOMO_QR") ? "captureWallet" : "payWithATM";
    $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;

    $rawHashIPN = "accessKey=" . $accessKey . "&orderId=" . $orderId . "&partnerCode=" . $partnerCode . "&requestId=" . $requestId;
    $signatureIPN = hash_hmac("sha256", $rawHashIPN, $secretKey);
    $ipnJsonData = (object) [
        'paymentId' => $output,
        'requestId' => $requestId,
        'orderId' => $orderId,
        'signature' => $signatureIPN,
        'lang' => 'vi'
    ];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8080/api/payment/updateMomoIpn');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ipnJsonData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    if ($response == false) {
        $curlError = curl_error($ch);
        exit();
    }

    $signature = hash_hmac("sha256", $rawHash, $secretKey);
    $data = array('partnerCode' => $partnerCode,
        'partnerName' => "Test",
        "storeId" => "MomoTestStore",
        'requestId' => $requestId,
        'amount' => $amount,
        'orderId' => $orderId,
        'orderInfo' => $orderInfo,
        'redirectUrl' => $redirectUrl,
        'ipnUrl' => $ipnUrl,
        'lang' => 'vi',
        'extraData' => $extraData,
        'requestType' => $requestType,
        'signature' => $signature);
    $result = execPostRequest($endpoint, json_encode($data));
    $jsonResult = json_decode($result, true);  // decode json
    // print_r($jsonResult);
    header('Location: ' . $jsonResult['payUrl']);
    ob_end_flush();
?>
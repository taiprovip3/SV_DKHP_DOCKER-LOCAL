<?php
    ob_start();
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
    function isExpired($datetimeStr) {
        $expiredTime = DateTime::createFromFormat('Y-m-d\TH:i:s.uO', $datetimeStr);
        $currentTime = new DateTime();
        $interval = $expiredTime->diff($currentTime);
        return $interval->invert == 0; // return true nếu thời gian chưa hết hạn, false nếu đã hết hạn
    }
    $maThanhToanGiaoDich = $_GET['maThanhToanGiaoDich'];
    $maSinhVien = $_GET['maSinhVien'];
    $maCongNo = $_GET['maCongNo'];
    $url = "http://localhost:8080/api/payment/getTokenByPaymentAndStudentId/".$maThanhToanGiaoDich."/".$maSinhVien;
    $response = file_get_contents($url);
    if ($response === false) {
        // xảy ra lỗi kết nối đến API
        echo "[SYSTEM] > Không thể kết nối đến API";
    } else if (empty($response)) {
        // trả về dữ liệu rỗng hoặc không tìm thấy tài nguyên
        echo "[SYSTEM] > Không tìm thấy tài nguyên hoặc API trả về dữ liệu rỗng";
    } else {
        // xử lý dữ liệu trả về từ API
        $token = $response;
        $options = array(
            'http' => array(
                'header' => "Authorization: $token\r\n"
            )
        );
        $url = "http://localhost:8080/api/payment/getPaymentById/".$maThanhToanGiaoDich;
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        $response_parse = json_decode($response);
        if($response_parse->status === false) {// Nếu giao dich chưa duoc thuc hien
            $expiredTime = $response_parse->expiredTime;
            if (isExpired($expiredTime)) {
                echo "Giao dịch đã quá hạn. Vui lòng thử lại!";
            } else {
                $url = "http://localhost:8080/api/debt/getUnDebtById/".$maCongNo;
                $response = file_get_contents($url, false, $context);
                $response_parse = json_decode($response);
                $soTienCongNo = $response_parse->monHoc->soTinChi * 850000;

                $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
                $partnerCode = 'MOMOBKUN20180529';
                $accessKey = 'klm05TvNBzhg7h7j';
                $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';

                $orderInfo = "Thanh toán qua MoMo QR (Quét mã app momo)";
                $amount = $soTienCongNo;
                $orderId = time() ."";
                $redirectUrl = "http://192.168.1.2:4000/student/payment/callback";
                $ipnUrl = "http://localhost:8000/momo/momo-ipn.php";
                $extraData = $maThanhToanGiaoDich;

                $requestId = time() . "";
                $requestType = ($momo_method == "MOMO_QR") ? "captureWallet" : "payWithATM";
                $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;


                $rawHashIPN = "accessKey=" . $accessKey . "&orderId=" . $orderId . "&partnerCode=" . $partnerCode . "&requestId=" . $requestId;
                $signatureIPN = hash_hmac("sha256", $rawHashIPN, $secretKey);
                $ipnJsonData = (object) [
                    'paymentId' => $maThanhToanGiaoDich,
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
                header('Location: ' . $jsonResult['payUrl']);
                ob_end_flush();
            }
        } else {// Hết hạn gioa dịch
            echo "Giao dịch thanh toán đã hết hạn";
        }
    }
?>
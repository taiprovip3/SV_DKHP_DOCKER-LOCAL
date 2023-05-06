import React from 'react';
import { Box, Button, NativeBaseProvider, Text } from 'native-base';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import { LOCAL_EJS_API_URL, LOCAL_PHP_API_URL } from '@env';


const PaymentPage = ({ navigation, route }) => {
  console.log('LOCAL_EJS_API_URL=',LOCAL_EJS_API_URL + LOCAL_PHP_API_URL);

  const { debtData } = route.params;
  console.log("debtData=",debtData);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  let url = "";
  if(debtData.service === "PAYPAL")
    url = LOCAL_EJS_API_URL+"/paypal/payment";
  else {
    if(debtData.service === "MOMO_QR" || debtData.service === "MOMO_ATM")
      url = LOCAL_PHP_API_URL+"/momo/momo-mobile-implements.php";
    if(debtData.service === "VNPAY")
      url = LOCAL_PHP_API_URL+"/vnpay/vnpay-mobile.php";
    if(debtData.service === "STUDENT_WALLET")
      url = LOCAL_EJS_API_URL+"/wallet/payment";
  }
  const query = [];

  for (let key in debtData) {
    if (debtData.hasOwnProperty(key)) {
      // thay aCongNo thành maCongNo trong chuỗi query
      query.push(key === 'maCongNo' ? 'maCongNo' + '=' + encodeURIComponent(debtData[key].toString()) : key + '=' + encodeURIComponent(debtData[key].toString()));
    }
  }

  const queryString = query.join('&');
  const fullUrl = url + '?' + queryString;
  console.log("uriPath=",fullUrl);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleLoad = () => {
    console.log('WebView loaded successfully');
  };

  const handleError = () => {
    console.log('WebView failed to load');
  };

  const handleResponse = (data) => {
    console.log("dataReponseChange=",data);
    if(data.title === 'ErukaLearn') {
      
      const url = data.url;
      const searchString = "/student";
      if (url.includes(searchString)) {
        console.log(`Chuỗi "${searchString}" tồn tại trong URL`);
        navigation.navigate("DebtPage");
      }
    }
  }

  return (
    <NativeBaseProvider>
      <Box zIndex="1"><Toast position='top' /></Box>
      {/* <Button onPress={openModal}>Mở Modal</Button> */}
      {/* <Modal visible={isModalOpen} animationType="slide" onRequestClose={() => setIsModalOpen(false)}>
        <Box flex="1">
        </Box>
      </Modal> */}
      <WebView 
        source={{ uri: fullUrl }}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: '100%', height: '100%' }}
        javaScriptEnabled={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
        onNavigationStateChange={(data) => handleResponse(data)}
      />
    </NativeBaseProvider>
  );
};

export default PaymentPage;
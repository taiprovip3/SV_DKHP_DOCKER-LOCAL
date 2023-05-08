import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-toast-message';
import { LOCAL_EJS_API_URL, LOCAL_PHP_API_URL } from '@env';


const TopupPage = ({ navigation, route }) => {
  console.log('LOCAL_EJS_API_URL=', LOCAL_EJS_API_URL + LOCAL_PHP_API_URL);

  const { rechargeData } = route.params;
  let url = "";
  switch (rechargeData.service) {
    case "PAYPAL - WALLET":
      url = LOCAL_EJS_API_URL+"/paypal/topup";   
      break;
    case "MOMO - WALLET":
      url = LOCAL_PHP_API_URL+"/momo-recharge/momo-mobile-implements.php"; 
      break;
    case "VNPAY - WALLET":
      url = LOCAL_PHP_API_URL+"/vnpay-recharge/vnpay-mobile.php"; 
      break;
    default:
      break;
  }
  const query = [];
  for (let key in rechargeData) {
    if (rechargeData.hasOwnProperty(key)) {
      // thay aCongNo thành maCongNo trong chuỗi query
      query.push(key === 'maCongNo' ? 'maCongNo' + '=' + encodeURIComponent(rechargeData[key].toString()) : key + '=' + encodeURIComponent(rechargeData[key].toString()));
    }
  }

  const queryString = query.join('&');
  const fullUrl = url + '?' + queryString;

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
        navigation.navigate("RechargePage");
      }
    }
  }

  return (
    <NativeBaseProvider>
      <Box zIndex="1"><Toast position='top' /></Box>
      <WebView 
        source={{ uri: fullUrl }}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: '100%', height: '100%' }}
        javaScriptEnabled={true}
        onNavigationStateChange={(data) => handleResponse(data)}
      />
    </NativeBaseProvider>
  );
};

export default TopupPage;
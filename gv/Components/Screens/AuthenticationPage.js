import axios from 'axios';
import { Box, NativeBaseProvider, Text, Image, Center, Input, Button, Modal, Icon, Pressable } from 'native-base';
import React from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Toast from 'react-native-toast-message';
import publicIP from 'react-native-public-ip';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

const AuthenticationPage = ({ navigation }) => {

  const { setToken, currentUser, setCurrentUser } = React.useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const [maGiaoVien, setMaGiaoVien] = React.useState("315067680");
  const [password, setPassword] = React.useState("123123az");
  const [showPassword, setShowPassword] = React.useState(false);
  const [network, setNetwork] = React.useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const checkInternetConnection = async () => {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected;
  };
  const initSkeleton = async () => {
    console.log('initSkeleton');;
    const isConnected = await checkInternetConnection();
    if(!isConnected) {
      console.log('no connection network!');
      setNetwork(false);
      return;
    }
    try {
      setIsButtonDisabled(true);
      const teacherToken = await AsyncStorage.getItem('teacherToken');
      const maGiaoVien = await AsyncStorage.getItem('maGiaoVien');
      if (teacherToken && maGiaoVien) {
        const javaIp = await publicIP();
        const response = await axios.get("http://"+ javaIp +":8080/api/teacher/getTeacherById/"+maGiaoVien, {headers: {"Authorization": teacherToken}});
        if(response.data) {//Nếu có dataStudent trả về là token còn dùng dcs
          setToken(teacherToken);
          setCurrentUser(response.data);
          Toast.show({
            type: 'success',
            text1: 'Tự động đăng nhập',
            text2: 'We"ll redirect you soon.. Please wait!'
          });
          setTimeout(() => {
            navigation.navigate("Homepage");
          }, 100);
        }
      } else {
        setIsButtonDisabled(false);
        console.log('No session storage found!');
      }
    } catch (error) {
      console.log({ error });
      setIsButtonDisabled(false);
    }
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Do something here to re-render PageOne, for example:
      console.log("PageOne is focused");
      initSkeleton();
    });
    return unsubscribe;
  }, [navigation]);
  React.useEffect(() => {
    if(!currentUser) {
      initSkeleton();
    }
  },[currentUser]);

  const handleLogin = async () => {
      try {
        setIsButtonDisabled(true);
        if(maGiaoVien != "" && password !== "") {
          const userDTO = {username: "gv"+maGiaoVien, password};
          const javaIp = await publicIP();
          const response = await axios.post("http://"+ javaIp +":8080/api/login", userDTO);
          if(response.data) {
              const token = response.data;
              setToken(token);
              const response2 = await axios.get("http://"+ javaIp +":8080/api/teacher/getTeacherById/"+maGiaoVien, {headers: {"Authorization": token}});
              if(response2.data) {
                const teacherData = response2.data;
                setCurrentUser(teacherData);
                Toast.show({
                    type: 'success',
                    text1: 'Login successfully',
                    text2: 'We"ll redirect you soon.. Please wait!'
                });
                await AsyncStorage.setItem('teacherToken', token);
                await AsyncStorage.setItem('maGiaoVien', maGiaoVien);
                
                setTimeout(() => {
                  navigation.navigate("Homepage");
                }, 500);
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Data không tồn tại',
                  text2: 'Tài khoản của bạn đã bị xóa hoặc disabled trong hệ thống'
                });
                throw new Error('No account data exits in database!');
              }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Sai thông tin',
              text2: 'Sai mã giáo viên hoặc mật khẩu đăng nhập!'
            });
            throw new Error('No account data exits in database!');
          }
        }
      } catch (error) {
        setIsButtonDisabled(false);
        console.log('Error: ', error.message);
      }
  }

  return (
    <NativeBaseProvider>
    <Box zIndex="1"><Toast position='top' /></Box>
        {
          !network &&
          <Box position="absolute" width="100%" top="0">
            <Center>
              <Text><FontAwesome name="close" size={15} color="red" /> Kết nối internet không khả dụng <MaterialCommunityIcons name="wifi-alert" size={15} color="red" />. Tuy nhiên bạn vẫn có thể xem lịch dạy đồng bộ trước đó.</Text>
              <Text fontSize="lg" underline onPress={() => navigation.navigate('Timetable')}>Xem lịch dạy</Text>
            </Center>
        </Box>
        }
        <Box flex="1" p="5">
            <Box margin="auto" w="100%">
                <Box>
                    <Image source={{ uri: "https://images.cooltext.com/5639905.png" }} alt="el-logo-gv" width={'100%'} height={'10'} />
                </Box>
                <Box borderWidth="1" borderColor="light.400" padding="5" borderRadius="2xl" mt={'1'}>
                    <Text fontSize="lg">Mã giáo viên:</Text>
                    <Input placeholder='Mã xác định giáo viên được cấp' onChangeText={(e) => setMaGiaoVien(e)} value={maGiaoVien} p="5" fontSize="lg" />
                    <Text fontSize="lg">Mật khẩu:</Text>
                    <Input
                        placeholder='Vui lòng nhập vào mật khẩu...'
                        type={ showPassword ? 'text' : 'password'}
                        onChangeText={(e) => setPassword(e)}
                        value={password} 
                        p="5" fontSize="lg"
                        InputRightElement={
                          <Pressable onPress={() => setShowPassword(!showPassword)}>
                            <Icon
                              as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                              size={10}
                              mr="2"
                              color="muted.400"
                            />
                          </Pressable>
                        }
                    />
                    <Button disabled={isButtonDisabled} onPress={() => handleLogin()} bg="indigo.600" p="5" my="1" _text={{ fontSize: "lg", fontWeight: "bold" }}>Đăng nhập</Button>
                    <Center><Text color="blue.700" onPress={() => setShowModal(true)}>Quên mật khẩu?</Text></Center>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                          <Modal.CloseButton />
                          <Modal.Header><Text fontWeight="bold">Trợ giúp `Quên mật khẩu`</Text></Modal.Header>
                          <Modal.Body>
                              <Text><Text fontWeight="bold">1.</Text> Tài khoản không thể lấy lại mật khẩu theo các thông thường tương tác với hệ thống.</Text>
                              <Text><Text fontWeight="bold">2.</Text> Vui lòng gặp trức tiếp giáo vụ khoa bạn trực thuộc hoặc giáo vụ tại phòng đào tạo để được hỗ trợ lấy lấy mật khẩu sớm nhất.</Text>
                              <Text><Text fontWeight="bold">3.</Text> Liên hệ SĐT: (+84) 0338188506 <Text fontStyle={'italic'}>(Giáo vụ PĐT)</Text> để được hỗ trợ.</Text>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button.Group space={2}>
                              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                              }}>
                                Đóng lại
                              </Button>
                            </Button.Group>
                          </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Box>
            </Box>
        </Box>
    </NativeBaseProvider>
    
  )
};

export default AuthenticationPage;
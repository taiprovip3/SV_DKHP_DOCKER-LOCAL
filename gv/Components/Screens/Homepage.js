import { Box, Center, Divider, HStack, Image, NativeBaseProvider, Pressable, Stack, Text, Button, ScrollView, Modal, Input, Icon } from 'native-base';
import React from 'react';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../Providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homepage = ({ navigation }) => {

  const { token, setToken, currentUser, setCurrentUser } = React.useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = React.useState(false);
  const [optionModalVisible, setOptionModalVisible] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [reNewPassword, setReNewPassword] = React.useState("");
  const gioiTinhShortCut = { NAM: 'Nam', NU: 'Nữ' };
  const loaiGiaoVienShortCut = {GIAO_VIEN_BO_MON: 'Giáo viên bộ môn', GIAO_VIEN_CHU_NHIEM: 'Giáo viên chủ nhiệm', GIAO_VIEN_HUONG_DAN: ' Giáo viên hướng dẫn', GIAO_VIEN_GIAM_SAT: 'Giáo viên giám sát'};

  if(!currentUser && !token) {
    navigation.navigate("AuthenicationPage");
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  function calculateAge(birthday) { 
    var ageDifMs = Date.now() - new Date(birthday);
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  

  const handleLogOut = () => {
    setOptionModalVisible(false);
    setToken(null);
    setCurrentUser(null);
    AsyncStorage.removeItem('teacherToken');
    AsyncStorage.removeItem('maGiaoVien');
    navigation.navigate("AuthenticationPage");
  }
  const handleCurrentPasswordChange = React.useCallback((newText) => {
    setCurrentPassword(newText);
  }, []);
  const handleNewPasswordChange = React.useCallback((newText) => {
    setNewPassword(newText);
  }, []);
  const handleReNewPasswordChange = React.useCallback((newText) => {
    setReNewPassword(newText);
  }, []);
  const changePassword = async () => {
    if(currentPassword.length < 8 || currentPassword.length > 255) {
      Toast.show({
        type: 'error',
        text1: 'Mật khẩu hiện tại',
        text2: 'Trường nhập mật khẩu hiện tại không hợp lệ!'
      });
      return;
    }
    if(newPassword.length < 8 || reNewPassword.length <8) {
      Toast.show({
        type: 'error',
        text1: 'Mật khẩu mới',
        text2: 'Trường nhập mật khẩu mới không hợp lệ!'
      });
      return;
    }
    if(newPassword !== reNewPassword) {
      Toast.show({
        type: 'error',
        text1: 'Nhập lại mật khẩu mới',
        text2: 'Nhập lại mật khẩu mới không trùng khớp!'
      });
      return;
    }
    // Handle change password here...
    const ChangePasswordRequestDTO = {
      oldPassword: currentPassword,
      newPassword: reNewPassword,
    }
    try {
      const response = await axios.post("http://erukalearn.me:8080/api/change-password", ChangePasswordRequestDTO, {headers: {"Authorization": token}});
      if(response.data) {
        Toast.show({
          type: 'success',
          text1: 'Thay đổi mật khẩu thành công',
          text2: 'Hãy sử dụng mật khẩu mới cho lần đăng nhập kế!'
        });
        setChangePasswordModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Thay đổi mật khẩu thất bại',
        text2: 'Mật khẩu hiện tại không chính xác!'
      });
    }
  }

  return (
    <NativeBaseProvider>
        <Box flex="1" borderWidth={'1'} borderColor="amber.500">
            <ScrollView>
                <HStack alignItems="center" justifyContent="space-between">
                    <Box>
                        <Text>Trang chủ -</Text>
                        <Text bold>Giảng viên</Text>
                    </Box>
                    <Box>
                      <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_IUH.png/320px-Logo_IUH.png" }} alt="iuh-logo" width={"32"} height={"16"} />
                    </Box>
                    <Box>
                        <Pressable onPress={() => setOptionModalVisible(true)}>
                            <Center>
                                <FontAwesome5 name="user-circle" size={24} color="blue" />
                                <Text underline>Tài khoản</Text>
                            </Center>
                        </Pressable>
                    </Box>
                </HStack>
                <Center>
                    <Divider my="2" _light={{
                          bg: "gray.500"
                        }} _dark={{
                          bg: "muted.50"
                        }}
                        w="75%"
                    />
                </Center>
                <Box flex="1" borderWidth="1" borderColor='gray.500' borderRadius={'3xl'} mx="5" px="3" pb="2">
                    <Box mt="3">
                        <Center>
                            <Image source={{
                            uri: currentUser.avatar
                            }} alt="Alternate Text" size="xl" borderRadius={150} />
                            <Text color="blue.900">Ảnh 3x4</Text>
                        </Center>
                    </Box>
                    <Box flex="1">
                        <HStack>
                            <Box w="1/2">
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Họ tên:</Text> <Text color="gray.600" fontSize="xs">{currentUser.tenGiaoVien}</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Năm sinh:</Text> <Text color="gray.600" fontSize="xs">{formatDate(currentUser.ngaySinh)} ({calculateAge(currentUser.ngaySinh)} tuổi)</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Giới tính:</Text> <Text color="gray.600" fontSize="xs">{gioiTinhShortCut[currentUser.gioiTinh]}</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Địa chỉ:</Text> <Text color="gray.600" fontSize="xs">{currentUser.diaChi}</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>SĐT:</Text> <Text color="gray.600" fontSize="xs">{currentUser.sdt}</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Email:</Text> <Text color="gray.600" fontSize="xs">{currentUser.taiKhoan.email}</Text></Text>
                                </Box>
                            </Box>
                            <Box w="1/2">
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Bậc đào tạo:</Text> <Text color="gray.600" fontSize="xs">Đại học chính quy</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Bằng cấp:</Text> <Text color="gray.600" fontSize="xs">Cử nhân</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Ngày vào trường:</Text> <Text color="gray.600" fontSize="xs">{currentUser.ngayVaoLam}</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Chức vụ:</Text> <Text color="gray.600" fontSize="xs">[{loaiGiaoVienShortCut[currentUser.loaiGiaoVien]}]</Text></Text>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <Text><Text bold>Mã giáo viên:</Text> <Text color="gray.600" fontSize="xs">#{currentUser.maGiaoVien}</Text></Text>
                                </Box>
                            </Box>
                        </HStack>
                    </Box>
                </Box>
                <Center><Text bold underline fontSize="sm">Feature:</Text></Center>
                <Box alignItems="center" justifyContent="center" display="flex">
                    <HStack p="3" space="5" justifyContent="space-evenly">
                          <Pressable borderWidth="0.5" borderColor='gray.300' p="4" display="flex" alignItems="center" justifyContent="center" background="gray.200" borderRadius="lg" onPress={() => navigation.navigate("Timetable")} w="1/3">
                              <MaterialCommunityIcons name="calendar-multiple-check" size={32} color="teal" />
                              <Text fontSize="sm">Xem lịch</Text>
                              <Text fontSize="sm">dạy học</Text>
                          </Pressable>
                        <Pressable borderWidth="0.5" borderColor='gray.300' p="4" display="flex" alignItems="center" justifyContent="center" background="gray.200" borderRadius="lg" onPress={() => navigation.navigate("CrudScore")} w="1/3">
                            <MaterialCommunityIcons name="pencil-box-multiple" size={32} color="teal" />
                            <Text fontSize="sm">Nhập điểm</Text>
                            <Text fontSize="sm">Cho sinh viên</Text>
                        </Pressable>
                    </HStack>
                    <HStack p="3" space="5" justifyContent="space-evenly">
                          <Pressable borderWidth="0.5" borderColor='gray.300' p="4" display="flex" alignItems="center" justifyContent="center" background="gray.200" borderRadius="lg" onPress={() => setChangePasswordModalVisible(true)} w="1/3">
                              <MaterialCommunityIcons name="onepassword" size={32} color="teal" />
                              <Text fontSize="sm">Đổi mật</Text>
                              <Text fontSize="sm">khẩu</Text>
                          </Pressable>
                    </HStack>
                </Box>
                <Box>
                  {" "}
                </Box>
                <Box>
                  {" "}
                </Box>
                <Box position="absolute" bottom="0">
                    <HStack>
                      <Text fontSize="xs">ErukaLearn (gv.el.com)</Text>
                      <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
                      <Text fontSize="xs">Secure.</Text>
                      {/* <MaterialCommunityIcons name="security" size={15} color="black" /> */}
                      <AntDesign name="Safety" size={15} color="aqua" />
                    </HStack>
                </Box>
            </ScrollView>
        </Box>
        <Modal isOpen={changePasswordModalVisible} onClose={setChangePasswordModalVisible} size={"xl"}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Body>
                    <ScrollView>
                        <Box py="2">
                            <Text>Mật khẩu hiện tại: <Text color="error.600">*</Text> </Text>
                            <Input
                                placeholder='Nhập mật khẩu hiện tại..'
                                type={showPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Icon
                                        as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                    />
                                    </Pressable>
                                }
                                value={currentPassword}
                                onChangeText={handleCurrentPasswordChange}
                                p="5"
                                fontSize="md"
                            />
                        </Box>
                        <Box py="2">
                            <Text>Mật khẩu mới: <Text color="error.600">*</Text> </Text>
                            <Input
                                placeholder='Nhập mật khẩu mới..'
                                type={showPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Icon
                                        as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                    />
                                    </Pressable>
                                }
                                value={newPassword}
                                onChangeText={handleNewPasswordChange}
                                p="5"
                                fontSize="md"
                            />
                        </Box>
                        <Box py="2">
                            <Text>Xác nhận mật khẩu mới: <Text color="error.600">*</Text> </Text>
                            <Input
                                placeholder='Nhập lại mật khẩu mới..'
                                type={showPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Icon
                                        as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                    />
                                    </Pressable>
                                }
                                value={reNewPassword}
                                onChangeText={handleReNewPasswordChange}
                                p="5"
                                fontSize="md"
                            />
                        </Box>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                _text={{ fontSize: 'md' }}
                                onPress={() => {
                                    setChangePasswordModalVisible(false);
                                }}
                                w="1/2"
                                p="2"
                            >Cancel
                            </Button>
                            {/* <Button
                                onPress={() => {handleLogOut()}}
                                bg="emerald.600"
                            >
                                Logout
                            </Button> */}
                            <Button
                                variant="outline"
                                bg="emerald.400"
                                _text={{ color: 'white', fontSize: 'md' }}
                                onPress={changePassword}
                                w="1/2"
                                p="2"
                            >Lưu thay đổi
                            </Button>
                        </Button.Group>    
                    </ScrollView>
                </Modal.Body>
            </Modal.Content>
        </Modal>
        <Modal isOpen={optionModalVisible} onClose={setOptionModalVisible} size={"lg"}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Đăng xuất Tài khoản</Modal.Header>
                <Modal.Body>
                    <Text>Tài khoản sau khi đăng xuất sẽ không còn lưu trữ vết cookie. Lần sau vào ứng dụng sẽ không còn tự động đăng nhập. Việc này sẽ có thể khiến tiến trình load page chậm hơn!</Text>
                </Modal.Body>
            <Modal.Footer>
                <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setOptionModalVisible(false);
                }}>
                    Cancel
                </Button>
                <Button
                    onPress={() => {handleLogOut()}}
                    bg="danger.400"
                >
                    Logout
                </Button>
                </Button.Group>
            </Modal.Footer>
            </Modal.Content>
        </Modal>
    </NativeBaseProvider>
  )
};

export default Homepage;
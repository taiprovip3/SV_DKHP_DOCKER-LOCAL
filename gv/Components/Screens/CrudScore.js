import { Box, Button, Center, Divider, HStack, Input, NativeBaseProvider, Radio, ScrollView, Text, VStack, } from 'native-base';
import React from 'react';
import axios from 'axios';
import { AuthContext } from '../Providers/AuthProvider';
import publicIP from 'react-native-public-ip';

const CrudScore = ({ navigation }) => {
    const [value, setValue] = React.useState(0);
    const [scores, setScores] = React.useState([]);
    const { token } = React.useContext(AuthContext);
    
    React.useEffect(() => {
        const getScores = async () => {
            const javaIp = await publicIP();
            const response = await axios.get("http://"+ javaIp +":8080/api/score/getScores", {headers: {"Authorization": token}});
            if(response.data)
                setScores(response.data);
        }
        getScores();
    }, []);

    const handleRadioButton = (e) => {
    
    }
  return (
    <NativeBaseProvider>
        <Box flex="1" borderColor="gray.400" borderWidth="0.5">
            <Box>
                <HStack justifyContent="center">
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Mã sinh viên</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Mã LHP</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Mã môn học</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm LT1</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm LT2</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm LT3</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm TH1</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm TH2</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm TH3</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm GK</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm CK</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm tổng kết</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm 4</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Điểm chữ</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Xếp loại</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Ghi chú</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Đạt?</Text></Box>
                    <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" fontWeight="extrabold" margin="auto" sub>Chọn</Text></Box>
                </HStack>
            </Box>
            <Box flex="1">
            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={e => {handleRadioButton(e)}}>
                <ScrollView>
                    <HStack justifyContent="center">
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>1</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>1</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>1000001</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>4</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>5</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>6</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>7</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>6</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>5</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>6</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>8</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>7</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>2</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>A</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>Giỏi</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>Không</Text></Box>
                        <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>Yes</Text></Box>
                        <Box w="5.8%" borderColor="black" borderWidth="0.5"><Radio value="1" my={1} size="sm">Chọn</Radio></Box>
                    </HStack>
                    {
                        scores.map(score => {
                            return <HStack justifyContent="center" key={Math.random()}>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.sinhVien.maSinhVien}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.lopHocPhan.maLopHocPhan}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.lopHocPhan.monHoc.maMonHoc}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemLT1}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemLT2}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemLT3}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemTH1}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemTH2}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemTH3}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemGK}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemCK}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemTongKet}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diem4}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.diemChu}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.xepLoai}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.ghiChu}</Text></Box>
                            <Box w="5.5%" borderColor="black" borderWidth="0.5"><Text fontSize="xs" margin="auto" sub>{score.pass}</Text></Box>
                            <Box w="5.8%" borderColor="black" borderWidth="0.5"><Radio value={score.maDiem} my={1} size="sm">Chọn</Radio></Box>
                        </HStack>
                        })
                    }
                </ScrollView>
                </Radio.Group>
            </Box>
            <Box p="0.5">
                <HStack>
                    <Box w="1/3"><Input placeholder='mã SV' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='mã LHP' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='mã môn học' size="xs"/></Box>
                </HStack>
            </Box>
            <Box p="0.5">
                <HStack>
                    <Box w="1/3"><Input placeholder='Điểm LT1' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Điểm LT2' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Điểm LT3' size="xs"/></Box>
                </HStack>
            </Box>
            <Box p="0.5">
                <HStack>
                    <Box w="1/3"><Input placeholder='Điểm TH1' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Điểm TH2' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Điểm TH3' size="xs"/></Box>
                </HStack>
            </Box>
            <Box p="0.5">
                <HStack>
                    <Box w="1/3"><Input placeholder='Điểm GK' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Điểm CK' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Điểm tổng kết' size="xs"/></Box>
                </HStack>
            </Box>
            <Box p="0.5">
                <HStack>
                    <Box w="1/3"><Input placeholder='Điểm 4' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Xếp loại' size="xs"/></Box>
                    <Box w="1/3"><Input placeholder='Ghi chú' size="xs"/></Box>
                </HStack>
            </Box>
            <Box p="0.5">
                <HStack>
                    <Box w="1/3"><Input placeholder='Đạt?' size="xs"/></Box>
                    <Box w="1/3"></Box>
                    <Box w="1/3"><Button size="xs">Submit</Button></Box>
                </HStack>
            </Box>
        </Box>
    </NativeBaseProvider>
  )
};

export default CrudScore;
import { NativeBaseProvider, Box, Image, Center, Text, HStack, Button, IconButton, ScrollView } from "native-base";
import apple from './assets/apple.png';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MyData } from "./Context";
import React from 'react';
import Toast from 'react-native-toast-message';


export default function Detailpage({ route, navigation }) {

  const {item} = route.params;
  const {carts} = React.useContext(MyData);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    if(quantity <= 0) {
      Toast.show({
          type: 'error',
          text1: 'Quantity selected must > 0',
          text2: 'Please try again!'
      });
      return;
    }
    Toast.show({
        type: 'success',
        text1: 'Added product to your carts',
        text2: 'Let check it out...'
    });
    carts.push(item);
    console.log('Carts added.');
  }

  return (
    <NativeBaseProvider>
    <Box zIndex="1"><Toast position='top' bottomOffset={20} /></Box>

        <Box p="2">
            <Center>
                <Image source={item.image} alt="Alternate Text" size="xl" borderColor="gray.400" borderWidth="1" borderRadius="10" />
            </Center>
        </Box>

        <Box p="2">
            <Center><Text fontWeight="bold" fontSize="lg" underline>{item.name}</Text></Center>
        </Box>

        <Box p="2" bg="white">
            <HStack justifyContent="space-between" alignItems="center">
                <Box>
                    <Text>Price:</Text>
                    <Text color="success.500" fontWeight="bold">${item.price}/kg</Text>
                </Box>
                <Box>
                    <Center>
                        <Text color="yellow.400" fontWeight="bold">⭐<Text>{item.rating}</Text></Text>
                        <Text color="yellow.600">(126 rating)</Text>
                    </Center>
                </Box>
                <Box>
                    <HStack justifyContent="center" alignItems="center">
                        <IconButton icon={<AntDesign name="minussquareo" size={24} color="black" />} onPress={() => setQuantity(prev => prev - 1)}/>
                        <Text color="success.500" fontWeight="bold">{quantity}kg</Text>
                        <IconButton icon={<AntDesign name="plussquareo" size={24} color="black" />} onPress={() => setQuantity(prev => prev + 1)} />
                    </HStack>
                    <Text>In stock: <Text color="success.500">{item.stock}</Text>kgs</Text>
                </Box>
            </HStack>
        </Box>


        <Box p="2" bg="white" mt="2">
            <Text fontWeight="bold" fontSize="2xl">Details</Text>
            <Text color="muted.600">{item.description}</Text>
        </Box>

        <Box p="2" bg="white" mt="2" flex="1">
            <Text fontWeight="bold" fontSize="2xl">Deliver Info</Text>
            <Text color="muted.600">Free home delivery to anywhere of Bangladesh.</Text>
            <Text>(<FontAwesome name="warning" size={20} color="orange" />) Rules of warranty:</Text>
            <Text> 1. Don't be break over in 24h after delivery package.</Text>
            <Text> 2. You have the evidence prove that the product have been damaged at the time you unbox.</Text>
            <Text> 3. Product have time left in about the time were writen on head lebel.</Text>
            <Text> 4. Product (s) not damaged so much by your hand made.</Text>
        </Box>


        <Box>
            <Button leftIcon={<FontAwesome name="cart-plus" size={24} color="white" />} bg="success.600" onPress={handleAddToCart}>Add to cart</Button>
        </Box>


    </NativeBaseProvider>
  );
}
import React, { Component } from 'react'
import { StyleSheet, View, Text, Button , Image} from 'react-native';



export default function Startpage({ navigation })  {

  return (
    <View style={styles.container}>
        <View>
            <Image style={styles.img1} source={require('./images/screen1img01.png')} />
        </View>
        <View>
            <Text style={styles.content1}>Fruitix</Text>
        </View>
        <View>
            <Text style={styles.content2}>We delivering fresh Fruits</Text>
        </View>
        <View>
            <Image style={styles.img1} source={require('./images/screen1img02.png')} />
        </View>
        <View>
            <Text style={styles.content2}>Countrywide Free Deliverry</Text>
        </View>
        <View style={{ margin:50 }}>
            <Button color={"#00cc00"} title='Get Started' onPress={()=>{navigation.navigate('Homepage')}} />
        </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    padding: '1%'
  },
  img1:{
    width: '90%',
    marginLeft:20
  },
  content1:{
    textAlign:'center',
    fontSize:40,
    fontWeight:'bold'
  },
  content2:{
   textAlign:'center',
   marginTop:10
   
  }
});

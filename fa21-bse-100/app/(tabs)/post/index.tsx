import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'


const styles = StyleSheet.create({
    input:{
        borderColor:'skyblue',
        borderWidth: 1,
        padding: 20,
        margin: 20,
        fontSize: 20
    }
  })


const post = () => {


    // const saveAPIData = async() => {

    //     // console.warn("test");
    //     const data = {
    //         name: "Sam",
    //         age : 34,
    //         email : "sam@test.com"
    //     }

    //     const url = "http://10.0.2.2:3000/users";
    //     let result = await fetch(url, {method : "POST" , headers:{"Content-Type": "application/json"} , body:JSON.stringify(data) })

    //     result = await result.json();
    //     console.log(result);
    // }



    const [name,setName] = useState('');
    const [age, setAge] = useState<number | null>(null);
    const [email,setEmail] = useState('');


    const saveData = async () => {
        console.warn(name);
        console.warn(age);
        console.warn(email);

        const url = "http://10.0.2.2:3000/users";
        let result = await fetch(url, {method : "POST" , headers:{"Content-Type": "application/json"} , body:JSON.stringify({name,email,age}) })

        result = await result.json();
        console.log(result);
    } 

  return (
    // <View>
    //   <Text style={{fontSize:30 }}>POST API Call </Text>
    //   <Button title="save data" onPress={saveAPIData} />
    // </View>



    <View>
        <Text style={{fontSize: 30}}> Post api with Input Field Data</Text>
        <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={(text)=>setName(text) }/>
        <TextInput style={styles.input} placeholder="Enter Age" value={age ? age.toString() : ''}  onChangeText={(text)=>setAge(Number(text)) } keyboardType="numeric"   />
        <TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={(text)=>setEmail(text) }/>
        <Button title='Save Data' onPress={saveData}/>
    </View>

  );

  
}

export default post
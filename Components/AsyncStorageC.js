import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, Button, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';






const AsyncStorageC = () => {
  const [valueGet, setValueGet] = useState([]);

  // const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  
  //Demo với object
  useEffect(() => {
    async function fetchData() {
      const valueGetData = await AsyncStorage.getItem('myTable');
      setValueGet(valueGetData);
    }
    fetchData(); 
  }, [value]);


  const handleStore = async () => {
    const data = await AsyncStorage.getItem('myTable');
    const table = data ? JSON.parse(data) : {};
    table[Math.floor(Math.random()*10000000)] = value; //table[key]=value là dòng add thêm item ??
    await AsyncStorage.setItem('myTable', JSON.stringify(table));
    setValue('')
    // setKey('')
  }

  const handleDeletStore = async () => {
    await AsyncStorage.setItem('myTable', JSON.stringify({}));
    setValue({})
  }


  //Demo với Array
  // useEffect(() => {
  //   async function fetchData() {
  //     const valueGetData = await AsyncStorage.getItem('myArr');
  //     setValueGet(valueGetData);
  //   }
  //   fetchData(); 
  // }, [value]);


  // const handleStore = async () => {
  //   if (value != '') {
  //     const data = await AsyncStorage.getItem('myArr');
  //     const arr = data ? JSON.parse(data) : [];
  //     if (value != '') {
  //       arr.push(value) // add thêm item
  //     }
  //     await AsyncStorage.setItem('myArr', JSON.stringify(arr));
  //     setValue('')
  //   } else {
  //     Alert.alert('Cần nhập giá trị hợp lệ!')
  //   }
  // }

  // const handleDeletStore = async () => {
  //   await AsyncStorage.setItem('myArr', JSON.stringify([]));
  //   setValue({})
  // }





  return (
    <View style = {{marginHorizontal: 15}}>
      {/* <TextInput
        placeholder="Enter the key"
        onChangeText={text => setKey(text)}
        value={key}
      /> */}
      <TextInput
        placeholder="Enter the value"
        onChangeText={text => setValue(text)}
        value={value}
      />
      <Button title="Store value" onPress={handleStore} />

      <Text style={{marginVertical: 15}}>{valueGet}</Text>

      <View style = {{marginBottom: 25}}>
        <Button title="Delete Data" onPress={handleDeletStore} style={{ marginVertical: 15 }} />
      </View>
    </View>
  );
}

export default AsyncStorageC
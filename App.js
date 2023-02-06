
import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Alert, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from './AppCss'
// import Task from './Components/Task'
import InPut from './Components/InPut'
import AsyncStorageC from './Components/AsyncStorageC'






export default function App() {
  
  const [value, setValue] = useState('');
  const [taskList, setTaskList] = React.useState(['viec1', 'viec2']);


  //get Data from Storage
  useEffect(() => {
    async function fetchData() {
      const taskList1 = await AsyncStorage.getItem('myArr');
      const arr = taskList1 ? JSON.parse(taskList1) : [];
      !!taskList1 == false ? setTaskList(['việc 1']) : setTaskList(arr);
    }
    fetchData(); 
  }, [value]);

  //Send the data to storage when click
  const handleAddTask1 = async (task) => {
    const data = await AsyncStorage.getItem('myArr');
    const arr = data ? JSON.parse(data) : [];
    arr.push(task) // add thêm item
    await AsyncStorage.setItem('myArr', JSON.stringify(arr));
    // setValue('') : hàm bên component InPut đã có rồi
    setValue(task) //Để biến value thay đổi khi click để chạy useEffect
  }

  // Nếu ko có storage, add lưu, xử lí trên ram !
  // const handleAddTask1 = (task) => {
  //   setTaskList ([...taskList, task])
  // }

  const handleDeleteTask = (index) => {
    Alert.alert( //Component Alert thực hiện việc thông báo đồng ý/ hủy bỏ
      "Bạn muốn xóa công việc này ?", //Dòng nội dung thông báo
      "", //Dòng chữ thông báo phụ
      [
        {
          text: "OK",
          onPress: async () => {
            let taskListTamp = [...taskList];
            taskListTamp.splice(index,1);
            await AsyncStorage.setItem('myArr', JSON.stringify(taskListTamp)); //thay đổi cả mảng mới
            setValue(taskListTamp)//để chạy useEffect
          }
        },//Thực hiện khi nhấm ok
        { text: "Cancel", onPress: () => {} } //Thực hiện khi nhấm cancel
      ]
    );
  }

 






  return (
    <View style={styles.container}>
      <View style={{width: '100%', marginBottom: 15}}> 
        <Text style={styles.topTextFirst}>Todo List</Text>
      </View>
      <ScrollView>
        <View style={styles.containerTop}>
          {
            taskList.map((item, index)=> {
              return (
                <TouchableOpacity
                  key = {index*Math.random()}
                  onPress={() => handleDeleteTask(index)}
                >
                  <View style={[styles.top, styles.topText, index % 2 === 0 ? styles.even : styles.odd]}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', position: 'absolute', left: 15 }}>{`${index+1}.`}</Text>
                    <Text style={styles.topText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )
            }) 
          }
        </View>

        {/* Dùng Flatlist*/}
        {/* <View style={{ marginVertical: 0, height: '100%', flexGrow: 0, width: '100%' }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            data={taskList} //data
            keyExtractor={(item, index) => item.id}
            style={{ flexGrow: 0 }}
            renderItem={({ item, index }) =>
              <View key={index} style={{ marginVertical: 5, borderBottomWidth: 1, marginHorizontal: 10,}} > 
                <Text allowFontScaling={false} style={{
                  width: '100%',
                  padding: 5,
                  fontWeight: 'bold',
                  marginRight: 0,
                }}
                >
                  {`${index + 1}. ${item}`}
                </Text>
              </View>
            }
          />
        </View> */}

      </ScrollView>

      <InPut onAddTask = {handleAddTask1}/>

      <AsyncStorageC/>

    </View>
  ) 
}


import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";


import styles from "../AppCss";

const InPut = (prop) => {
    const [task, setTask] = React.useState('');

    const handleAddTask = ()=> {
        if (task.length === 0) {
            alert('Bạn chưa nhập tên công việc!');
            return false
        }
        prop.onAddTask(task); //Trường hợp này onAddTast prop xử lí (viết hàm ở App.js để xử lí)
        setTask('') //set lại giá trị cho task để bàn phím xóa text sau khi nhấn nút addBtn  
    }

    return (
    <SafeAreaView style = {styles.rowFul}>
        <View style = {styles.colHalf80}>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setTask(text)}
                value={task}
                placeholder="Type your jobs here !"
                keyboardType="default"
            />
        </View>

        <TouchableOpacity
            onPress={handleAddTask}
        >
            <View>
                <Text style={styles.addBtn}>+</Text>
            </View>
        </TouchableOpacity>

    </SafeAreaView>
    );
};

export default InPut;
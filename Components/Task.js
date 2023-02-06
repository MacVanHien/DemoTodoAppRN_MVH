
import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../AppCss'

export function Task(prop) {
    const itemBackground = prop.number % 2 === 0 ? styles.even : styles.odd;

    return (
        <TouchableOpacity
            onPress={prop.onDeletTask}
        >
            <View style={[styles.top, styles.topText, itemBackground]}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', position: 'absolute', left: 15}}>{`${prop.number}.`}</Text>
                <Text style={styles.topText}>{prop.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Task

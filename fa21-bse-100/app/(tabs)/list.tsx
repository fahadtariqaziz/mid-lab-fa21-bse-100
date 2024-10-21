import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const list = () => {
  return (
    <View style={{flex:1, justifyContent: 'center' , alignItems: 'center', gap: 10}}>
      <Link href="/list/1" > news one </Link>
      <Link href="/list/abc" > news two </Link>
      <Link href="/list/3" > news three </Link>
    </View>
  )
}

export default list
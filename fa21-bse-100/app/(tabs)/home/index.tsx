import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const home = () => {
  return (
    <View style={{ flex:1, justifyContent: 'center', alignItems:'center' }}>
      
      <Text>home</Text>
      <Link href="/home/settings"> Push to Settings </Link>
    
    </View>
  )
}

export default home
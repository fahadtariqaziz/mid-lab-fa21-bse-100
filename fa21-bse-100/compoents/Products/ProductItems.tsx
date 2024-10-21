import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface DataProp{
    item:{
        category : string,
    description : string,
    id : number,
    image : string,
    price : number,
    rating : any,
    title : string
    }
}

const ProductItems = ({item}: DataProp) => {
  return (
    <Link href={ { pathname:`/list/${item.price}`, params:{ item: JSON.stringify(item) }} }>
    <View style={{width:'90%', alignSelf:'center', backgroundColor:'white', marginTop:20, flexDirection:'row'}}>
      <Image source={{uri:item.image}} style={{width:60, height:60}} />
      <View style={{marginLeft:10 , padding:10 , overflow:'hidden'}}>
        <Text style={{fontWeight:'500', width:'60%'}}>{item.title.length>50? item.description.substring(0,50)+ "..." : item.title}</Text>
        <Text style={{fontSize:12, marginTop:10, width:'60%'}}>{item.description.length>50? item.description.substring(0,50)+ "..." : item.description}</Text>

      </View>
    </View>
    </Link>
  )
}

export default ProductItems
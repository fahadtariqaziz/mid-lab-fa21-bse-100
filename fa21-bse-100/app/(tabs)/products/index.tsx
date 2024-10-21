import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import ProductItems from '@/compoents/Products/ProductItems'

interface ProductState {
    category : string,
    description : string,
    id : number,
    image : string,
    price : number,
    rating : any,
    title : string
}

const products = () => {

    const [products, setProducts] = useState<ProductState[]>([]);

    useEffect( () => {
        getProducts();
    },[])

    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
        .then(res=> res.json())
        .then( json=> {
                    console.log(json);
                    setProducts(json);
                }
            )
    }


  return (
    <View style={{ flex:1 }}>
      
      <FlatList 
        data={products}
        renderItem={ ({item,index}:{item:ProductState, index:number}) => {

            return(
                <ProductItems item={item}/>
            )
        } }
      />
      
    </View>
  )
}

export default products
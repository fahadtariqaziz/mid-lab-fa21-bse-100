import { Stack, useLocalSearchParams } from "expo-router"
import { Image, Text, View } from "react-native";

const DetailsPage = () => {

    const {id, item} = useLocalSearchParams();

    
    const parsedItem = typeof item === 'string' ? JSON.parse(item) : null;
    return (
        <View>
            <Stack.Screen options={{ headerTitle : `Details #${id}`}} />
            <Text> My Details for : {id} </Text>
                {parsedItem && (
                    <View style={{ marginTop: 20 }}>
                    <Text>Title: {parsedItem.title}</Text>
                    <Text>Price: ${parsedItem.price}</Text>
                    <Text>Description: {parsedItem.description}</Text>
                    <Image source={{ uri: parsedItem.image }} style={{width:20,height:20}} />
                 
                    </View>
                )}
        </View>
    )
}

export default DetailsPage;
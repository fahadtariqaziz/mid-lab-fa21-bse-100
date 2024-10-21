import { Stack } from "expo-router"

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerTitle: 'post Screen in post'}} />
        </Stack>
    )
}

export default StackLayout;
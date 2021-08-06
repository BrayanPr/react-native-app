import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BadgesTabNavigator from '../BadgeScreen/BadgesTabNavigator'
import BadgeLaning from '../BadgeLanding/BadgeLanding'
import Colors from '../../res/Colors'
import Login from '../UsersLogin/Login'
import Signin from '../UsersLogin/Signin'
const Stack = createStackNavigator();

const AppStack = () =>{
    return (
        <Stack.Navigator
            ScreenOptions={{
                HeaderShown:false,
                headerStyle:
                    {
                    backgroundColor:Colors.charade,
                    shadowColor:Colors.charade
                    },
                headerTintColor: Colors.white,
                }
            }>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={Signin} options={{headerShown:false}}/>
            <Stack.Screen name="BadgesTabNavigator" component={BadgesTabNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}
export default AppStack
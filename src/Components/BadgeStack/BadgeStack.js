import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import BadgeLanding from "../BadgeLanding/BadgeLanding"
import Login from "../Login/Login"
import BadgeScreen from "../BadgeScreen/BadgeScreen" 
import BadgeDetails from '../BadgeDetails/BadgeDetails'
import Colors from "../../res/Colors"
import Edit from '../Edit/BadgeEdit';
const Stack = createStackNavigator()

const BadgeStack = () =>{
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl,},
                headerTintColor: Colors.white,
            }}
        >
            <Stack.Screen
                name="Landing"
                component={BadgeLanding}
            />
            <Stack.Screen 
                name="Badges" 
                component={BadgeScreen} 
            />
            <Stack.Screen 
                name="Details" 
                component={BadgeDetails}     
            />
            <Stack.Screen
                name="Edit"
                component={Edit}
            />
        </Stack.Navigator>
    )
}
export default BadgeStack

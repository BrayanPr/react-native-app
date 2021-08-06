import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import EditProfile from './EditProfile'
import Colors from '../../res/Colors'

const stack = createStackNavigator()

const UserStack = () => {
    return (
        <stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPear
                },
                headerTintColor: Colors.white
            }}>
                <stack.Screen
                    name="Profile"
                    component = {Profile}
                    options={{headerShown:false}}
                />
                {/* <stack.Screen
                    name="EditProfile"
                    component = {EditProfile}
                    options={{headerShown:false}}
                /> */}

            </stack.Navigator>
    )
}
export default UserStack
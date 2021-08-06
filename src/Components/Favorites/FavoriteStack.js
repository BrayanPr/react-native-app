import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Favorites from './Favorites'
import Colors from '../../res/Colors'
import BadgeDetails from '../BadgeDetails/BadgeDetails'
const Stack = createStackNavigator()

const FavoritesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                headerStyle:{
                    backgroundColor: Colors.blackPearl,
                    shadowColor:Colors.blackPearl
                },
                headerTintColor:Colors.white
            }}    
        >
            <Stack.Screen
                name="Favorites"
                component={Favorites}
            />
            <Stack.Screen
                name="FavoritesDetails"
                component={BadgeDetails}
            />
        </Stack.Navigator>
    )
}

export default FavoritesStack
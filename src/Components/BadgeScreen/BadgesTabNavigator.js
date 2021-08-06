import React from 'react'
import {Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BadgesStack from './BadgesStack'
import UserStack from '../Users/UsersStack'
import FavoritesStack from '../Favorites/FavoriteStack'
import Colors from '../../res/Colors'

const Tabs = createBottomTabNavigator();

const BadgesTabNavigator = () => {
    return(
        <Tabs.Navigator
            tabBarOptions={{
                HeaderShown:false,
                showLabel: false,
                tintColor: Colors.white,
                activeTintColor: '#43FF0D',
                style:{
                    backgroundColor: Colors.zircon,
                }
            }}>
            <Tabs.Screen 
                name="Badges"
                component={BadgesStack}
                options={{
                    headerShown:false,
                    tabBarIcon: ({size,color}) => (
                        <Image 
                            style={{tintColor:color, width:size, height:size}}
                            source={require('../../assets/home.png')}
                        />   
                    )
                }}    
            />
            <Tabs.Screen 
                name="Profile"
                component={UserStack}
                options={{
                    headerShown:false,
                    tabBarIcon: ({size,color}) => (
                        <Image 
                            style={{tintColor:color, width:size, height:size}}
                            source={require('../../assets/user_icon.png')}
                        />   
                    )
                }}    
            />
            <Tabs.Screen 
                name="Favorites"
                component={FavoritesStack}
                options={{
                    headerShown:false,
                    tabBarIcon: ({size,color}) => (
                        <Image 
                            style={{tintColor:color, width:size, height:size}}
                            source={require('../../assets/notFavorite.png')}
                        />   
                    )
                }}    
            />
        </Tabs.Navigator>
    )
}
export default BadgesTabNavigator
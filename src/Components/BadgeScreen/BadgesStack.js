import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BadgeLanding from '../BadgeLanding/BadgeLanding'
import BadgesScreen from './BadgeScreen'
import BadgeDetails from '../BadgeDetails/BadgeDetails'
import Edit from '../Edit/BadgeEdit'
import Colors from '../../res/Colors'

const Stack = createStackNavigator();

const BadgesStack = () => {
    return (
        <Stack.Navigator
              screenOptions={{
                headerShown:false,
                headerStyle: {
                    backgroundColor:Colors.blackPearl,
                    shadowColor:Colors.blackPearl,
                },
                headerTintColor:Colors.white,
              }}>
                  <Stack.Screen name="Badges" component={BadgesScreen} options={{headerShown:false}}/>
                  <Stack.Screen name="Details" component={BadgeDetails} options={{headerShown:false}}/>
                  <Stack.Screen name="Edit" component={Edit} options={{headerShown:false}}/>

              </Stack.Navigator>
    )
}
export default BadgesStack
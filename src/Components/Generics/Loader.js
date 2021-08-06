import { BackgroundColor } from 'chalk'
import React from 'react'
import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native'
import Colors from '../../res/Colors'

const Loader = () => {
    return(
        <View style={[Style.container, Style.horizontal]}>
            <StatusBar backgroundColor='transparent' translucent={true}/>
            <ActivityIndicator
            style={Style.loader}
            color={Colors.green}
            size="large"/>
        </View>
    )
}

const Style = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor:Colors.charade
    },
    horizontal: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    loader:{
        height:'100%',
        alignSelf:'center'
    }
})
export default Loader
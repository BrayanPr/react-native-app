import React from 'react'
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Colors from '../../res/Colors'

const imageBackground = {
    uri: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
}

class BadgeLanding extends React.Component {
    handlePress = () =>{
        this.props.navigation.replace('BadgesTabNavigator')
    };

    render() {
        return (
            
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' translucent={true}/>
                <StatusBar backgroundColor="transparent"/>
                <ImageBackground source={imageBackground} style={styles.image}>
                    <View style={styles.layerColor}>
                        <Text style={styles.title}>
                            Welcome
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
                            <Text style={styles.buttonText}>
                                Start
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </ImageBackground>
                
            </View>
        )
    }

}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
        },
        layerColor: {
            flex: 2,
            backgroundColor: '#04593A80',
            justifyContent: 'center',
            alignItems: 'center'
        },
        image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',

        },
        title: {
            marginHorizontal:30,
            fontSize:80,
            fontWeight:'bold',
            color: Colors.white
        },
        button: {
            padding:1,
            borderRadius:5,
            marginTop:'50%',
            backgroundColor: '#121212cc',
            borderColor: Colors.white,
            borderWidth:1
        },
        buttonText: {
            textAlign: 'center',
            fontSize:18,
            fontWeight:'bold',
            paddingHorizontal:25,
            color: Colors.white
        },
        bottomText: {
            backgroundColor: Colors.white
            
        }
        
    })

export default BadgeLanding
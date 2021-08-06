import React from 'react';
import {ScrollView, View, ActivityIndicator, FlatList, StyleSheet,StatusBar} from 'react-native'
import Colors from '../../res/Colors'
import Storage from '../../libs/Storage'
import BadegesItem from '../BadgeScreen/BadgesItem'
import Loader from '../Generics/Loader'
class Favorites extends React.Component{
    state = {
        loading: false,
        badges:undefined,
    }
    componentDidMount = () => {
        this.getFavorites()
        this.focusEvent()
    }

    getFavorites = async () => {
        this.setState({badges:undefined, loading:true})
        try {
            const allKeys = await Storage.instance.getAllKeys()
            const keys = allKeys.filter(key => key.includes('favorite-'))
            const favs = await Storage.instance.multiGet(keys)
            const favorites = favs.map(fav => JSON.parse(fav[1]))
            this.setState({badges: favorites, loading:true})
        }catch(err) {
            console.log('get favorites error', err)
        }
    }
    handlePress = item => {
        this.props.navigation.navigate('FavoritesDetails', {item})
    }

    focusEvent = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getFavorites()
        })
    }
    componentWillUnmount = () => {
        this.focusListener()
    }
    render() {
        const {badges, loading} = this.state
        if(loading === true && !badges){
            return (
                <Loader/>
            )
        }   
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' translucent={true}/>
                <FlatList
                /* style={styles.list} */
                    data={badges}
                    renderItem={({item}) => (
                        <BadegesItem 
                            item={item} onPress={() => this.handlePress(item)}/>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex:1,
        flexDirection: 'column',
        backgroundColor:Colors.charade
    },
    loader: {
        height:'100%',
        paddingHorizontal:10,
    },
    list:{
        width:'100%',
        paddingHorizontal:10,
    }
})

export default Favorites
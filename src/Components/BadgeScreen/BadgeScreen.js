import React from 'react'
import {View,ActivityIndicator, Text, FlatList , StyleSheet, Alert, StatusBar} from 'react-native'
import Colors from '../../res/Colors'
import BadgesItem from './BadgesItem'
import Loader from '../Generics/Loader'
import BadgeSearch from './BadgeSearch'
import Storage from '../../libs/Storage'
import Http from '../../libs/Http'
class BadgesScreen extends React.Component {
    state = {
        loading: false,
        badge: undefined,  
        badgeCopy: undefined 
    };

    componentDidMount(){
        this.fetchData();
        this.focusEvent();
        this.blurEvent();
    }
    
    focusEvent = () => {
        /* is a listener while the screen is open */
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.setFetchInterval()
        })
    }
    blurEvent = () => {
        /* when the screen is close clear the interval */
        this.blurListener = this.props.navigation.addListener('blur', () => {
            clearInterval(this.interval)
        })
    }
    setFetchInterval = () => {
        this.interval = setInterval(this.fetchData, 3000)
    }
    componentWillUnmount(){
        this.focusListener()
        this.blurListener()
    }

    fetchData = async () => {
        /* get the info from the badges */
        this.setState({loading: true});
        let response = await Http.instance.get_all();
        response = response.reverse();
        this.setState({loading: false, badges: response, badgeCopy:response});
    }

    handlePress = item => {
        /* handle the click button of each badge */
        this.props.navigation.navigate('Details', {item})
    }

    handleEdit = item => {
        /* handle the edit of each badge */
        this.props.navigation.navigate('Edit', {item})
    }
    
    handleDelete = item => {
        /* handle the delete of each badge with an alert */
        Alert.alert('Are you shure?',
        `Do you really want to delete ${item.name}? This can't be undone`,
        [
            {
                text: 'Cancel',
                style:'cancel'
            },
            {
                text: 'Delete',
                onPress:async() =>{this.setState({
                    loading: true, badges:undefined,})
                    const key = `favorite-${item._id}`
                    await Storage.instance.remove(key)
                    await Http.instance.remove(item._id);
                    
                    this.fetchData();
                },
                style:'destructive',
            },    
        ],
        {
            cancelable: true,
        }
        )
        
    }

    handleChange = query => {
        /* handle the search bar */
        const {badgeCopy} = this.state

        const badgesFiltered = badgeCopy.filter(badge => {
            return badge.name.toLowerCase().includes(query.toLowerCase())
        })

        this.setState({badges: badgesFiltered})
    }

    render() {
        const {badges, loading} = this.state;
        if(loading === true && !badges){
            return (
                <Loader/>
            )
        }   
        return (
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar backgroundColor='transparent' translucent={true}/>
                <BadgeSearch onChange={this.handleChange}/>
                <FlatList
                    style={styles.list} 
                    data={badges}
                    renderItem={({item}) =>( <BadgesItem 
                                                key={item._id} 
                                                item={item}
                                                onPress={()=>{this.handlePress(item)}}
                                                onEdit={()=>{this.handleEdit(item)}}
                                                onDelete={()=>{this.handleDelete(item)}}
                                            />
                    )}
                    keyExtractor={(item,index)=>index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor:Colors.charade
    },
    horizontal: {
        justifyContent: 'space-around',
        alignItems: 'center'
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

export default BadgesScreen
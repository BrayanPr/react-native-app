import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native'
import Colors from '../../res/Colors'

class BadgeSearch extends React.Component {
    state ={
        badgeCopy:{},
        query:""
    }
    handleText = query => {
        /* handle the text of the search bar */
        this.setState({query});
        if (this.props.onChange){
            this.props.onChange(query)
        }
    }
    render () {
        const {query} = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.Input}
                    onChangeText = {this.handleText}
                    value={query}
                    placeholder="Search"
                    placeholderTextColor={Colors.charade}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width:'95%',
        marginTop: 10,
        color: Colors.white
    },
    Input: {
        marginTop:20,
        borderColor: Colors.blackPearl,
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:16,
        backgroundColor:Colors.white,
        color:Colors.charade,
    }
})

export default BadgeSearch
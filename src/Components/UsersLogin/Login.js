import React from 'react'
import {
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
  } from 'react-native';
import Fonts from '../../res/Fonts'
import Colors from '../../res/Colors';
import Sessions from '../../libs/Sessions'
import Storage from '../../libs/Storage'
class Login extends React.Component {
    state={
        loading: false,
        error: null,
        user:undefined,
        passwordVisible: !false,
        form:{}
        }

    componentDidMount() {
        this.get_token()
    }

    get_token = async () => {
        token = await Storage.instance.get('token')
        id = await Storage.instance.get('id')
        if( token != null || id != null){
            this.props.navigation.replace('BadgesTabNavigator')
        }
    }

    TogglePassword = () =>{
        if(this.state.passwordVisible){
            this.setState({passwordVisible : false})
        }else{
            this.setState({passwordVisible : true})
        }
    }
    registerButton = () =>{
        this.props.navigation.replace('Register')
    }
    handleSumbit = async () => {
        try{
            this.setState({loading: true, error: null, user: undefined})
            let response = await Sessions.instance.login(this.state.form)
            
            if (typeof response === 'object'){
                if(response['401'][0] == 'User not verified'){
                    error = "user not verified"
                }
                else{
                    error = "invalid credentials"
                }
                this.setState({loading: false, error: error, user: undefined})
            }else{
                this.setState({loading: false, error:false, user: response})
                this.props.navigation.replace('BadgesTabNavigator')
            } 
        }catch(e){
            this.setState({loading: false, error: e, user: undefined})
        }
    } 
    

    render(){
        
        const { passwordVisible, error } = this.state;
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                <View style={Styles.FormContainer}>   
                    <View style={Styles.inputContainer}>
                        <Text style={Styles.title}>Login</Text>
                        {error ? (
                            <Text>{error}</Text>
                        ): null}
                        <TextInput 
                        style={Styles.input} 
                        placeholder="Username"
                        onChangeText={ text => {
                            this.setState(prevState => {
                                let form = Object.assign({}, prevState.form)
                                form.username = text
                                return {form}
                            })
                        }}
                        />
                        <View>
                            <TextInput 
                            style={Styles.input}
                            secureTextEntry={passwordVisible} 
                            placeholder={"Password"}
                            onChangeText={ text => {
                                this.setState(prevState => {
                                    let form = Object.assign({}, prevState.form)
                                    form.password = text
                                    return {form}
                                })
                            }}
                            />
                            
                            
                        </View>
                        <TouchableOpacity onPress={this.TogglePassword}>
                                <Image 
                                source={
                                    passwordVisible
                                    ? require('../../assets/show.png')
                                    : require('../../assets/hide.png')
                                }
                                />
                            </TouchableOpacity>
                    </View>    
                </View>
                <TouchableOpacity style={Styles.darkButton} onPress={this.handleSumbit}>
                    <Text style={Styles.darkButtonText}>NEXT</Text>
                </TouchableOpacity> 
                <Text style={Styles.bottomText}>
                    Dont have an account? 
                </Text>
                <TouchableOpacity onPress={this.registerButton}>
                    <Text  style={Styles.textlink}>create one here!</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width
var iconSize  =  height*.0
var borderTop = height*.15
var FormWidth = width*.80
var FormHeight = height*.60
var DarkButton = FormHeight*.15
const Styles = StyleSheet.create({

    Container: {
        backgroundColor:Colors.charade,
        position: 'relative',
    },
    FormContainer: {
        marginTop:borderTop + iconSize/2,
        height:FormHeight,
        width: FormWidth,
        alignSelf: 'center',
        backgroundColor:Colors.white,
        borderRadius:15,
        position: 'relative',
    },
    logo: {
        alignSelf: 'center',
        height:iconSize,
        width:iconSize,

    },
    logoContainer: {
        marginTop: borderTop,
        alignSelf: 'center',
        height:iconSize,
        width:iconSize,
        backgroundColor:Colors.white,
        position: 'absolute',
        borderRadius: iconSize/2,
        zIndex:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    },
    input: {

        color: Colors.black,
    
        borderBottomColor: Colors.black,
    
        borderBottomWidth: 1,

        fontSize: Fonts.text,
        
        marginBottom:50,

        width: FormWidth*.60,
    
        textAlign: 'center',
    },
    title:{

        marginTop:iconSize/2,

        alignSelf: 'center',

        fontSize: 25,
    
        color: Colors.zircon,

        marginBottom: DarkButton,

      },
    inputContainer:{
        alignItems: 'center',
        marginTop:20,
    },
    darkButton:{
        alignSelf: 'center',
        height:DarkButton,
        width:FormWidth*.6,
        marginTop:-(DarkButton/2),
        borderRadius: 15,
        fontSize:Fonts.miniButtons,
        backgroundColor: Colors.zircon,
        justifyContent: 'center',
        zIndex: 5,
        position: 'relative',
    },
    darkButtonText:{
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 30,
        position: 'absolute'
    },
    bottomText: {
        color: Colors.white,
        alignSelf: 'center',
        marginTop:10
    },
    textlink:{
        color: 'gray',
        alignSelf: 'center',
        paddingTop:10
    }
})

export default Login
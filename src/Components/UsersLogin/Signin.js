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
class SignIn extends React.Component {
    state={
        loading: false,
        errors: [],
        user:undefined,
        passwordVisible: !false,
        form:{}
        }
    TogglePassword = () =>{
        if(this.state.passwordVisible){
            this.setState({passwordVisible : false})
        }else{
            this.setState({passwordVisible : true})
        }
    }
    loginButton = () =>{
        this.props.navigation.naviga('Login')
    }
    handleSumbit = async () => {
        
        try{
            this.setState({loading:true, error:[], user:undefined})
            let response = await Sessions.instance.signup(this.state.form)
            if (typeof response === 'object'){
                let errors = []
                let cont = 0
                for (let key in response){
                    errors.push(
                    <View key={cont}>
                        <Text>{`${key} : ${response[key]}`}</Text>
                    </View>)
                    cont++
                }
                this.setState({loading: false,  user:undefined, errors:errors})
            }else{
                this.setState({loading:false, user:response, errors:[]})
            }
        }catch(e){
            throw Error(e)
        }
        if(this.state.user){
            this.props.navigation.replace('Login')
        }
    } 
    

    render(){
        
        const { passwordVisible, errors } = this.state;
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                <View style={Styles.FormContainer}>   
                    <View style={Styles.inputContainer}>
                        <Text style={Styles.title}>Register</Text>
                        {errors}
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
                        <TextInput 
                        style={Styles.input} 
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={ text => {
                            this.setState(prevState => {
                                let form = Object.assign({}, prevState.form)
                                form.email = text
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
                            <TextInput 
                            style={Styles.input}
                            secureTextEntry={passwordVisible} 
                            placeholder={"Password Confirmation"}
                            onChangeText={ text => {
                                this.setState(prevState => {
                                    let form = Object.assign({}, prevState.form)
                                    form.password_confirmation = text
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
                    Already have an account?? 
                </Text>
                <TouchableOpacity onPress={this.loginButton}>
                    <Text  style={Styles.textlink}>Login here!</Text>
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
var FormHeight = height*.70
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

    input: {

        color: Colors.black,
    
        borderBottomColor: Colors.black,
    
        borderBottomWidth: 1,

        fontSize: Fonts.text,
        
        marginBottom:20,

        paddingBottom: 0,
        
        width: FormWidth*.60,
    
        textAlign: 'center',
    },
    title:{

        alignSelf: 'center',

        fontSize: 25,
        
        marginTop:20,

        color: Colors.zircon,

        marginBottom: DarkButton,

      },
    inputContainer:{
        alignItems: 'center',
        marginTop:20
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

export default SignIn
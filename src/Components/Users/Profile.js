import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, DevSettings } from 'react-native'
import Colors from '../../res/Colors'
import Sessions from '../../libs/Sessions'
import Storage from '../../libs/Storage'
import Loader from '../Generics/Loader'
import { launchImageLibrary } from 'react-native-image-picker'
class Profile extends React.Component {
    state = {
        badge: {
            profile:{
            }
        },
        loading: false
    }

    componentDidMount() {
        this.getInfo()
    }

    handleChooseProfile = () => {
        /* picks a image from the files */
        const options = {
            includeBase64:false,
            mediaType: 'photo'
        }
        launchImageLibrary(options, response => {
            try{
                let photo = response.assets[0].uri
                this.setState({image:photo})
                this.editProfile()
            }catch(e){
                Alert.alert('Imagen no seleccionada', 'Es necesario selecionar una imagen para continuar')
            }
            
        })
    }

    editProfile = async () => {
        /* get the image picked and send it to the database. replace the badge */
        const {image, badge} = this.state
        badge.profile.profile_picture_url = image

        this.setState({badge:badge})
        await Sessions.instance.editProfile(image)
    }
    logout = () => {
        /* gives an alert to logout */
        Alert.alert('Logout',
        `Do you really want to logout?`,
        [
            {
                text: 'Cancel',
                style:'cancel'
            },
            {
                text: 'Logout',
                onPress:async() =>{this.setState({
                    loading: true})
                    try{
                        await Storage.instance.remove('id')
                    }
                    catch(e){
                        console.log('id error', e)
                    }
                    try{
                        await Storage.instance.remove('token')
                    }
                    catch(e){
                        console.log('token error', e)
                    }
                    try{
                        DevSettings.reload()
                    }catch(e){
                        console.log('error restarting application', e)
                        
                    }
                },
                style:'destructive',
            },    
        ],
        {
            cancelable: true,
        }
        )
    }
    getInfo = async () => {
        /* get the info from the user */
        this.setState({loading: true})
        let user_info = await Sessions.instance.get_user()
        this.setState({badge:user_info, loading:false})
    }

    
    render() {
        const { badge, loading } = this.state
        if (loading == true) {
            <Loader/>
        }
        return (
            <View style={styles.container}>
                <View style={styles.badge}>
                    <Image
                        style={styles.header}
                        source={{ uri: `${badge.profile.header_img_url || "https://www.markspaneth.com/assets/images/blog/_list_image/02_02_18_508408464_AAB_560x292.jpg"}` }}
                    />
                    <Image
                        style={styles.profileImage} 
                        source={{ uri: `${badge.profile.profile_picture_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}` }}
                    />
                    <TouchableOpacity style={styles.profileEdit} onPress={this.handleChooseProfile}>
                        <Image style={styles.camera}
                        source={require('../../assets/camera_icon.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Logout} onPress={this.logout}>
                        <Image style={styles.logout}
                        source={require('../../assets/logout_icon.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{badge.username}</Text>
                        <Text style={styles.age}>{badge.profile.age}</Text>
                    </View>
                    <Text style={styles.city}>{badge.profile.city}</Text>
                    <View style={styles.data}>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.profile.followers || "0"}</Text>
                            <Text style={styles.smallText}>Followers</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.profile.likes || "0"}</Text>
                            <Text style={styles.smallText}>Likes</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.profile
                            .post || "0"}</Text>
                            <Text style={styles.smallText}>Posts</Text>
                        </View>


                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    badge: {
        flex: 1,
        margin: '5%',
        width: '90%',
        height: '90%',
        backgroundColor: Colors.white,
        borderRadius: 25,
    },
    header: {
        width: '100%',
        height: '40%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    profileImage: {
        width: '60%',
        height: '30%',
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: Colors.white,
        position: 'absolute',
        top: '23%',
        left: '21%',
    },
    userInfo: {
        flexDirection: 'row',
        marginTop: '35%',
        justifyContent: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.blackPearl,

    },
    age: {
        fontSize: 28,
        marginLeft: '3%',
        color: Colors.zircon,

    },
    city: {
        marginTop: '3%',
        fontSize: 18,
        textAlign: 'center',
        color: Colors.zircon
    },
    data: {
        padding: '2%',
        marginTop: '10%',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: Colors.zircon,
    },
    dataColumns: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataInfo: {
        marginTop: '20%',
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: '10%',
        color: Colors.charade,
    },
    smallText: {
        color: Colors.zircon
    },
    profileEdit:{
        width:35,
        height:35,
        padding:5,
        borderRadius:20,
        backgroundColor:Colors.zircon,
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        right:70,
        top: 280
    },
    Logout:{
        width:35,
        height:35,
        padding:5,
        borderRadius:20,
        backgroundColor:Colors.zircon,
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        right:220,
        top: 280
    },
    logout:{
        flex:2,
        width:'100%',
        height:'100%',
    }
})

export default Profile
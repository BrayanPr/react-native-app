import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Colors from '../../res/Colors'
import Storage from '../../libs/Storage'

class BadgeDetails extends React.Component {
    state = {
        badge: {},
        isFavorite: false,
    }

    componentDidMount() {
        this.getBadge()
    }

    getBadge = () => {
        /* get the info from the badge making the request from the database */
        const { item } = this.props.route.params
        this.setState({ badge: item }, () => {
            this.getFavorite()
        })
        this.props.navigation.setOptions({ title: `${item.name}` })
    }

    getFavorite = async () => {
        /* checks if the badge is seted as a favorite */
        try {
            const key = `favorite-${this.state.badge._id}`
            const favoriteStr = await Storage.instance.get(key)
            if (favoriteStr != null) {
                this.setState({ isFavorite: true })
            }
        } catch (e) {
            console.log('Get favorite error', e)
        }
    }

    toggleFavorite = () => {
        /* Set as favorite or delete it */
        if (this.state.isFavorite === true) {
            this.removeFavorite()
        } else {
            this.addFavorite();
        }
    }

    addFavorite = async () => {
        /* add the badge to the favorites storage */
        const badge = JSON.stringify(this.state.badge)
        const key = `favorite-${this.state.badge._id}`
        const stored = await Storage.instance.store(key, badge)

        if (stored) {
            this.setState({ isFavorite: true })
        }
    }

    removeFavorite = async () => {
        /* remove it from the storage */
        const key = `favorite-${this.state.badge._id}`
        await Storage.instance.remove(key)
        this.setState({ isFavorite: false })
    }
    render() {
        const { badge, isFavorite, loading } = this.state
        if (loading) {
            return (
                <ActivityIndicator
                    styles={styles.loader}
                    color="#43FF0D"
                    size="large"
                />
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.badge}>
                    <Image
                        style={styles.header}
                        source={{ uri: `${badge.header_img_url}` }}
                    />
                    <Image
                        style={styles.profileImage}
                        source={{ uri: `${badge.profile_picture_url}` }}
                    />
                    <TouchableOpacity
                        onPress={this.toggleFavorite}
                    >
                        <Image
                            source={
                                isFavorite
                                    ? require('../../assets/isFavorite.png')
                                    : require('../../assets/notFavorite.png')
                            }
                        />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{badge.name}</Text>
                        <Text style={styles.age}>{badge.age}</Text>
                    </View>
                    <Text style={styles.city}>{badge.city}</Text>
                    <View style={styles.data}>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.followers || "0"}</Text>
                            <Text style={styles.smallText}>Followers</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.likes || "0"}</Text>
                            <Text style={styles.smallText}>Likes</Text>
                        </View>
                        <View style={styles.dataColumns}>
                            <Text style={styles.dataInfo}>{badge.post || "0"}</Text>
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
        height: '37%',
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
    }
})

export default BadgeDetails
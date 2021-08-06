import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
    static instance = new Storage();

    get_token = async () => {
        try{
            return await AsyncStorage.getItem('token')
        }catch(e){
            return false;
        }
    }

    store = async (key, value) => {
        try{
            await AsyncStorage.setItem(key, value)
            return true;
        }catch(e){
            console.log('Storage store error', e);
            return false;
        }
    } 
    get = async key =>{
        try{
            return await AsyncStorage.getItem(key)
        }catch(e){
            console.log('Storage get error', e);
            throw Error(e)
        }
    }
    multiGet = async keys =>{
        try{
            return await AsyncStorage.multiGet(keys)
        }catch(e){
            console.log('Storage multiGet error',e)
            throw Error(e)
        }
    }
    getAllKeys = async () =>{
        try{
            return await AsyncStorage.getAllKeys()
        }catch(e){
            console.log('Storage get all keys error',e)
            throw Error(e)
        }
    }
    remove = async key =>{
        try{
            await AsyncStorage.removeItem(key)
            return true
        }catch(e){
            console.log('Storage remove key error',e)
            throw Error(e)
        }
    }
}

export default Storage
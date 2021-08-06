import Storage from './Storage'; 
import URLS from './URLS'
class UserSession {
    static instance = new UserSession();

    login = async body => {
        
        try {
            let request = await fetch(`${URLS.users_url}users/login/`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            let response = await request.json();
            try{
                let token = JSON.stringify(response.token)
                let id = JSON.stringify(response.user.id)
                token = token.replace(/['"]+/g, '')
                await Storage.instance.store('token',token)
                await Storage.instance.store('id',id)

                return response.user.username;
            }catch(e){
                return response
            }
            
        } catch (error) {
            console.error('Login error ', error)
            throw Error(error)
        }
    }

    logout = async key => {
        try {
            await Storage.instance.remove(key);
            return true
        } catch (error) {
            console.log('Logout error ', error)
            return false
        }
    }

    signup = async body => {
        try {
            let request = await fetch(`${URLS.users_url}users/signup/`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(body)
            }) 
            let response = await request.json()
            if (request.status == 200){
                return response.username
            }else{
                return response
            }
        } catch (error) {
            console.log('Signup error ', error)
            throw Error(error)
        }
    }
    get_user = async () => {
        try{
            user_id = await Storage.instance.get('id')
            token = await Storage.instance.get('token')
            let request = await fetch(`${URLS.users_url}profile/${user_id}/`, {
                method: 'GET',
                headers:{
                    'Authorization': 'token '+token 
                },
            })
            let response = await request.json();
            return response
        }catch(e) {
            return "error getting user info"
        }
    } 
    editProfile = async body => {
        let uploadData = new FormData();
        uploadData.append('profile.profile_picture_url', {
            type : 'image/jpeg',
            uri: body,
            name : 'profile.jpg'
        })
        try{
            user_id = await Storage.instance.get('id')
            token = await Storage.instance.get('token')
            let request = await fetch(`${URLS.users_url}profile/${user_id}/`, {
                method: 'PATCH',
                headers:{
                    Accept : 'application/json',
                    Authorization: 'token '+token,
                    'Content-Type': 'multipart/form-data',
                },
                body:uploadData
            })
            response = await request.json();
            console.log(response);
            return response
            }catch(e) {
            return "error getting user info"
        }
    } 
}

export default UserSession;
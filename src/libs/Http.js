import URLS from './URLS'
class Http {
    static instance  = new Http();

    get_all = async () =>{
        try{
            let request = await fetch(`${URLS.badges_url}/all/`);
            let response = await request.json();
            return response;
        } catch(e){
            console.log('http get method error', e);
            throw Error(e);
        }
    }
    get = async badgeId =>{
        try{
            let request = await fetch(`${URLS.badges_url}/_id:${badgeId}/`);
            let response = await request.json();
            return response;
        } catch(e){
            console.log('http get method error', e);
            throw Error(e);
        }
    }
    post = async badge =>{
        try{
            let request = await fetch(`${URLS.badges_url}/new/`,{
            method : 'POST',
            body: JOSN.stringify(badge)
        });
            let response = await request.json();
            return response;
        } catch(e){
            console.log('http post method error', e);
            throw Error(e);
        }
    }
    put = async (badgeId, body) => {
        try {
          let request = await fetch(`${URLS.badges_url}/_id:${badgeId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(body),
          });
          let response = await request.json();
          return response;
        } catch (err) {
          console.log('http put method err', err);
          throw Error(err);
        }
      };
    remove = async badgeId =>{
        try{
            let request = await fetch(`${URLS.badges_url}/_id:${badgeId}/`,{
                method : 'DELETE'
            });
            let response = await request.json();
            return response;
        } catch(e){
            console.log('http delete method error', e);
            throw Error(e);
        }
    }
}

export default Http
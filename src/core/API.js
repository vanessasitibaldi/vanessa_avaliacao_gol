import {AsyncStorage , Alert} from 'react-native';
import store from './store'
import * as types from './actions/types'
import axios from 'axios'; 

const baseUrl  = 'https://www.metaweather.com/api';

export const validateConsult = async (consult, sucessCallBack, unauthorizationCallback) => {
    if(consult.status >= 200 && consult.status <= 299){
        return sucessCallBack();
    } else if( consult.status >= 400 && consult.status <= 499){
        // 401 retornar para autorização
        console.log('error 400+ ', JSON.stringify(consult) )
        return unauthorizationCallback();
    } else {
        Alert.alert(
            'Erro',
            'Estamos com problemas na comunicação com o Servidor. Por favor tente mais tarde',
          );
        console.log('error 300+/500+ ', JSON.stringify(consult) )
        return undefined
    }
}

export default{

async getHome(){
    let loc = '455827';
    let consult = await this.getLocation(loc)
    if(consult.success){
        AsyncStorage.setItem('Home' , JSON.stringify(consult));
        store.dispatch({type: types.RECEIVED_HOME , payload: consult})
    }
    return consult;
},

async getLocation(loc){
        try{
        let url = `${baseUrl}/location/${loc}`;
        let consult = await axios.get(url)
        .then(response => response)
        .catch(err => err.response);
        let consultValidated = await validateConsult(
            consult,
            () => {
                consult.data.success = true
                return consult.data
            },
            () => {
                consult.data.success = false
                console.log('erro 400+ ', JSON.stringify(consult))
                return consult.data;
            }
        )
        return consultValidated;
        }catch(err){
            console.log('error' , err)
        }
},











}
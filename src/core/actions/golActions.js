import API from '../API';
import * as types from './types';
import Icons from '../../assets/json/icons'


export default{

    getHome(){
        return API.getHome()
    },
    getLocation(loc){
        return API.getLocation(loc)
    },

getIconByCode(code){
    resposta = ICONS_WEATHER.filter(icon => icon.code == code)
    if(resposta[0]) return resposta[0].image
}

}
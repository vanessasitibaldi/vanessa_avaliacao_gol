import API from '../API';
import * as types from './types';

export default{

    getHome(){
        return API.getHome()
    },
    getLocation(loc){
        return API.getLocation(loc)
    },

}
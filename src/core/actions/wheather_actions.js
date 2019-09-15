import { AsyncStorage } from 'react-native';
import { RECEIVED_HOME } from './types';
import golActions from './golActions';

export const getHome = () => async dispatch => {
    let home = await AsyncStorage.getItem('Home');
    if(home){
        let homeJSON = JSON.parse(home);
        let today = new Date(),
            today_dd = String(today.getDate()).padStart(2, '0'),
            today_mm = String(today.getMonth() + 1).padStart(2, '0'),
            today_yyyy = today.getFullYear(),
            today_string = `${today_yyyy}-${today_mm}-${today_dd}`;
        let dateHome = new Date(homeJSON.time),
            dateHome_dd = String(dateHome.getDate()).padStart(2, '0'),
            dateHome_mm = String(dateHome.getMonth() + 1).padStart(2, '0'),
            dateHome_yyyy = dateHome.getFullYear(),
            dateHome_string = `${dateHome_yyyy}-${dateHome_mm}-${dateHome_dd}`;

            if(today_string == dateHome_string ){
                dispatch({ type: RECEIVED_HOME, payload: homeJSON });
            }else {
                golActions.getHome();
            }
       
    }else{
        golActions.getHome();
    }
}
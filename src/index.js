import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './core/store'

import HomeScreen from './screens/HomeScreen';

class GolIndex extends Component {
 
    render(){
        return(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        )
    }
}

export default GolIndex;

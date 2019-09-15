import React, { Component } from 'react';
import { View, Image } from 'react-native';


class Loading extends Component{

    render(){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Image  source={require('../assets/images/loading.gif')} style={{width:'100%', height:'100%'}} resizeMode='contain' />   
            </View>
           
        )
    }
}
export default Loading;

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../core/actions'

import golActions from '../core/actions/golActions'


class HomeScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            loc : '',
            currentUnit: 'C',
            loading: false
        }
        props.getHome()
    }
    
    async componentDidMount(){
        await golActions.getHome()
        // this.setState({loc})
    }

    static getDerivedStateFromProps(props, state){
        if(props.home && props.home !== state.home){
            return {home: props.home}
        }
        return null
    }

    renderTemp(temp = 0){
        if(this.state.currentUnit == 'C'){
            return temp.toFixed()
        }else{
            return ((temp*9/5)+32).toFixed()
        }
    }
    render(){
        let { home } = this.state ;
        console.log(home)
        return(
            <View style={{ flex: 1 ,justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: 40}}>{home.title}</Text>
                {!!home && !!home.consolidated_weather && !!home.consolidated_weather.length && (
                    <Text style={{fontSize: 40}}>{this.renderTemp(home.consolidated_weather[0].the_temp)}°</Text>
                )}
            </View>
        )
    }
}


function mapStateToProps({home}){
    return { home };
}

export default connect(mapStateToProps, actions)(HomeScreen);
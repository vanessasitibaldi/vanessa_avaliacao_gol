import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import MapView from 'react-native-maps';


class Map extends Component{
    constructor(props){
        console.log('mapa' , props)
        super(props)
        this.state={
            region : null
        }
    }
    componentDidMount(){
        Geolocation.getCurrentPosition(
            ({ coords:{latitude , longitude}}) =>{
                this.setState({
                    region: {
                        latitude : this.props.latitude,
                        longitude: this.props.longitude,
                        latitudeDelta: 0.0643,
                        longitudeDelta: 0.0534,
                    }
                })
            },
            () => {},
            {
                timeout:2000,
                enableHighAccuracy: true,
                maximumAge:1000
            }
        );
    }

    render(){
        return(
            <View style={{ position: 'relative', height: 200 , marginTop: 40,}}>
                <MapView
                style={{flex:1}}
                initialRegion={this.state.region}
                showsUserLocation
                loadingEnabled
                />
            </View>
        )
    }
}

export default Map;
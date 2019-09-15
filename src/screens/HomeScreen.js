import React, { Component } from 'react';
import { View, Text , Switch} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../core/actions'

import golActions from '../core/actions/golActions'

import Map from '../components/Map'
import TempList from '../components/TempList'
import Loading from '../components/Loading'


class HomeScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            loc : '',
            currentUnit: 'C',
            celsius: true,
            loading: true
        }
        props.getHome()
    }
    
    async componentDidMount(){
        let getHome = await golActions.getHome()
        let latLon = getHome.latt_long.split(',')
        this.setState({latLon , loading: false})
    }

    static getDerivedStateFromProps(props, state){
        if(props.home && props.home !== state.home){
            return {home: props.home}
        }
        return null
    }

    setTemp(){
        if(this.state.currentUnit == 'C'){
        this.setState({currentUnit: 'F', celsius: false})
        }else{
            this.setState({currentUnit: 'C', celsius: true})
        }
    }

    renderSwitchMedia(){
        return(
            <View style={{ flexDirection:'row' , alignItems: 'center' , justifyContent: 'center', marginTop: 40}}>
                <Text style={{marginRight: 10, fontSize: 15,}}>Fahrenheit </Text>
                <Switch 
                    onValueChange={()=>this.setTemp()}
                    value={this.state.celsius}
                    trackColor='#A01D4C'
                />
                <Text style={{marginLeft: 10, fontSize: 15,}}>Celsius </Text>
            </View>
        )

    }

    renderTemp = (temp = 0) => {
        if(this.state.currentUnit == 'C'){
            return `${temp.toFixed()}°`
        }else{
            return `${((temp*9/5)+32).toFixed()}°`
        }
    }
    renderMap(){
        let {latLon} = this.state ;
        if(latLon && latLon.length){
            return(
                <View >
                    <Map latitude={latLon[0]} longitude={latLon[1]} /> 
                </View>
            )
        }
    }
    renderHome(){
        if(this.state.loading){
            return <Loading />
        }else{
            let { home} = this.state ;
            return(
                <View>
                    <View style={{ marginTop: 80 , alignItems: 'center'}}>
                        <Text style={{fontSize: 40}}>{home.title}</Text>
                        {!!home && !!home.consolidated_weather && !!home.consolidated_weather.length && (
                            <Text style={{fontSize: 30}}>{this.renderTemp(home.consolidated_weather[0].the_temp)}</Text>
                        )}
                    </View>
                    <View>
                        {this.renderMap()}
                    </View>
                    <View style={{borderWidth: 1, borderColor:'#666', marginHorizontal: 20, marginTop: 50,}}>
                        {!!home.consolidated_weather && <TempList list={home.consolidated_weather.slice(1,5)} renderTemp={this.renderTemp} />}
                    </View>
                    <View>{this.renderSwitchMedia()}</View>
                   
                </View>
            )

        }
    }
    render(){
        return this.renderHome()
    }
}


function mapStateToProps({home}){
    return { home };
}

export default connect(mapStateToProps, actions)(HomeScreen);
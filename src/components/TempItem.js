import React, { Component } from 'react';
import { View, Text , Image } from 'react-native';
import golActions from '../core/actions/golActions'


class TempItem extends Component{

    constructor(props){
        super(props)
        this.state={
        }
    }

    renderDate(time){
        console.log('time' , time)
        let date = new Date(time),
                date_dd = String(date.getDate()).padStart(2, '0'),
                date_mm = String(date.getMonth() + 1).padStart(2, '0'),
                date_string = `${date_dd}/${date_mm}`;
                return date_string
    }
        
    render(){
        if(this.props.item){
            let {item , index} = this.props;
            console.log('item' , item , index)
            return(
                <View style={{flexDirection:'row', justifyContent:'space-between' , height:60, paddingHorizontal: 30 , alignItems: 'center', borderBottomColor: '#666', borderBottomWidth: 1,}}>
                    <Text style={{fontSize:16}}>{this.renderDate(item.applicable_date)}</Text>
                    <Text style={{fontSize:16}}>{this.props.renderTemp(item.the_temp)}</Text>
                    <Image style={{width: 35, height: 35,}} source={golActions.getIconByCode(item.weather_state_abbr)}/>
                </View>
            )
        }else{
            return <View />
        }
        
        
        
    }


}

export default TempItem;
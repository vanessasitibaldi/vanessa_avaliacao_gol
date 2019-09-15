import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TempItem from './TempItem';
import { identifier } from '@babel/types';

class TempList extends Component{

    constructor(props){
        super(props)
        this.state={
        }
    }


render(){
    console.log('tempList' , this.props)
    if(this.props.list && this.props.list.length){
        return this.props.list.map((item  , index )=> (
            <TempItem  key={item.id} item={item} index={index} renderTemp={this.props.renderTemp}/>
        ))
    }else{
        return <View />
    }
     
     
    
}


}

export default TempList;
import React,{Component} from 'react'
import {connect} from 'react-redux'
import './main.css'
import {changeCurrencyType} from '../../Actions/ConversionBoxActions'
import {closePopUp} from '../../Actions/VariousActions'

class CurrencyOption extends Component{
    changeCurrency(currencyName,id,symbol){
        this.props.dispatch(changeCurrencyType(currencyName,id,symbol));
        this.props.dispatch(closePopUp());
    }
    render(){
        return(
            <div className='currency-option' onClick={this.changeCurrency.bind(this,this.props.currency,this.props.currencyId, this.props.symbol)}>
                <img alt='flag' src={this.props.img} className='currency-flag'/>
                <p className='option-name'>{this.props.country}</p>
                <p className='option-currency'>{this.props.currencyId}</p>
            </div>
        )
    }
}

CurrencyOption = connect(store=>{
    return{

    }
})(CurrencyOption)

export default CurrencyOption
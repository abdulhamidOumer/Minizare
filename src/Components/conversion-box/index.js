import React,{Component} from 'react'
import {connect} from 'react-redux'
import './main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThList} from '@fortawesome/fontawesome-free-solid'
import {showCurrencyOptions,getCurrencyTo,changeCurrencyFrom} from '../../Actions/ConversionBoxActions'
import {getCurrentCurrenciesRate} from '../../Actions/mainActions'
import Loading from '../../Components/Loading'
import NumberFormat from 'react-number-format'

class ConversionBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            upperCurrencyValue:"",
            lowerCurrencyValue:""
        }
    }

    handleCurrencyInputs(event){
        if(this.props.calculate){
            return;
        }

        const inputPosition = event.target.name
        const cleanString = event.target.value.replace(/\D/g,'');
        console.log(cleanString);
        const num = parseFloat(cleanString)
        
        if(inputPosition === 'UPPER_INPUT'){
            if(this.props.upperCurrency.id !== this.props.changeFrom.id){
                this.props.dispatch({type:"NULL_CURRENT_RATE"});
                this.props.dispatch(changeCurrencyFrom(this.props.upperCurrency));
            }
            this.setState({upperCurrencyValue:event.target.value})
            if(event.target.value !== ""){
                this.calculaterRate(num,'LOWER')
            }
            else{
                this.setState({lowerCurrencyValue:""})
            }
            
            
        }
        else{
            if(this.props.lowerCurrency.id !== this.props.changeFrom.id){
                this.props.dispatch({type:"NULL_CURRENT_RATE"});
                this.props.dispatch(changeCurrencyFrom(this.props.lowerCurrency));
            }
            
            this.setState({lowerCurrencyValue:event.target.value})
            if(event.target.value !== ""){
                this.calculaterRate(num,'UPPER')
            }
            else{
                this.setState({upperCurrencyValue:""})
            }
        }
    }

    calculaterRate(num,change){
        if(!this.props.currentExchangeRate){
            return;
        }
        
        switch(change){
            case "UPPER":{
                if(this.props.currentExchangeRate.to === this.props.lowerCurrency.id){
                    this.props.dispatch({type:"INITIATE_CALCULATION",payload:{num,update:"UPPER"}})
                }
                else{
                    const value = num * this.props.currentExchangeRate.value
                    this.props.dispatch({type:"STOP_CALCULATION"})
                    this.setState({upperCurrencyValue:value.toFixed(3)})
                }
                break
                
            }
            case "LOWER":{
                if(this.props.currentExchangeRate.to === this.props.upperCurrency.id){
                    this.props.dispatch({type:"INITIATE_CALCULATION",payload:{num,update:"LOWER"}})
                }
                else{
                    const value = num * this.props.currentExchangeRate.value
                    this.props.dispatch({type:"STOP_CALCULATION"})
                    this.setState({lowerCurrencyValue:value.toFixed(3)})
                }
                break;

            }
            default:
                break;
        }
        
    }

    showCurrencies(type){
        
        if(type === 'UPPER'){
            this.props.dispatch(showCurrencyOptions("SHOW_POP_UP_UPPER"))
        }
        else{
            this.props.dispatch(showCurrencyOptions("SHOW_POP_UP_LOWER"));
        }
            
    
    }

    componentDidUpdate(prevProps){
        if(this.props.changeFrom !== prevProps.changeFrom){
            this.props.dispatch(getCurrentCurrenciesRate());
        }

        if(this.props.calculate !== prevProps.calculate){
            if(this.props.calculate.hasOwnProperty('ready')){
                this.calculaterRate(this.props.calculate.num, this.props.calculate.update);
            }
        }

        if(this.props.upperCurrency !== prevProps.upperCurrency || this.props.lowerCurrency !== prevProps.lowerCurrency){
            this.setState({upperCurrencyValue:"",lowerCurrencyValue:""});
        }

    }

    render(){
        let conversionFormula = (<Loading marginTop="5%"/>);
        if(this.props.currentExchangeRate){

            conversionFormula = (
                <h3 className='conversion-formula'>1 
                    <label className='currency-name'> {this.props.changeFrom.name} </label> is equal to 
                    <label> {this.props.currentExchangeRate.value.toFixed(3)}</label> 
                    <label className='currency-name'> {getCurrencyTo(this.props.changeFrom)} </label>
                </h3>
            )

        }
    
        return(
            <div className='conversion-box'>


                <div className='currency-holder'>
                    <NumberFormat prefix={`${this.props.upperCurrency.symbol} `} thousandSeparator={true} name='UPPER_INPUT'  value={this.state.upperCurrencyValue} onChange={this.handleCurrencyInputs.bind(this)} placeholder={this.props.upperCurrency.name} className='currency-input'/>
                    <label className='currency-id'>{this.props.upperCurrency.id}</label>
                    <FontAwesomeIcon onClick={this.showCurrencies.bind(this,'UPPER')} className='change-curreny-button' icon={faThList}/>
                </div>
                <br/>

                
                <br/>
                <div className='currency-holder'>
                    <NumberFormat prefix={`${this.props.lowerCurrency.symbol} `} thousandSeparator={true} name='LOWER_INPUT' value={this.state.lowerCurrencyValue} onChange={this.handleCurrencyInputs.bind(this)} placeholder={this.props.lowerCurrency.name} className='currency-input'/>
                    <label className='currency-id'>{this.props.lowerCurrency.id}</label>
                    <FontAwesomeIcon onClick={this.showCurrencies.bind(this,'LOWER')} className='change-curreny-button' icon={faThList}/>
                </div>

                 {conversionFormula}
            </div>
        )
    }
}

ConversionBox = connect(store=>{
    return{
        upperCurrency:store.upperCurrency,
        lowerCurrency:store.lowerCurrency,
        changeFrom:store.changeFrom,
        currentExchangeRate:store.currentExchangeRate,
        calculate:store.calculate
    }
})(ConversionBox)

export default ConversionBox
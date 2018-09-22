import React,{Component} from 'react'
import {connect} from 'react-redux'
import './main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/fontawesome-free-solid'
import {searchCurrency} from '../../Actions/ConversionBoxActions'

class OptionsHolder extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchTerm:""
        }
    }

    handleSearchTermChange(event){
        this.setState({searchTerm:event.target.value})
    }

    initiateSearchCurrency(){
        const searchTerm = this.state.searchTerm
        this.props.dispatch(searchCurrency(searchTerm))
    }

    handleKeyPress(event){
        if(event.key === 'Enter'){
            const searchTerm = this.state.searchTerm
            this.props.dispatch(searchCurrency(searchTerm))
        }
    }

    render(){
        return(
            <div className='options-holder'>
                <h3 className='popup-main-title'>Choose A Currency</h3>

                <div className='search-holder'>
                    <input type='text' placeholder='Search Country Or Currency' value={this.state.searchTerm} onChange = {this.handleSearchTermChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}  className='search-input'/>
                   <FontAwesomeIcon className='search-curreny-button' onClick={this.initiateSearchCurrency.bind(this)} icon={faSearch}/>
                </div>
                <div className='inner-options'>
                    {this.props.currencyListComponents}
                </div>
            </div>
        )
    }
}

OptionsHolder = connect(store=>{
    return{
        countries:store.countries,
        currencyListComponents:store.currencyListComponents
    }
})(OptionsHolder)

export default OptionsHolder
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {ResponsiveContainer,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {getCurrencyTo} from '../../Actions/ConversionBoxActions'
import {getCurrentChart,} from '../../Actions/mainActions'
import Loading from '../../Components/Loading'
import {showToaster} from '../../Actions/VariousActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChartLine, faExclamationTriangle, faTimes} from '@fortawesome/fontawesome-free-solid'
import './main.css'


class Charts extends Component{

    constructor(props){
        super(props)
        this.state = {
            exchangeHistory:null,
            fromDateValue:'',
            toDateValue:''
        }
    }

    handleDateInout(event){
        const inputName = event.target.name
        const value = event.target.value
        switch(inputName){
            case "fromDateInput":{
                this.setState({fromDateValue:value})
                break
            }
            case "toDateInput":{
                this.setState({toDateValue:value})
                break
            }
            default:
                break
        }
    }

    showErrorToaster(items){
        this.props.dispatch(showToaster(items))
    }

    checkDatesValidity(){
        const currentDate = new Date()
        const fromDate = new Date(this.state.fromDateValue)
        const toDate = new Date(this.state.toDateValue)

        const timeDiff = toDate.getTime() - fromDate.getTime()
        const dayDiff = Math.ceil(timeDiff/(1000 * 3600 * 24))

        if(fromDate > currentDate || toDate > currentDate){
            return {status:false, message: "Please don't choose dates further from today"}
        }

        if(dayDiff > 8 || dayDiff < 2){
            return {status:false, message: "Please only choose time periods of up to 8 days."}
        }

        return {status:true}
    }

    showCurrentDatesHistory(){
        const dateValidity = this.checkDatesValidity()
        if(dateValidity.status){
            this.props.dispatch(getCurrentChart(this.state.fromDateValue, this.state.toDateValue))
        }
        else{
            const message = dateValidity.message
            const background = "var(--error-color)"
            const itemsBackground = "white"
            const iconRight = faTimes
            const iconLeft = faExclamationTriangle

            this.showErrorToaster({message, background, itemsBackground, iconRight, iconLeft});
        }
    }


    componentWillMount(){
        const currentDate = new Date();
        const toDate = this.formatDate(currentDate)
        currentDate.setDate(currentDate.getDate()-7)
        const fromDate = this.formatDate(currentDate)
        
        this.setState({fromDateValue:fromDate, toDateValue:toDate})
        //this.props.dispatch(getCurrentChart(fromDate,toDate));
    }

    formatDate(d){ 

        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    componentDidUpdate(prevProps){
        if(this.props.exchangeHistory !== prevProps.exchangeHistory && this.props.exchangeHistory){
            this.renderHistory();
        }

        if(this.props.changeFrom !== prevProps.changeFrom || this.props.toCurrency !== prevProps.toCurrency){

            const currentDate = new Date();
            const toDate = this.formatDate(currentDate)
            currentDate.setDate(currentDate.getDate()-7)
            const fromDate = this.formatDate(currentDate)
            
            this.setState({fromDateValue:fromDate, toDateValue:toDate})
            this.props.dispatch(getCurrentChart(fromDate,toDate));
        
        }
    }

    renderHistory(){
        const toCurrencyId = this.props.toCurrency.id
        const toCurrency = this.props.toCurrency.name
        const fromCurrencyId = this.props.changeFrom.id
        let rawData = null;
        
        if(this.props.exchangeHistory.hasOwnProperty(`${fromCurrencyId}_${toCurrencyId}`)){
            rawData = this.props.exchangeHistory[`${fromCurrencyId}_${toCurrencyId}`]
        }
        else{
            return
        }

        const convertedData = []
        for(let key in rawData){
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
            
            let theDate = new Date(key)
            let axis = {}
            axis['Date'] = `${monthNames[theDate.getMonth()]} ${theDate.getDate()}`
            axis[toCurrency] = rawData[key]
            convertedData.push(axis)
        }

        this.setState({exchangeHistory:convertedData});

    }
    render(){

        let chart = (<Loading />)
        let height = '400px'

        if(this.props.exchangeHistory){
            chart = (
                <ResponsiveContainer className='the-chart' width="100%" height={300}>
                    <AreaChart data={this.state.exchangeHistory} store="var(--color-accent)" margin={{ top: 20, right: 35, left: 0, bottom: 0 }}>
                        <XAxis dataKey="Date"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Area type="monotone" dataKey={getCurrencyTo(this.props.changeFrom)} stroke="var(--primary-color-one)" activeDot={{r: 8}} fill="var(--primary-color-one)"/>
            
                    </AreaChart>
                </ResponsiveContainer>
            )

            height = 'inherit'
        }

        return(
            <div className ='chart-container' style={{height:height}}>
                <h4 className='chart-title'>Exchange History Chart</h4>
                {chart}
                <div className='from-to-div'>
                    <h4 className='chart-title'>Change Exchange History Dates</h4>
                    <input name='fromDateInput' value={this.state.fromDateValue} onChange={this.handleDateInout.bind(this)} type='date' className='date-input'/>
                    <label className='date-input-separator'>-</label>
                    <input name='toDateInput' value={this.state.toDateValue} onChange={this.handleDateInout.bind(this)} type='date' className='date-input'/>
                    <br/>
                    <button onClick={this.showCurrentDatesHistory.bind(this)} className='show-history-button'><FontAwesomeIcon className='button-icon' icon={faChartLine}/></button>
                </div>
            </div>
        )
    }
}

Charts = connect(store=>{
    return{
        changeFrom:store.changeFrom,
        exchangeHistory:store.exchangeHistory,
        toCurrency:getCurrencyTo(store.changeFrom, 'all')
    }
})(Charts)

export default Charts
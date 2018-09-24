import React,{Component} from 'react'
import {connect} from 'react-redux'
import {ResponsiveContainer,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {getCurrencyTo} from '../../Actions/ConversionBoxActions'
import Loading from '../../Components/Loading'
import './main.css'


class Charts extends Component{

    constructor(props){
        super(props)
        this.state = {
            exchangeHistory:null
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.exchangeHistory !== prevProps.exchangeHistory){
            this.renderHistory();
        }
    }

    renderHistory(){
        const toCurrencyId = getCurrencyTo(this.props.changeFrom,'id')
        const toCurrency = getCurrencyTo(this.props.changeFrom)
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

        let chart = (<Loading top='40%'/>)
        let height = '400px'

        if(this.props.exchangeHistory){
            chart = (
                <ResponsiveContainer width="100%" height={300}>
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
                <h4 className='chart-title'>Past 7 Days Exchange History Chart</h4>
                    {chart}
                </div>
        )
    }
}

Charts = connect(store=>{
    return{
        changeFrom:store.changeFrom,
        exchangeHistory:store.exchangeHistory
    }
})(Charts)

export default Charts
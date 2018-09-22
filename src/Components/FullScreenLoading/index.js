import React,{Component} from 'react'
import './main.css'

class FullScreenLoading extends Component{
    render(){
        return(
        <div id="loadingContainer">
            <div id="loader"></div>
        </div>
        )
    }
}

export default FullScreenLoading;
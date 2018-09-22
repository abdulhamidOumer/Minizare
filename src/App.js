import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css'
import TopBar from './Components/TopBar'
import ConversionBox from './Components/conversion-box'
import Charts from './Components/Charts'
import OptionsHolder from './Components/OptionsHolder'
import PopUpHolder from './Components/PopUpHolder'
import FullScreenLoading from './Components/FullScreenLoading';
import {getPreferences} from './Actions/mainActions'
import Menu from './Components/Menu'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      PopUp:null,
      menu:null
    }
  }

  componentWillMount(){
    this.props.dispatch(getPreferences());
  }

  
  componentDidUpdate(prevProps){
    if(this.props.PopUp !== prevProps.PopUp){
      switch(this.props.PopUp){

        case "CURRENCY_OPTIONS":{
          this.setState({PopUp:(<PopUpHolder element={<OptionsHolder />}/>)})
          break;
        }

        case null:{
          this.setState({PopUp:null})
          break
        }

        default:
          break

      }
      
    }

    if(this.props.topMenu !== prevProps.topMenu){
      
      if(this.props.topMenu){
        this.setState({menu:(<Menu />)})
      }
      else{
        this.setState({menu:null})
      }

    }

    
  }

  render() {
    let fullScreenLoading = null
    if(this.props.full_screen_loading)
      fullScreenLoading = <FullScreenLoading />
      
    return (
      <div className = "app-container">
        {fullScreenLoading}
        {this.state.PopUp}
        <TopBar />
        {this.state.menu}
        <ConversionBox />
        <Charts />
      </div>
    );
  }
}

App = connect(store=>{
  return {
    PopUp:store.PopUp,
    full_screen_loading:store.full_screen_loading,
    topMenu:store.topMenu,
    theme:store.theme
  }
})(App)

export default App;

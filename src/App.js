import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css'
import {showPopUp} from './Actions/VariousActions'
import TopBar from './Components/TopBar'
import ConversionBox from './Components/conversion-box'
import Charts from './Components/Charts'
import OptionsHolder from './Components/OptionsHolder'
import PopUpHolder from './Components/PopUpHolder'
import FullScreenLoading from './Components/FullScreenLoading';
import {getPreferences} from './Actions/mainActions'
import {closeToaster, closePopUp} from './Actions/VariousActions'
import Menu from './Components/Menu'
import Toaster from './Components/Toaster'
import FloatingButton from './Components/FloatingButton'
import InfoBox from './Components/InfoBox'
import InfoPopUp from './Components/InfoPopUp'
import ReactGa from 'react-ga'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      PopUp:null,
      menu:null,
      toaster:null
    }
  }

  componentWillMount(){
    ReactGa.initialize('UA-127171800-1')
    ReactGa.pageview('/')
    this.props.dispatch(getPreferences());
  }

  closePopUpHolder(){
    this.props.dispatch(closePopUp())
  }
  
  componentDidUpdate(prevProps){
    if(this.props.PopUp !== prevProps.PopUp){
      switch(this.props.PopUp){

        case "CURRENCY_OPTIONS":{
          this.setState({PopUp:(<PopUpHolder element={<OptionsHolder />}/>)})
          break;
        }

        case "INFO_BOX":{
          this.setState({PopUp:(<PopUpHolder element={<InfoBox />}/>)})
          break;
        }

        case "INFO_POP_UP":{
          this.setState({PopUp:(<PopUpHolder element={<InfoPopUp />}/>)})
          break
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

    if(this.props.toaster !== prevProps.toaster){
      if(this.props.toaster){
        const toaster = this.props.toaster
        const toasterToShow = (
          <Toaster 
            message={toaster.message} 
            background={toaster.background} 
            itemsBackground={toaster.itemsBackground} 
            iconRight={toaster.iconRight} 
            iconLeft={toaster.iconLeft} 
            iconAction={this.closeToasterView.bind(this)}
          />)

        this.setState({toaster:toasterToShow});

      }
      else{
        this.setState({toaster:null});
      }
    }

    
  }

  closeToasterView(){
    this.props.dispatch(closeToaster());
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
        {this.state.toaster}
        <FloatingButton text="Info" onClick={()=>{this.props.dispatch(showPopUp('INFO_BOX'))}}/>
      </div>
    );
  }
}

App = connect(store=>{
  return {
    PopUp:store.PopUp,
    full_screen_loading:store.full_screen_loading,
    topMenu:store.topMenu,
    theme:store.theme,
    toaster:store.toaster,
    infoPopUpState: store.infoPopUpState
  }
})(App)

export default App;

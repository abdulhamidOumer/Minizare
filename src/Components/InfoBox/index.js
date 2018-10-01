import React,{Component} from 'react'
import './main.css'
import InfoTab from './infoTab'
import {faDownload, faFileAlt, faInfoCircle, faCode} from '@fortawesome/fontawesome-free-solid'
import HowTo from './howToInstall'
import About from './about'
import Lisence from './softwareLisence'
import Contributions from './contributions'

class InfoBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            howTo:true,
            lisence:false,
            contributions:false,
            about:false,
            activeComponent:null    
        }
    }

    componentWillMount(){
        this.setState({activeComponent:(<HowTo />)})
    }

    changeActiveComponent(componentName){
        switch(componentName){
            case "how-to":{
                this.setState({howTo:true, lisence: false, contributions:false, 
                    about:false, activeComponent:(<HowTo />)
                })

                break
            }

            case "lisence":{
                this.setState({howTo:false, lisence: true, contributions:false, 
                    about:false, activeComponent:(<Lisence />)
                })

                break
            }

            case "contributions":{
                this.setState({howTo:false, lisence: false, contributions:true, 
                    about:false, activeComponent:(<Contributions />)
                })

                break
            }

            case "about":{
                this.setState({howTo:false, lisence: false, contributions:false, 
                    about:true, activeComponent:(<About />)
                })

                break
            }
            default:{
                break
            }
        }

    }

    render(){
        return(

            <div className='info-box'>
                <div className='tabs-container'>
                    <InfoTab active={this.state.howTo} icon={faDownload} onClick={this.changeActiveComponent.bind(this,'how-to')}/>
                    <InfoTab active={this.state.lisence} icon={faFileAlt} onClick={this.changeActiveComponent.bind(this,'lisence')}/> 

                    <InfoTab active={this.state.contributions} icon={faCode} onClick={this.changeActiveComponent.bind(this,'contributions')}/>

                    <InfoTab active={this.state.about} icon={faInfoCircle} onClick={this.changeActiveComponent.bind(this, 'about')}/>
                    
                </div>
                <div className='info-box-content'>
                    {this.state.activeComponent}
                </div>
            </div>
        )
    }
}

export default InfoBox
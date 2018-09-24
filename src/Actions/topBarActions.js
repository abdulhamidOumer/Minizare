import {addValueToCellObject} from '../modules/idbOperations'
export const menuDisplayActions = (action)=>{
    return(dispatch)=>{
        
        switch(action){
            case "SHOW":{
                dispatch({type:"SHOW_TOP_MENU"})
                break;
            }
            case "HIDE":{
                dispatch({type:"HIDE_TOP_MENU"})
                break;
            }
            default:{
                break;
            }
        }
    }
}

const themes = {
    light:{
        primary:"#42A5F5", 
        primary_dark:"#1E88E5", 
        primary_text_color:"#6e6e6e",
        inactive_color:"#c0c0c0",
        border_color:"#d4d4d4",
        input_background:"#ffffff",
        text_dark:"#556270",
        title_color:"#ffffff",
        color_accent:"#ffffff",
        main_background:"#d1d1d1"
    },
    dark:{
        primary:"#43abff", 
        primary_dark:"#1E88E5", 
        primary_text_color:"#ffffff",
        inactive_color:"#c0c0c0",
        border_color:"#666565",
        input_background:"#616161",
        text_dark:"#EEEEEE",
        title_color:"#ffffff",
        color_accent:"#424242",
        main_background:"#616161"
    },
    pied:{
        primary:"#26A69A", 
        primary_dark:"#005f51", 
        primary_text_color:"#ffffff",
        inactive_color:"#c0c0c0",
        border_color:"#666565",
        input_background:"#616161",
        text_dark:"#EEEEEE",
        title_color:"#ffffff",
        color_accent:"#424242",
        main_background:"#616161"
    }
}

export const changeActiveTheme = (theme)=>{
    return(dispatch)=>{
        switch(theme){
            case "LIGHT":{
                changeTheme(themes.light)
                break;
            }
            case "DARK":{
                changeTheme(themes.dark)
                break;
            }
            case "PIED":{
                changeTheme(themes.pied)
                break;
            }
            default:
                break;
        }

        dispatch({type:"CHANGE_THEME", payload:theme})
        addValueToCellObject(theme,'theme','preferences')
    }
}

const changeTheme = (theme)=>{
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content",theme.primary);

    document.documentElement.style.setProperty('--primary-color-one',theme.primary)
    document.documentElement.style.setProperty('--primary-dark',theme.primary_dark)
    document.documentElement.style.setProperty('--primary-text-color', theme.primary_text_color)
    document.documentElement.style.setProperty('--inactive-color', theme.inactive_color)
    document.documentElement.style.setProperty('--border-color', theme.border_color)
    document.documentElement.style.setProperty('--input-background', theme.input_background)
    document.documentElement.style.setProperty('--text-dark', theme.text_dark)
    document.documentElement.style.setProperty('--title-color', theme.title_color)
    document.documentElement.style.setProperty('--color-accent', theme.color_accent)
    document.documentElement.style.setProperty('--main-background', theme.main_background)
}
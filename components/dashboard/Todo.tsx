import {NextPage} from 'next';
import FeatherIcon from 'feather-icons-react';

interface Props{
    iconTypes : string,
    iconText : string
}

export const Todo:NextPage<Props>=(Props)=> {
    const {iconTypes, iconText} = Props;
    
    return(
        <div className="flex items-center text-primary font-medium"> 
            <FeatherIcon icon={iconTypes}/>
            <p className="ml-4">{iconText}</p> 
        </div>)

}
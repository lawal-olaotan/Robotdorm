
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {NextPage} from 'next';

interface Props{
    iconTypes : IconDefinition,
    iconText : string
}

export const Todo:NextPage<Props>=(Props)=> {
    const {iconTypes, iconText} = Props;
    
    return(
        <div className="flex items-center text-primary font-medium"> 
            <FontAwesomeIcon icon={iconTypes}/>
            <p className="ml-4">{iconText}</p> 
        </div>)

}
import {NextPage} from 'next'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import {faClock} from '@fortawesome/free-solid-svg-icons';
import YouTube from "react-youtube";

interface YoutubeProps {
    title: string;
    description: string;
    duration:string;
    videoId: string;
}

export const YoutubeWidgets:NextPage<YoutubeProps>  =(YoutubeProps)=> {

    const yTOpts = {
        height: "292.5",
      width: "480",
      playerVars: {
        autoplay: 1,
      },
    }

    const onReady = (event:any) => {
        event.target.pauseVideo();
    }

    const {title, description, duration, videoId} = YoutubeProps


    return (
        <div className="w-fit mb-12 flex items-center ">
                    <YouTube videoId={videoId} opts={yTOpts} onReady={onReady}/>
                    <div className="ml-4">
                        <h3 className="mb-2 font-semibold text-1xl">{title}</h3>
                    
                        <p className="mb-2">{description}</p>
                        <span><FontAwesomeIcon icon={faClock}/> <span className="ml-4">{duration}</span></span>
                    </div>
                </div>


    )
}



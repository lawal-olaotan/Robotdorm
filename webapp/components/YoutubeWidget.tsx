import {NextPage} from 'next'
import YouTube from "react-youtube";

interface YoutubeProps {
    title: string;
    description: string;
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

    const {title, description, videoId} = YoutubeProps


    return (
        <div className="w-fit mb-12 flex items-center ">
                    <YouTube videoId={videoId} opts={yTOpts} onReady={onReady}/>
                    <div className="ml-4">
                        <h3 className="mb-2 font-semibold text-1xl">{title}</h3>
                        <p className="mb-2">{description}</p>
                    </div>
                </div>


    )
}



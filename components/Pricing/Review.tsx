import Image from 'next/image'
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure  from "react-use-measure"
import { useEffect,useState} from "react";

"use client";
export const Review = ()=> {

    const reviews = [
        {
            review:'The #1 Jumia seller tool out there. It was possible to start & grow my Jumia businesses in Kenya and Morocco. This is the only tool you need to be successful.',
            name:'Justo',
            country:'ke'
        },
        {
            review:'Robotdorm keyword tool not only provides accurate market data, but it also a complete tool suite that is easy to use for both beginners and advanced Jumia sellers.',
            name:'ArinoMarket',
            country:'ma'
        },
        {
            review:'Great thanks to Leo and his teams . It is a excellent tool that help me a lot in discovering the tops sellers . Recommend to  all  Jumia sellers！！！',
            name:'Wong',
            country:'ke'
        },
        {
            review:'I LOVE market insights. I started using it to keep track of my searches. Using this strategy, I launched a product on Jumia Nigeria; I ship over 100 units weekly, Seven months later!',
            name:'reed',
            country:'ng'
        },
        {
            review:'Robotdorm is irreplaceable when researching and trying to understand the market for your product. The insights tools make my work world easier, and my selections educated.',
            name:'Litter',
            country:'ug'
        },
        {
            review:'Robotdorm is the ONE tool I can not live without. There’s ways to use it that simply blow you away once you realize the power of what they can do for your business.',
            name:'Roar',
            country:'ng'
        },
        {
            review:'One year has gone by, and I’m thrilled with Robotdorm. Very easy to use and navigate. Also, it allows me to see how well my Jumia business is doing.',
            name:'abdessamed',
            country:'ng'
        },
    ]

    let [ref, { width }] = useMeasure();
    let [mustFinish, setMustFinish ] = useState<boolean>(false)
    let [render,setRenderStatus] = useState<boolean>(false)
    const FAST_DURATION = 25;
    const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  const xTranslation = useMotionValue(0);

    useEffect(() => {
        let finalPosition = -width / 2 - 8;
        let controls

        if (mustFinish) {
        controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
            ease: "linear",
            duration: duration * (1 - xTranslation.get() / finalPosition),
            onComplete: () => {
            setMustFinish(false);
            setRenderStatus(!render);
            },
        });
        } else {
        controls = animate(xTranslation, [0, finalPosition], {
            ease: "linear",
            duration: duration,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
        });
        }

        return controls?.stop;
    }, [xTranslation, width]);

    
    return(
        <div className='my-20 w-full'>
                    <h2 className="text-3xl font-bold ">Used by best selling ecommerce experts</h2>

                    <motion.div className='grid grid-flow-col justify-start space-x-4  w-full' ref={ref} style={{ x: xTranslation }}>

                    { [...reviews,...reviews].map((review,index)=> (

                        <motion.div key={index} className="min-w-[300px] bg-white my-6 p-6 font-regular">
                            <span className='text-sm'>{review.review}</span>

                            <div className='flex items-center'>
                                <span className="mx-2 my-4 font-bold">{review.name}</span>
                                <Image className='rounded-full' height={30} width={30} src={`https://flagcdn.com/h120/${review.country}.png`} alt="robotdorm-logo" />
                            </div>
                            
                        </motion.div>

                    ))
                    }

                    </motion.div>

                    
        </div>
    )
}

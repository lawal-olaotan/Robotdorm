import {NextPage} from 'next';


interface Props {
    orderImg :string
    orderContent :string
    secImage :string
    secTitle: string
    secContent:string
    secBgColor:string
    secTextColor:string
}

export const AboutSec:NextPage<Props> =(Props) => {

    const {orderImg, orderContent,secImage,secTitle,secContent,secBgColor,secTextColor} = Props

    return (
        <>
        <div className={secBgColor}>
        <div className='sm:p-4 lg:py-10 xl:px-24 lg:px-12 2xl:w-[1440px] m-auto flex items-center justify-between'>
            <div className={`w-1/2 sm:hidden lg:flex items-center justify-center ${orderImg}`}>
                <img className='w-100' src={secImage} alt="working-culture"/>
            </div>
            <div className={`${secTextColor} lg:w-2/5 sm:w-full sm:text-center lg:text-left ${orderContent}`}>
            <h2 className="text-xl font-semibold mb-4 ">{secTitle}</h2>
            <p>{secContent}</p>

            </div>
        </div> 
        </div>
        </>
    )
        
        
}
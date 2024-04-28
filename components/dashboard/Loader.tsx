
import { Triangle, Rings } from  'react-loader-spinner'


export const Loader =() => {

    return (
        <div className='w-full h-full flex  justify-center items-center'>
            <Triangle
            height="200"
            width="200"
            color="#0A2635"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
            />

        </div>
    )

}

export const SignupLoader =() => {

    return(
        <Rings
        height="30"
        width="30"
        color="#FFFFFF"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
        />
    )
}
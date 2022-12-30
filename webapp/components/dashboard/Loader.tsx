
import { Triangle } from  'react-loader-spinner'


export const Loader =() => {

    return (
        <div className='w-full h-2/4 flex  justify-center items-center'>
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
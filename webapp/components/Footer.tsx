import Link from 'next/link';

interface Icons {icon: string,link:string}




export const Footer = () => {

    const Myicons: Icons [] = [

        { 
            icon:"/facebook.svg",
            link:"https://www.facebook.com/robotdorm"
        },
       {
            icon:"/instagram.svg",
            link:"https://www.instagram.com/robotdorm/?hl=en"
        },{
            icon:"/mail.svg",
            link:"https://api.whatsapp.com/send?phone=447546979379&text=checking%20out%20your%20extension"
        }
    ]
    
    return(
        <div className="bg-primary text-white flex items-center md:justify-between xl:px-24 sm:p-4  lg:px-12 2xl:px-72 lg:py-8 md:flex-row sm:flex-col sm:justify-center md:text-sm sm:text-xs">

            <div className="flex justify-between items-center lg:w-[20%] md:w-1/4 sm:w-1/2 sm:mb-4 md:mb-0">
                { Myicons.map((icons: Icons)=> (
                    <Link key={icons.link} href={icons.link}><a className="text-white "><img src={icons.icon} alt="" /></a></Link>
                ))}
            </div>
            <p className="text-center">© 2021 Robot Dorm</p>

        </div>
        )

}
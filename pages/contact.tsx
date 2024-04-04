import { Layouts01 } from "@components/Layouts01"
import type { ReactElement } from 'react'
import  Head  from 'next/head';
import React,{useRef} from "react";
import {toast, ToastContainer} from 'react-toastify'


export default function Contact(){
    const formRef = useRef(null)

    const handleContactUs = async (event: React.SyntheticEvent) => {

            try{event.preventDefault();
                    const target = event.target as typeof event.target & {
                        email: { value: string };
                        name: { value: string };
                        phone: { value: string };
                        message: { value: string };
                    };

                    const formData = {
                        email: target.email.value,
                        name: target.name.value,
                        phone: target.phone.value,
                        message: target.message.value,
                    };

                fetch('https://getform.io/f/08b3c619-b1d7-4d6c-856b-e2cbec9f577e',{
                method: 'POST',
                body:JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
              }).then(response => {
                    console.log(response)
                if(response.ok){
                    toast.success('Message sent successfully, we will reach out to you soon.', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    formRef.current.reset()
                }
              })
              
            }catch(error){
                console.log(error)
            }
    }

    return (

        <div>
            <Head>
                <title>Contact Us | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>+
            <main className="sm:p-4 lg:py-10 xl:px-24 lg:px-12 2xl:w-[1440px] m-auto h-[83vh]">
                <div className="lg:w-4/12 sm:w-full m-auto mt-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-8 text-primary">Contact Support</h1>
                        <p>Ready to create your dream ecommerce business or interested in our solutions? reach out to our support team.</p>
                    </div>
                        <form ref={formRef} className="w-full" onSubmit={handleContactUs}>
                                <input className="border border-solid border-black p-2 w-full mb-4" type="text" name="name" placeholder="Full Name" required/>

                                <input className="border border-solid border-black p-2 w-full mb-4" type="email" name="email" placeholder="Email" required/>

                                <input className="border border-solid border-black p-2 w-full mb-4" type="tel" name="phone" placeholder="Whatsapp Number" required/>

                                <textarea className="border border-solid border-black p-2 w-full mb-6" cols={30} rows={6} name="message" placeholder="Tell us what you have in mind" required />

                                <input className="border border-solid bg-primary text-white p-2 w-full mb-4" type="submit" value="Submit" />

                                <input type="hidden" name="_gotcha" className="hidden"/>
                          
                        </form>
                </div>
                <ToastContainer/>
            </main>
        </div>

        )
}

Contact.getLayout = function getLayout(page:ReactElement){
    return (
        <Layouts01>
        {page}
        </Layouts01>

    )
} 
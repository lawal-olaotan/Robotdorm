import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { Lheader } from "@components/Lheader";
import { InputCom } from "@components/Auth/InputCom";
import { EmailMes } from "@components/Auth/Emailsent";
import { SignupLoader } from "@components/dashboard/Loader";
import { useRouter } from "next/router";

interface IUsers {
  email: string;
}

const AuthForm = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [Emailsent, setEmailSent] = useState(false);
  const [buttonPushed, setButtonPushed] = useState(false);
  const [userInfo, setUserInfo] = useState<IUsers>({ email: "" });
  const router  = useRouter()

  // TODO: Move to service layer
  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setButtonPushed(true);

    const InputEmail = emailInputRef.current.value;

    const userStatus = await fetch(`/api/getInfo?email=${InputEmail}`).then(
      (response) => response.json()
    );
    if(!userStatus.ok) return router.push('signup'); 

    const userdetails = {
      email: InputEmail,
    };

    setUserInfo(userdetails);

    const result = await signIn("email", {
      redirect: false,
      email: InputEmail,
      callbackUrl:'/dashboard',
    });

    if (result.ok) {
      setEmailSent(true);
      setButtonPushed(false);
    }
  };

  return Emailsent ? (
    <div className="max-w-[450px] sm:w-4/5 mx-auto">
         < EmailMes email={userInfo.email} pageToggle={setEmailSent} />
    </div>
   
  ) : (
    <div>
      <Head>
        <title> Login | RobotDorm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center py-20">
        <div className="max-w-[400px] sm:w-4/5 mx-auto">
          <Lheader Title="Login to RobotDorm" />

          <form onSubmit={submitForm}>
            <InputCom
              labelName="Email"
              id="email"
              type="email"
              placeholder="Please enter your email"
              refName={emailInputRef}
            />

            <button className="rounded-lg mt-8 bg-secondary p-3.5 w-full text-white flex items-center justify-center">
              {buttonPushed ? <SignupLoader /> : "Send Verification Token"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AuthForm;

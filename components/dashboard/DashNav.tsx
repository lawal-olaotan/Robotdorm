import Link from "next/link";
import { useState, useEffect } from "react";
import { DashIcons } from "@components/dashboard/DashIcons";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import {logout} from 'lib/events'
import FeatherIcons from "feather-icons-react";
import { NextPage } from "next";

interface DashStateProps {
  state:boolean
  stateTrigger: ()=> void
}

export const DashNav:NextPage<DashStateProps> = ({stateTrigger, state}) => {
  const [active, setActive] = useState(false);
  const { data: session, status }: { data: Session; status: string } = useSession();

  useEffect(() => {
    if (active) {
      window.addEventListener("click", function () {
        setActive(false);
      });
    } else {
      window.removeEventListener("click", function () {
        setActive(false);
      });
    }

    return () =>
      window.removeEventListener("click", function () {
        setActive(false);
      });
  }, [active]);


  return (
    <nav className="flex items-center justify-between py-4 sm:px-6 lg:pl-[75px] xl:pl-[90px] fixed left-0 right-0 top-0 lg:z-[1] sm:z-20 h-[68px] shadow-5xl bg-white">
  

        <Link href="/dashboard">
          <a className="inline-flex lg:w-48 sm:w-40 lg:mx-0">
            <img className="w-100" src="/logo2.png" alt="robotdorm-logo" />
          </a>
        </Link>

      <div className="flex items-center justify-between lg:w-48 sm:w1/2">

        <div className="flex items-center justify-between">
          <DashIcons
            imgsrc="/fb.png"
            soLink="https://www.facebook.com/robotdorm"
          />
          <DashIcons
            imgsrc="/ig.png"
            soLink="https://www.instagram.com/robotdorm/"
          />
        </div>

        <div>
          <div className="sm:hidden lg:flex items-center justify-center bg-black rounded-full p-1 w-[45px] h-[45px]"
            onMouseEnter={() => setActive(!active)}
          >
            <img src="/icons.png" alt="profile-pic" />
          </div>
          <div>
            <div
              className={`${
                active ? "flex" : "hidden"
              } p-5 absolute top-[4.5pc] right-[3pc] w-[220px] h-[200px] z-[1] items-center bg-dashpop shadow-6xl text-black flex-col rounded-sm`}
            >
              <div className="flex items-center justify-center bg-black rounded-full p-1 w-[40px] h-[40px] mb-4">
                <img src="/icons.png" alt="profile-pic" />
              </div>

              <div className="text-center">
                <p className="text-sm font-medium mb-2">
                  <span>{session?.user?.email}</span>
                </p>
                <p className="text-sm mb-2">
                  <span>{session?.user?.name}</span>
                </p>
                <Link href="https://us12.list-manage.com/contact-form?u=2fb544e735311cbddb1b13831&form_id=77652526220b2b199c0794a74dbfbe86https://us12.list-manage.com/contact-form?u=2fb544e735311cbddb1b13831&form_id=77652526220b2b199c0794a74dbfbe86">
                  <a className="text-sm font-semibold text-blue">
                    Contact Support
                  </a>
                </Link>
                <button
                  role="button"
                  className="w-full text-sm font-semibold text-blue block mt-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="lg:hidden ml-2 inline-flex outline-none text-secondary" onClick={stateTrigger}>
                <FeatherIcons icon={state ? 'menu' : 'x'} size={40}/>
        </button>


      </div>
    </nav>
  );
};

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navitems } from "@components/LandingPage/Navitems";
import { DashIcons } from "@components/dashboard/DashIcons";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import {logout} from '../../lib/AuthFunc'

export const DashNav = () => {
  const [active, setActive] = useState(false);
  const { data: session, status }: { data: Session; status: string } = useSession();
    const router = useRouter();

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
    <nav className="flex items-center justify-between py-4 pr-12 pl-0 lg:pl-[75px] xl:pl-[90px] fixed left-0 right-0 top-0 z-[1] h-[68px] shadow-5xl bg-white">
      <div className="w-full flex items-center lg:justify-between">
        <Link href="/dashboard">
          <a className="inline-flex lg:w-48 sm:w-48">
            <img className="w-100" src="/logo2.png" alt="robotdorm-logo" />
          </a>
        </Link>
        <div className="flex items-center mr-6">
        <Navitems
            routeName="How to use robotdorm"
            routeLink="https://youtu.be/Vgo3Kl7YuKI?si=aGSoSd0Cudz1tJy"
            isLink={true}
          />
          <Navitems
            routeName="Source Product"
            routeLink="https://calendly.com/robotdorm/product-sourcing-meeting"
            isLink={true}
          />
          <Navitems
            routeName="Launch Series"
            routeLink="https://dmr4lc06ats.typeform.com/to/DqPgcUIR"
            isLink={true}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-48">
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
          <div
            className="flex items-center justify-center bg-black rounded-full p-1 w-[45px] h-[45px]"
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
                <Link href="https://wa.link/mkzt3n">
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
      </div>
    </nav>
  );
};

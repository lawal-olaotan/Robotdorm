import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

export const usePageTracking = () => {
  const router = useRouter();

  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GOOGLE_GA;
    // Initialize GA4 with your Measurement ID
    ReactGA.initialize(measurementId);// Replace with your actual Measurement ID
  }, []);

  useEffect(() => {

    const handleRouteChange = (url:string) => {
      ReactGA.send({ hitType: "pageview", page: url });
    };

    // Record page view on route change
    router.events.on("routeChangeComplete", handleRouteChange);

    // Record initial page view
    handleRouteChange(router.asPath);

    // Clean up event listener
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, router.asPath]);
};
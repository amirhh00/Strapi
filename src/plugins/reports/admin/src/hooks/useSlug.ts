import { last } from "lodash";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useSlug = () => {
  const { pathname } = useLocation();

  const [slug, setSlug] = useState("");

  useEffect(() => {
    //@ts-ignore
    setSlug(last(pathname.split("/")));
  }, [pathname]);

  return {
    slug,
  };
};

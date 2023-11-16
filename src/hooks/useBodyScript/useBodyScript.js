import { useEffect } from "react";

const useBodyScript = (body) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.innerHTML = body;
    script.type = "text/javascript";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [body]);
};

export default useBodyScript;

import { useEffect } from "react";

const useScript = (url, callback) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.type = "text/javascript";
    script.defer = true;

    document.body.appendChild(script);

    callback?.();

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;

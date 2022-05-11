import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    if (!url.endsWith(".js")) return;
    const script = document.createElement('script');

    script.src = url;
    script.async = false;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;

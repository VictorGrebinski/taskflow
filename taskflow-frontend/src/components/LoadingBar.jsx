import { useEffect, useState } from "react";
import "./LoadingBar.css";

function LoadingBar({ isLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // trava em 90% até finalizar
          return prev + 5;
        });
      }, 100);
    } else {
      setProgress(100);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading && progress === 100) return null;

  return (
    <div className="loading-bar-wrapper">
      <div
        className="loading-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default LoadingBar;

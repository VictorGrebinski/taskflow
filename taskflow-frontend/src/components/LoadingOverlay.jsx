import { useEffect, useState } from "react";
import "./LoadingOverlay.css";

export default function LoadingOverlay({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;

    if (isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      setProgress(0);

      interval = setInterval(() => {
        setProgress((old) => {
          if (old >= 90) return old; // segura em 90% até terminar
          return old + 5;
        });
      }, 120);
    } else {
      setProgress(100);

      setTimeout(() => {
        setVisible(false);
      }, 400);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="spinner"></div>
        <span className="loading-text">{progress}%</span>
        <p>Carregando tarefas...</p>
      </div>
    </div>
  );
}

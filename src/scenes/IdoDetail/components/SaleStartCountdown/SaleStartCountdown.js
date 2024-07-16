import { useEffect, useState } from "react";

function timeLeft(seconds) {
  let timeString = "";
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  if (d > 0) {
    return d + " days, " + h + " h, " + m + " mins";
  } else if (h > 0) {
    return h + " hours " + m + " minutes";
  } else if (m > 0 || s > 0) {
    return m + ":" + s;
  } else {
    return "Unlocked";
  }
}

const SaleStartCountdown = ({sale_start_date}) => {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.floor((sale_start_date?.getTime() ?? 0) - Date.now()) / 1000
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);

      if (secondsLeft < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [sale_start_date]);

  return <div style={{fontWeight: 500}}>Time until sale starts: {timeLeft(secondsLeft)}</div>;
};

export default SaleStartCountdown;

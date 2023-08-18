import React, { useEffect, useState } from "react";

const CountDown: React.FC<{ duration: number }> = ({ duration }) => {
  const [time, setTime] = useState<any>();

  useEffect(() => {
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + duration);
    let min = duration;
    let sec = 0;

    let interval = setInterval(() => {
      sec--;
      if (sec === -1) {
        sec = 59;
        min--;
      }
      let newValue = (
        <>
          <span className="minutes">{formatNumber(min)}</span>
          <span className="divider">:</span>
          <span className="seconds">{formatNumber(sec)}</span>
        </>
      );
      if (min === 0 && sec === 0) {
        clearInterval(interval);
      }
      setTime(newValue);
    }, 1000);
  }, [duration]);

  let formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };
  return <div className="Timer">{time}</div>;
};

export default CountDown;

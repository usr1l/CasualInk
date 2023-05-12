import React, { useEffect, useState } from 'react';
import "./CountdownTimer.css";
import Widget from '../Widget';

const CountdownTimer = ({
  endDate,
  label
}) => {

  const remainingTime = () => {
    const timeRemaining = new Date(endDate) - new Date();
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return {
      timeRemaining,
      seconds,
      minutes,
      hours,
      days
    };
  };

  const [ timeRemaining, setTimeRemaining ] = useState(remainingTime().timeRemaining);
  const [ seconds, setSeconds ] = useState(remainingTime().seconds);
  const [ minutes, setMinutes ] = useState(remainingTime().minutes);
  const [ hours, setHours ] = useState(remainingTime().hours);
  const [ days, setDays ] = useState(remainingTime().days);

  useEffect(() => {
    const countDown = setInterval(() => {
      const remaining = remainingTime();
      const { timeRemaining, seconds, minutes, hours, days } = remaining;
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining);
        setSeconds(seconds);
        setMinutes(minutes);
        setHours(hours);
        setDays(days);
      };

      if (timeRemaining === 0) {
        setTimeRemaining(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setDays(0);
      };
    }, 1000);

    if (timeRemaining < 0) {
      setTimeRemaining(0);
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setDays(0);
      return () => clearInterval(countDown);
    };

    return () => clearInterval(countDown);
  }, [ timeRemaining ]);

  return (
    <div className='specs-box-element'>
      {/* <Widget label={"Seconds"} component={seconds}></Widget>
      <Widget label={"Seconds"} component={seconds}></Widget>
      <Widget label={"Seconds"} component={seconds}></Widget>
      <Widget label={"Seconds"} component={seconds}></Widget>
      <Widget label={"Seconds"} component={seconds}></Widget> */}
      <div className='specs-box-element-label'>{label}</div>
      <div className='specs-box-element-text'>{days} Days : {hours} Hours : {minutes} Minutes : {seconds} Seconds</div>
    </div>
  );
};


export default CountdownTimer;

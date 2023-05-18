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

  const [ timeRemaining, setTimeRemaining ] = useState(0);
  const [ seconds, setSeconds ] = useState(0);
  const [ minutes, setMinutes ] = useState(0);
  const [ hours, setHours ] = useState(0);
  const [ days, setDays ] = useState(0);

  useEffect(() => {
    const countDown = setInterval(() => {
      const { timeRemaining, seconds, minutes, hours, days } = remainingTime();
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining);
        setSeconds(seconds);
        setMinutes(minutes);
        setHours(hours);
        setDays(days);
      };

      if (timeRemaining <= 0) {
        setTimeRemaining(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setDays(0);
      };
    }, 990);

    if (timeRemaining <= 0) {
      return () => clearInterval(countDown);
    };

    return () => clearInterval(countDown);
  }, [ timeRemaining ]);

  return (
    <>
      <div className='specs-box-element-label'>{label}</div>
      <div className='specs-box-element'>
        <Widget label={"Days"} component={days}></Widget>
        <Widget label={"Hours"} component={hours}></Widget>
        <Widget label={"Minutes"} component={minutes}></Widget>
        <Widget label={"Seconds"} component={seconds}></Widget>
      </div>
    </>
  );
};


export default CountdownTimer;

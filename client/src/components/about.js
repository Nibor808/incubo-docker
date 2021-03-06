import React, { useState } from 'react';
import moment from 'moment';
import robin from '../styles/images/robin.jpg';

export default () => {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const timeSinceStartDate = moment().diff([2016, 0, 1]);

    setYears(moment.duration(timeSinceStartDate).years());
    setMonths(moment.duration(timeSinceStartDate).months());
    setDays(moment.duration(timeSinceStartDate).days());
    setHours(moment.duration(timeSinceStartDate).hours());
    setMinutes(moment.duration(timeSinceStartDate).minutes());
    setSeconds(moment.duration(timeSinceStartDate).seconds());
  };

  const renderInfoDisplay = () => {
    return `<pre>
const STATS = {
  "location": {
    "province": "Ontario",
    "country": "Canada"
  },
  "time_active": {
    "years": ${years},
    "months": ${months},
    "days": ${days},
    "hours": ${hours},
    "minutes": ${minutes},
    "seconds": ${seconds}
  },
  "skills": [
    "problem_solving",
    "clean_ui",
    "clean_code",
    "collaboration"
  ]
};
      </pre>`;
  };

  const createInfoMarkup = () => {
    return { __html: renderInfoDisplay() };
  };

  setInterval(() => {
    getTime();
  }, 1000);

  return (
    <div className='row'>
      <div className='col-sm-10 col-xl-8 top-box'>
        <div className='img-box'>
          <img
            src={robin}
            alt='me'
            height='300px'
            width='300px'
            className='img-fluid'
          />
          <h2>Robin Erickson</h2>
          <p>software developer</p>
        </div>

        <span dangerouslySetInnerHTML={createInfoMarkup()} />
      </div>

      <div className='col-sm-10 bottom-box'>
        <p>
          Working in the MERN stack with hobby projects in Swift, Go, Java, and
          Elixir
        </p>
      </div>
    </div>
  );
};

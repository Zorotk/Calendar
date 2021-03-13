import React, { FC, Fragment } from 'react';


import Calendar from './components/Calendar';

const App: FC = () => {
  return (
    <Fragment>
      <section >
            <h1 className='title'>Календарь</h1>
      </section>
      <div className="calendar">
        <Calendar />
      </div>
    </Fragment>
  );
}

export default App;

import React from 'react';
import Puppies from './puppies/puppies';
import NewPuppy from './newPuppy/newPuppy';
import './App.css'

function App() {
  return (
    <div className='App'>
      <header>
      </header>
        <h1 className='header'>Jak's puppy rescue bureau &#128021;</h1>
        <NewPuppy/>
        <Puppies/>
    </div>
  );
}

export default App;

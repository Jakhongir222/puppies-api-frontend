import React from 'react';
import Puppies from './puppies/puppies';
import NewPuppy from './newPuppy/newPuppy';

function App() {
  return (
    <div>
      <header>
      </header>
        <h1>Jak's puppy rescue agency</h1>
        <NewPuppy/>
        <Puppies/>
    </div>
  );
}

export default App;

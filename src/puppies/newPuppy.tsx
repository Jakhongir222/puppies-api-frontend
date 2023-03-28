import React, { useState } from 'react';
import './newPuppy.css'

interface Puppy {
  puppyName: string;
  puppyBreed: string;
  puppyBirthday: string;
}

interface NewPuppyProps {
  refreshPuppies: () => Promise<void>;
  getPuppies: () => Promise<void>;
}

const NewPuppy: React.FC<NewPuppyProps> = ({ refreshPuppies, getPuppies }) => {
  const [puppy, setPuppy] = useState<Puppy>({
    puppyName: '',
    puppyBreed: '',
    puppyBirthday: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('https://puppies-api-backend-production.up.railway.app/puppies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(puppy),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setPuppy({ puppyName: '', puppyBreed: '', puppyBirthday: '' });
      await refreshPuppies();
    } catch (err) {
      console.error(err);
      alert('Failed to add puppy, please try again.');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPuppy((prevPuppy) => ({ ...prevPuppy, [name]: value }));
  };

  return (
    <form className='container' onSubmit={handleSubmit}>
      <label htmlFor="puppyName">Name:</label>
      <input
        type="text"
        id="puppyName"
        name="puppyName"
        value={puppy.puppyName}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="puppyBreed">Breed:</label>
      <input
        type="text"
        id="puppyBreed"
        name="puppyBreed"
        value={puppy.puppyBreed}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="puppyBirthday">Birthday:</label>
      <input
        type="text"
        id="puppyBirthday"
        name="puppyBirthday"
        value={puppy.puppyBirthday}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Add Puppy</button>
    </form>
  );
};

export default NewPuppy;

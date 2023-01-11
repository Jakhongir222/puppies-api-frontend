import React, { useState } from 'react';
import './newPuppy.css'

interface Puppy {
  puppyName: string;
  puppyBreed: string;
  puppyBirthday: string;
}

const AddPuppy: React.FC = () => {
  const [puppy, setPuppy] = useState<Puppy>({
    puppyName: '',
    puppyBreed: '',
    puppyBirthday: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/puppies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(puppy),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert('Puppy added successfully!');
      setPuppy({ puppyName: '', puppyBreed: '', puppyBirthday: '' });
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

export default AddPuppy;

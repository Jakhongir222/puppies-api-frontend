import React from 'react';
import axios from 'axios';

interface PuppyFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PuppyFormState {
  puppyName: string;
  puppyBreed: string;
  puppyBirthday: number;
}

class PuppyForm extends React.Component<PuppyFormProps, PuppyFormState> {
  constructor(props: PuppyFormProps) {
    super(props);
    this.state = {
      puppyName: '',
      puppyBreed: '',
      puppyBirthday: 0
    };
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="puppyName"
          value={this.state.puppyName}
          onChange={this.props.onChange}
        />
        <br />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="puppyBirthday"
          value={this.state.puppyBirthday}
          onChange={this.props.onChange}
        />
        <br />
        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          name="puppyBreed"
          value={this.state.puppyBreed}
          onChange={this.props.onChange}
        />
        <br />
        <button type="submit">Add Puppy</button>
      </form>
    );
  }
}

const NewPuppy: React.FC = () => {
  const [puppyFormState, setPuppyFormState] = React.useState<PuppyFormState>({
    puppyName: '',
    puppyBreed: '',
    puppyBirthday: 0
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPuppyFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
   

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('/puppies', puppyFormState)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return <PuppyForm onSubmit={handleSubmit} onChange={handleChange} />;
};

export default NewPuppy;

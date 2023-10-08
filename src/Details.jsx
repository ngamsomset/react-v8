import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import fetchPet from './fetchPet';

const Details = () => {
  const { id } = useParams();
  //react query works by getting key in this case [details, id] if there is already id there it wont fetch
  //if not it will run the `fetchPet`.
  const results = useQuery(['details', id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">👋</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  console.log(pet);

  return (
    <div className="details">
      <div>
        <h1>pet.name</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}</h2>
        <button>Adopot {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;

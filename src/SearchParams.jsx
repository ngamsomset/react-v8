import { useState, useContext } from 'react';
import useBreedList from './useBreedList';
import Result from './Result';
import fetchSearch from './fetchSearch';
import { useQuery } from '@tanstack/react-query';
import AdoptPetContext from './AdoptPetContext';
const ANIMALS = ['', 'bird', 'cat', 'dog', 'reptile', 'rabbit'];

const SearchParams = () => {
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  const [requestParams, setRequestParams] = useState({
    location: '',
    breed: '',
    animal: '',
  });
  const [adoptPet] = useContext(AdoptPetContext);
  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  console.log(adoptPet);
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            location: formData.get('location') ?? '',
            breed: formData.get('breed') ?? '',
            animal: formData.get('animal') ?? '',
          };
          setRequestParams(obj);
        }}
      >
        {adoptPet ? (
          <div className="pet image-container">
            <img src={adoptPet.images[0]} alt={adoptPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed" id="breed" disabled={!breeds.length}>
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Result pets={pets} />
    </div>
  );
};

export default SearchParams;

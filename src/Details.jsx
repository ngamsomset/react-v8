import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import fetchPet from './fetchPet';
import Modal from './Modal';

const Details = () => {
  const { id } = useParams();
  //react query works by getting key in this case [details, id] if there is already id there it wont fetch
  //if not it will run the `fetchPet`.
  const results = useQuery(['details', id], fetchPet);
  const [showModal, setShowModal] = useState(false);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">👋</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopot {pet.name}</button>
        <p>{pet.description}</p>
      </div>
      {showModal ? (
        <Modal>
          <div>
            <h1>Would you like to adopt ${pet.name}?</h1>
            <div className="buttons">
              <button>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Details;

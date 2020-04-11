import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import ErrorModal from '../UI/ErrorModal';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';


function Ingredients() {

  const [ings, setIngs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = 'http://localhost:8000/ingredients/';

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', ings); // eslint-disable-line no-console

    // this will run only if ings change
  }, [ings]);

  const filteredIngredientsHandler = useCallback(filteredIngs => {
    setIngs(filteredIngs);
  }, []);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    axios.post(url, ingredient)
      .then(res => {
      // add a new ingredient (obj) to existing ingredients array (also add id to that ingredient)
        setIngs(prevIngs => [ ...prevIngs, { ...ingredient, id: res.data.id } ] );
        setIsLoading(false);
      });
  };

  const RemoveIngredienthandler = id => {
    setIsLoading(true);
    axios.delete(url + `${id}/`)
      .then(() => {
        // return a new list of ingredients without the one that matches id
        setIngs(prevIngredients => prevIngredients.filter(ing => ing.id !== id));
        setIsLoading(false);
      }).catch(err => {
        // react batches state change functions into a single call (component gets rerendered once)
        setError(err.message);
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal> }
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} ingredients={ings} />
        <IngredientList ingredients={ings} onRemoveItem={RemoveIngredienthandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;

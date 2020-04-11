import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';


function Ingredients() {

  const [ings, setIngs] = useState([]);
  const [filteredIngs, setFilteredIngs] = useState(ings);

  const url = 'http://localhost:8000/ingredients/';

  /*
  we don't need this code if we fetch ingredients in search
  - not ideal
  - would be better to fetch it here and then filter it directly
  */
  // useEffect(() => {
  //   axios.get(url)
  //     .then(res => {
  //       setIngs(res.data);
  //     });
  // }, []);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', ings); // eslint-disable-line no-console

    // this will run only if ings change
  }, [ings]);

  const filteredIngredientsHandler = useCallback(filteredIngs => {
    setFilteredIngs(filteredIngs);
  }, []);

  const addIngredientHandler = ingredient => {
    axios.post(url, ingredient)
      .then(res => {
      // add a new ingredient (obj) to existing ingredients array (also add id to that ingredient)
        setIngs(prevIngs => [ ...prevIngs, { ...ingredient, id: res.data.id } ] );
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} ingredients={ings} />
        <IngredientList ingredients={filteredIngs} onRemoveItem={() => {}}
        />
      </section>
    </div>
  );
}

export default Ingredients;

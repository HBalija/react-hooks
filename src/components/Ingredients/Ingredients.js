import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  const [ings, setIngs] = useState([]);

  const addIngredientHandler = ingredient => {
    // add a new ingredient (obj) to existing ingredients array (also add id to that new ingredient)
    setIngs(prevIngs => [ ...prevIngs, { ...ingredient, id: Math.random().toString() } ] );
  };

  const removeIngredientHandler = () => {

  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={ings} onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;

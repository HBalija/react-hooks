import React, { useState } from 'react';
import axios from 'axios';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';


function Ingredients() {

  const [ings, setIngs] = useState([]);

  const addIngredientHandler = ingredient => {

    axios.post('http://localhost:8000/ingredients/', ingredient)
      .then(res => {
      // add a new ingredient (obj) to existing ingredients array (also add id to that ingredient)
        setIngs(prevIngs => [ ...prevIngs, { ...ingredient, id: res.data.id } ] );
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={ings} onRemoveItem={() => {}}
        />
      </section>
    </div>
  );
}

export default Ingredients;

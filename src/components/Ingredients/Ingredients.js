import React, { useReducer, useCallback, useMemo } from 'react';
import axios from 'axios';

import ErrorModal from '../UI/ErrorModal';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';


const ingredientReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.ingredients;
  case 'ADD':
    return [ ...state, action.ingredient ];
  case 'DELETE':
    return state.filter(ing => ing.id !== action.id);
  default:
    return state;
  }
};

const httpReducer = (state, action) => {
  switch (action.type) {
  case 'SEND':
    return { ...state, isLoading: true };
  case 'RESPONSE':
    return { ...state, isLoading: false };
  case 'ERROR':
    return { isLoading: false, error: action.error };
  case 'CLEAR_ERROR':
    return { ...state, error: false };
  default:
    return state;
  }
};


function Ingredients() {

  const [ingredientState, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, httpDispatch] = useReducer(httpReducer, { isLoading: false, error: null });

  const url = 'http://localhost:8000/ingredients/';

  const filteredIngredientsHandler = useCallback(filteredIngs => {
    dispatch({ type: 'SET', ingredients: filteredIngs });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    httpDispatch({ type: 'SEND' });
    axios.post(url, ingredient)
      .then(res => {
      // add a new ingredient (obj) to existing ingredients array (also add id to that ingredient)
        dispatch({ type: 'ADD', ingredient: { ...ingredient, id: res.data.id } });
        httpDispatch({ type: 'RESPONSE' });
      });
  }, []);

  const removeIngredienthandler = useCallback(id => {
    httpDispatch({ type: 'SEND' });
    axios.delete(url + `${id}/`)
      .then(() => {
        dispatch({ type: 'DELETE', id });
        httpDispatch({ type: 'RESPONSE' });
      }).catch(err => {
        httpDispatch({ type: 'ERROR', error: err.message });
      });
  }, []);

  const clearError = useCallback(() => {
    httpDispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ingredientState} onRemoveItem={removeIngredienthandler} />
    );
  }, [ingredientState, removeIngredienthandler]);

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal> }
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;

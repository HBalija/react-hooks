import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;

  const [titleFilter, setTitleFilter] = useState('');

  const url = `http://localhost:8000/ingredients/?title=${titleFilter}`;

  useEffect(() => {
    axios.get(url)
      .then(res => {
        onLoadIngredients(res.data);
      });
  }, [titleFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={titleFilter} onChange={e => setTitleFilter(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;

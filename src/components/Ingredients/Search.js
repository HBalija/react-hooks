import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;

  const [titleFilter, setTitleFilter] = useState('');
  const inputRef = useRef();

  const url = `http://localhost:8000/ingredients/?title=${titleFilter}`;

  useEffect(() => {
    setTimeout(() => {
      if (titleFilter === inputRef.current.value) {
        axios.get(url)
          .then(res => {
            onLoadIngredients(res.data);
          });
      }

    }, 500);
  }, [titleFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={inputRef}
            value={titleFilter}
            onChange={e => setTitleFilter(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;

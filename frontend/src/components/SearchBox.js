import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form  onSubmit={submitHandler} >
      <div >
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <i class="fa fa-search"></i>
      </div>
    </form>
  );
}

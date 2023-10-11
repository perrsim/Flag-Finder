import React from 'react';
import { useState, useEffect } from 'react';
import styles from './components/FlagFinder.module.css';
import './App.css';

function App() {
  const [state, setState] = useState({
    codes: {},
    input: "",
    code: ""
  })

  useEffect(() => {
    const getCodes = async () => {
      const API = "https://flagcdn.com/en";
      const response = await fetch(`${API}/codes.json`);
      const result = await response.json();
      setState({
        ...state,
        codes: result
      });
    };
    getCodes();
  },[])


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      input: e.target.value,
    })
  }


  function findCodeByName() {
    setState({
      ...state,
      code: ""
    })
    const name = state.input.toLowerCase();
    Object.keys(state.codes).forEach((code: string) => {
      if (state.codes[code].toLowerCase() === name) {
        setState({
          ...state,
          code: code
        });
      }
    });
  }

  return (
    <>
    <div className={styles.container}>
      <div className={styles.containersearch}>
        <h1 className={styles.title}>FLAG FINDER</h1>
        <input type="text" value={state.input} onChange={handleChange} placeholder='Insert Name of Nation'></input>
        <button className={styles.button} onClick={findCodeByName}>Search</button>
        
      </div>
      {state.code && (
        <img
          className={styles.circle}
          alt="no sense"
          src={`https://flagcdn.com/w320/${state.code}.png`}
          srcSet={`https://flagcdn.com/w640/${state.code}.png 2x`}
          width="320"
        />
      )}
      {state.input !== "" && state.code === "" && <p className={styles.paragraph}>No results found.</p>}
      </div>
    </>
  );

}






export default App;

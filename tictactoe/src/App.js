import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

import { fieldUrl, moveUrl } from './constants';

function App() {
  const [field, setField] = useState([[0, 0, 0],[0, 0, 0],[0,0,0]]);

  const updateField = function() {
    axios.get(fieldUrl).then(res => {
      setField(res.data);
    })
  }

  const move = function(x, y){
    axios.post(moveUrl, {
      x: x + 1,
      y: y + 1
    }).then(updateField);
  }

  useEffect(() => {
    updateField();
    setInterval(updateField, 2000);
  }, []);

  const showCell = function(value) {
    if (!value) return ' ';
    return value == '1' ? 'x' : 'o';
  }

  return (
    <div className="App">
      <div className="field">
        {field.map((row, y) => <div className="row">
          {row.map((el, x) => <div className="cell" onClick={() => move(x, y)}>{showCell(el)}</div>)}
        </div>)}
      </div>
    </div>
  );
}

export default App;

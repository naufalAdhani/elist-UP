import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState({});

  // fetch('/get-data')
  //   .then(res => res.json())
  //   .then(data => setData(data));

 fetch('/create', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ name: 'Io', age: 17 })
  })
  .then(res => res.json())
  .then(data => console.log(data));

  return (
    <div className="App">
     {/* {data.name}
     <br />
      {data.age} */}
    </div>
  );
}

export default App;

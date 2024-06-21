import React, { useState } from 'react';
import './App.css';

function App() {
    const [data, setData] = useState(null);
    const [numberType, setNumberType] = useState('p');

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/numbers/${numberType}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error( error);
        }
    };

    return (
        <div className="App">
            <h1>Average Calculator</h1>
            <label htmlFor="numberType">Select Number Type:</label>
            <select id="numberType" onChange={(e) => setNumberType(e.target.value)} value={numberType}>
                <option value="p">Prime Numbers</option>
                <option value="f">Fibonacci Numbers</option>
                <option value="e">Even Numbers</option>
                <option value="r">Random Numbers</option>
            </select>
            <button onClick={fetchData}>Get Numbers</button>
            {data && (
                <div className="results">
                    <h2>Results</h2>
                    <p><strong>Previous State:</strong> {JSON.stringify(data.windowPrevState)}</p>
                    <p><strong>Current State:</strong> {JSON.stringify(data.windowCurrState)}</p>
                    <p><strong>Fetched Numbers:</strong> {JSON.stringify(data.numbers)}</p>
                    <p><strong>Average:</strong> {data.avg.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default App;

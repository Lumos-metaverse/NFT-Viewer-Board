import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Viewer Board</h1>
        <p>View your NFT Collection on Ethereum Chain</p>
      </header>
      <SearchBar />
    </div>
  );
}

export default App;

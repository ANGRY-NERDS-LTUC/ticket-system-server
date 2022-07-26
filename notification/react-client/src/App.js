import './App.css';

function App() {

  const socket = require('socket.io-client');
  const event = socket.connect('http://localhost:5000/purchase');

  function handleClick() {
    let data = {
      userId: 3,
      userName: "haimour",
      packageId: 8,
      packageTitle: "italy",
      createdBy: "al-dallah"
    };
    event.emit('packages-purchased', data);
  }

  return (
    <div className="App">
      <button onClick={handleClick}>book packages</button>
    </div>
  );
}

export default App;

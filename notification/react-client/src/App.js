import './App.css';

function App() {

  const socket = require('socket.io-client');
  const event = socket.connect('http://localhost:5000/purchase');

  function handleClick() {
    console.log('haimour');
    let data = {
      userId: 1,
      userName: "ahmad",
      packageId: 1,
      packageTitle: "spain",
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

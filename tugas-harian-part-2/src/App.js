import './App.css';
import TodoItem from './TodoItem';

function App() {
  return (
    <div className="App">
      <div className="box">
        <img src="./logo.png" className="logo" alt="Logo JabarCodingCamp" />
        <div className="Header">
          <h1>THINGS TO DO</h1>
          <small>During Bootcamp in Jabarcodingcamp</small>
          <hr />
        </div>
        <div className="Todo">
          <ul>
            <TodoItem title="Belajar Git & HTML" />
            <TodoItem title="Belajar HTML & CSS" />
            <TodoItem title="Belajar Javascript" />
            <TodoItem title="Belajar ReactJS Dasar" />
            <TodoItem title="Belajar ReactJS Advance" />
          </ul>
          <button type="button" className="button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;

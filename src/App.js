import React,{useState} from "react";
import './App.css';

//importing components
import Login from "./components/Login";

function App() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    return (
        <div className="App">
            <Login/>
        </div>
    );
}

export default App;

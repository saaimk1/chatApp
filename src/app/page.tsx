"use client"; //used to have client side interactions instead of server side only (i think) called a directive 

import {useState} from "react"; //used for managing chat messages and user inputs
import axios from "axios"; // used for making API requests

export default function Home() {
  const[input, setInput] = useState(""); //used to store user input (i dont think this definition is right)
  const [response, setResponse] = useState(""); // used to store the response from the API (i dont think this definition is right)
  
  const handleClick = async () => {
    console.log("User input",input); //logs the user input to the console
  
    try {
      const res = await axios.post("/api/chat", { message: input }); // send user input to the API
      setResponse(res.data.reply); // store the response from the API in the response state 
    } catch (error) {
      console.error("API error:", error);
    }   
  };
  
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">ChatGPT Chat App</h1>
      
      <div className="w-full max-w-2xl border rounded p-4 bg-white shadow">
        <div className="h-96 overflow-y-auto p-2">
          <p className="bg-gray-200 p-2 rounded">{response || "Ask me something!"}</p>
        </div>

        <div className="flex mt-2">
          <input
            type="text"
            className="flex-1 border p-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)} //idk what the syntax means but im changing this to input state when the button is clicked
            onKeyPress={(e) => e.key === "Enter" && handleClick()}
          />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleClick}>
            clickHere
          </button>
        </div>
      </div>
    </div>
  );
}
  

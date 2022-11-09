import React, { useState, useEffect } from 'react';
import {createRoot} from "react-dom/client"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm"
import AnimalCard from "./components/AnimalCard"

function App() {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/animals")
      setAnimals(response.data)
    }
    go()
  }, [])

  return (
    <div className="container">
         <p><a href="/">&laquo; Back to public</a></p>
         <CreateNewForm setAnimals={setAnimals}/>
         <div className="animal-grid"></div>
         {animals.map(function(animal) {
          return <AnimaCard key={animal.id} name={animal.name} species={animal.species} />
         })}
    </div>
  )
}

function AnimaCard(props) {
  return <p>Hi, my name is {props.name} and I am a {props.species}.</p>
}

const root = createRoot(document.querySelector("#app"))
root.render(<App />)
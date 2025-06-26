import React, { useState, useEffect, useMemo } from 'react'
import Planeta from './Planeta'
import './App.css'

const nombresPlanetas = ["Mercurio", "Venus", "Tierra", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno"];

function App() {
  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(100)
  const [naveActiva, setNaveActiva] = useState(true);
  const [estadoNave, setEstadoNave] = useState("En órbita")
  const [planetasVisitados, setPlanetasVisitados] = useState([])

  // Combustible y Distancia
  useEffect(() => {
    const intervalo = setInterval(() => {
      setCombustible(prev => {
        if (prev <= 0) {
          setNaveActiva(false);
          setEstadoNave("Sin combustible");
          return 0;
        }
        return prev - 1;
      })
    }, 100)
  
    return () => clearInterval(intervalo)
  }, [])

  // Actualizar la distancia cuando hay cambios en combustible y naveActiva
  useEffect(() => {
    if (naveActiva) {
      setDistancia(prev => prev + 1)
    }
  }, [combustible, naveActiva])

  // Sin combustible
  useEffect(() => {
    if (combustible <= 0) {
      setEstadoNave("Sin combustible")
    }
  }, [combustible])

  // Actualizar combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización
  }, [combustible]);

  // Mensaje de estado
  const mensajeEstado = useMemo(() => {
    return `Estado de la nave: ${estadoNave}`
  }, [estadoNave]);

  // Agregar planetas
  useEffect(() => {
    if (distancia === 0 || distancia % 20 !== 0) return;

    const indicePlaneta = Math.floor(distancia / 20) - 1;
    if (indicePlaneta < 0 || indicePlaneta >= nombresPlanetas.length) return;

    const planeta = nombresPlanetas[indicePlaneta];
    if (planetasVisitados.includes(planeta)) return;

    setPlanetasVisitados(prev => [...prev, planeta]);
  }, [distancia]);

  return (
    <div className="panel">  
      <h1>Panel de control: VIAJE ESPACIAL</h1>
      <h2>Distancia recorrida: {distancia} km</h2>   
      <h2>Combustible restante: {combustible}%</h2>    
      <h3>{mensajeEstado}</h3>

      <div className="planet-list">
        {planetasVisitados.map((planeta, index) => (
          <div key={index} className="planet">{planeta}</div>
        ))}
      </div>
    </div>
  );
}

export default App;

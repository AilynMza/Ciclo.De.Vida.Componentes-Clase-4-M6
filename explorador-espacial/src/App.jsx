
import React, { useState, useEffect, useMemo } from 'react'
import Planeta from './Planeta'
import './App.css'

function App() {
  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(100)
  const [estadoNave, setEstadoNave] = useState("En órbita")
  const [planetasVisitados, setPlanetasVisitados] = useState([])
  const [naveActiva, setNaveActiva] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCombustible(prev => {
        if (prev <= 0) {
          setNaveActiva(false);
          setEstadoNave("Sin combustible");
          return 0;
        }
        return prev - 1;
      });
    
      setDistancia(prev => {
        // Aquí sólo aumenta si naveActiva está activo
        // O si prefieres, solo si combustible > 0
        return prev + 1;
      });
    }, 100);
    
    
  
    return () => clearInterval(intervalo);
  }, [naveActiva]);
  
  

  useEffect(() => {
    if(combustible <= 0){
      setEstadoNave("Sin combustible")
    }
  }, [combustible])

  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`
  }, [estadoNave]);

  return (
    <div>  
      <h1>Panel de control VIAJE ESPACIAL</h1>
      <h2>Distancia recorrida: {distancia} km</h2>   
      <h2>Combustible restante: {combustible}%</h2>    
      
      {planetasVisitados.map((planeta, index) => (
        <Planeta key={index} nombre={planeta} />
      ))}
    </div>
  );
}

export default App

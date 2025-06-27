import React, { useState, useEffect, useMemo } from "react";
import Planeta from "./Planeta";
import "./App.css";

const nombresPlanetas = [
  "Mercurio",
  "Venus",
  "Tierra",
  "Marte",
  "Júpiter",
  "Saturno",
  "Urano",
  "Neptuno",
];

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  // Simulación de vuelo: sincroniza distancia y combustible
  useEffect(() => {
    console.log("¡El panel de control está listo!");

    const intervalo = setInterval(() => {
      setDistancia((prevDistancia) => {
        if (combustible > 0) {
          return prevDistancia + 1;
        }
        return prevDistancia;
      });

      setCombustible((prevCombustible) => {
        if (prevCombustible > 0) {
          return prevCombustible - 1;
        }
        return 0;
      });
    }, 100);

    return () => {
      clearInterval(intervalo);
      console.log("El panel de control se ha apagado.");
    };
  }, [combustible]);

  // Cambiar estado de la nave si se queda sin combustible
  useEffect(() => {
    if (combustible <= 0) {
      setEstadoNave("Sin combustible");
    }
  }, [combustible]);

  // Log de actualización de combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  // Memo del mensaje de estado
  const mensajeEstado = useMemo(() => {
    return `Estado de la nave: ${estadoNave}`;
  }, [estadoNave]);

  // Agregar la funcionalidad aterrizar
  const Aterrizar = () => {
    setEstadoNave("Aterrizando");

    const indice = Math.floor(distancia / 20) - 1;
    if (indice < 0 || indice >= nombresPlanetas.length) return;

    const planetaActual = nombresPlanetas[indice];

    setPlanetasVisitados((prev) => {
      if (prev.includes(planetaActual)) return prev; // evita duplicados
      return [...prev, planetaActual];
    });
  };

  return (
    <div className="panel">
      <h1>Panel de control: VIAJE ESPACIAL</h1>
      <h2>Distancia recorrida: {distancia} km</h2>
      <h2>Combustible restante: {combustible}%</h2>
      <h3>{mensajeEstado}</h3>

      <h4>Solo puedes aterrizar cada 20km</h4>
      <button onClick={Aterrizar}>Aterrizar</button>

      <div className="planet-list">
        {planetasVisitados.map((planeta, index) => (
          <Planeta key={index} nombre={planeta} />
        ))}
      </div>
    </div>
  );
}

export default App;

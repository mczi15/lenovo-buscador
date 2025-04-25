
import { useEffect, useState } from "react";

const colores = {
  "Casimiro Félix Toyos e hijos S.A": "#fde047", // amarillo
  "Fava Hnos S.A.C.I.F.": "#86efac", // verde
  "Genesio S. A": "#93c5fd", // azul
  "Grupo Nucleo S.A.": "#fca5a5", // rojo
  "Hendel Hogar S.A": "#e9d5ff", // violeta
  "Hogar Total S.A.": "#fdba74", // naranja
  "Macer S.A.": "#f5f5f4", // blanco
  "Oscar Barbieri S.A.": "#f9a8d4", // rosa
  "Perozzi Domingo y Perozzi Osvaldo S.A.": "#67e8f9", // celeste
  "Servitec 9 de Julio S.A": "#bef264", // lima
  "Sorba S.R.L": "#fcd34d", // ámbar
};

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState(null);
  const [noEncontrado, setNoEncontrado] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const buscar = () => {
    const match = data.find(
      (item) => item.numeroSerie.toUpperCase() === input.toUpperCase()
    );
    setResultado(match || null);
    setNoEncontrado(!match);
  };

  return (
    <div style={{ padding: 20 }}>
      <img src="/logo-grupo-nucleo.png" alt="Logo" width={120} />
      <h1>Buscador de Números de Serie</h1>
      <div>
        <input
          type="text"
          placeholder="Ingresá el número de serie"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={buscar}>Buscar</button>
      </div>

      {resultado && (
        <div style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: colores[resultado.cliente] || "#e5e7eb",
          borderRadius: 10
        }}>
          <h2>Información del Cliente</h2>
          <p><strong>Cliente:</strong> {resultado.cliente}</p>
          <p><strong>Material:</strong> {resultado.material}</p>
          <p><strong>Número de Serie:</strong> {resultado.numeroSerie}</p>
        </div>
      )}

      {noEncontrado && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: 20 }}>
          Número de Serie inexistente
        </p>
      )}
    </div>
  );
}

export default App;

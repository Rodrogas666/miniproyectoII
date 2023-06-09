import { useEffect, useState } from "react";

import { getComents } from "./api/auth";

import { Comentarios } from "./components/comentario";
import { PublicarComentario } from "./components/PublicarComentario";

function App() {
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const yes = async () => {
      const data = await getComents();
      setComentarios(data);
    };
    yes();
  }, []);

  return (
    <>
      <main className="flex flex-col w-4/5 gap-10 mx-auto mt-20 mb-5">
        <div className="grid gap-10 md:flex-row">
          <PublicarComentario
            comentarios={comentarios}
            setComentarios={setComentarios}
            setError={setError}
            error={error}
          />
          <Comentarios
            comentarios={comentarios}
            setComentarios={setComentarios}
          />
        </div>
      </main>
    </>
  );
}

export default App;

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

//Consultas Api
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

const postComent = async ({ datos }) => {
  const { data } = await axiosClient.post("/comments", datos);
  return data;
};

const getComents = async () => {
  const { data } = await axiosClient.get("/comments");
  return data;
};

function App() {
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const yes = async () => {
      const data = await getComents();
      setComentarios(data);
    };
    yes();
  }, []);

  const succcesSubmit = async (datos) => {
    try {
      const data = await postComent({ datos });
      const comentariosMaped = [...comentarios].concat(data);
      setComentarios(comentariosMaped);
      setError(false);
      reset();
    } catch (error) {
      setError(true);
    }
  };

  const Comentarios = () => {
    return comentarios.map((x, i) => {
      return <p key={i}>{x.comentario}</p>;
    });
  };

  return (
    <>
      {error && <p className="text-red-500">Ocurrio algun error</p>}
      <div className="flex flex-col gap-12 mb-10">
        <form
          onSubmit={handleSubmit(succcesSubmit)}
          className="flex flex-col items-start justify-start gap-1"
        >
          <h1>Postear comentario</h1>
          <textarea {...register("comentario", { required: true })} />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div>
        <h1>Ver los comentarios</h1>
        <div>{comentarios.length ? <Comentarios /> : "No hay"}</div>
      </div>
    </>
  );
}

export default App;
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/comments",
});

const postComent = async ({ datos }) => {
  const { data } = await axiosClient.post("/", datos);
  return data;
};

const getComents = async () => {
  const { data } = await axiosClient.get("/");
  return data;
};

function App() {
  const [comentarios, setComentarios] = useState({});
  console.log(comentarios)
  useEffect(() => {
    const yes = async () => {
      const data = await getComents();
      setComentarios(data);
    };
    yes();
  }, []);

  const succcesSubmit = async (datos) => {
    const yes = await postComent({ datos });
    return yes;
  };

  const Comentarios = () => {
    return (
      <ul>
        {comentarios.map((x, i) => {
          return <li key={i}>{x.comentario}</li>;
        })}
      </ul>
    );
  };

  const { register, handleSubmit } = useForm();
  return (
    <>
      <div className="flex flex-col gap-12 mb-10">
        <form onSubmit={handleSubmit(succcesSubmit)}>
          <h1>Postear comentario</h1>
          <input {...register("exampleRequired", { required: true })} />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <br />
      <div>
        <h1>Ver los comentarios</h1>
        {comentarios.length ?? <Comentarios />}
      </div>
    </>
  );
}

export default App;

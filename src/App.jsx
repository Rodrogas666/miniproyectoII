import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Comentarios } from "./components/comentario";

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

  return (
    <>
      {error && <p className="text-red-500">Ocurrió algún error</p>}

      <div className="grid h-screen w-[100%] place-items-center">
        <div className="flex w-[80%] justify-start items-center gap-16 shadow-md p-10">
          <div className="w-[50%]">
            <form
              onSubmit={handleSubmit(succcesSubmit)}
              className="flex flex-col items-start justify-start gap-1"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text pt-2 pb-10">
                Postear comentario
              </h1>
              <textarea
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full pb-10 mb-10"
                {...register("comentario", { required: true })}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Enviar
              </button>
            </form>
          </div>
          <div className="w-2/4 h-full">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text pt-2 pb-10">Comentarios publicados</h1>
            
   
            {comentarios.length ? (
              <Comentarios comentarios={comentarios} />
            ) : (
              <p className="text-gray-500">No hay comentarios</p>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

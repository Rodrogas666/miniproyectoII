import { postComent } from "../api/auth";
import { useForm } from "react-hook-form";

export const PublicarComentario = ({
  comentarios,
  setComentarios,
  setError,
  error,
}) => {
  const { register, handleSubmit, reset } = useForm();

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
    <form
      onSubmit={handleSubmit(succcesSubmit)}
      className="flex flex-col items-start w-full gap-10"
    >
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text">
        Postear comentario
      </h1>
      {error && <p className="text-red-500">Ocurrió algún error</p>}

      <textarea
        className="w-full h-24 px-4 py-2 pb-10 bg-gray-100 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        {...register("comentario", { required: true })}
      />
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
      >
        Enviar
      </button>
    </form>
  );
};

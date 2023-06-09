import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getCommentById, updateComment } from "../api/auth";

export const EditComment = () => {
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const { message } = await getCommentById({ id });
      if (message === null) {
        setError(true);
        return;
      }
      return { comentario: message.comentario };
    },
  });

  const succcesSubmit = async (datos) => {
    try {
      const data = await updateComment({ id, datos });
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  if (error) return <p>Ocurrio un error :(</p>;

  return (
    <main className="flex flex-col w-4/5 gap-10 mx-auto mt-20 mb-5">
      <div className="grid gap-10 md:flex-row">
        <form
          onSubmit={handleSubmit(succcesSubmit)}
          className="flex flex-col items-start w-full gap-10"
        >
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text">
            Actualizar comentario
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
      </div>
    </main>
  );
};

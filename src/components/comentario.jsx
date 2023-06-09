import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { deleteComment } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Comentario = ({ data, setComentarios, comentarios }) => {
  const { id, comentario } = data;
  const navigate = useNavigate();

  const handleDelete = async () => {
    const data = await deleteComment({ id });
    const copyComentarios = [...comentarios].filter(
      (comentario) => comentario.id != id
    );
    setComentarios(copyComentarios);
  };

  const handleEdit = async () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="flex justify-between w-full">
      <p>{comentario}</p>
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-white bg-black rounded w-max"
        >
          <AiFillDelete />
        </button>
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-white bg-black rounded w-max"
        >
          <AiFillEdit />
        </button>
      </div>
    </div>
  );
};

export const Comentarios = ({ comentarios, setComentarios }) => {
  return (
    <section className="flex flex-col w-full gap-10">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text">
        Comentarios publicados
      </h1>

      {comentarios.length ? (
        <div className="flex flex-col w-full h-full gap-3 overflow-y-auto">
          {comentarios.map((comentario, i) => {
            return (
              <Comentario
                key={i}
                data={comentario}
                setComentarios={setComentarios}
                comentarios={comentarios}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No hay comentarios</p>
      )}
    </section>
  );
};

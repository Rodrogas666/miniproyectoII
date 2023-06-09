const Comentario = ({ data }) => {
  const { id, comentario } = data;
  return <p>{comentario}</p>;
};

export const Comentarios = ({ comentarios }) => {
  return (
    <div className="w-full h-full flex flex-col gap-[1rem]">
      {comentarios.map((comentario) => {
        return <Comentario data={comentario} />;
      })}
    </div>
  );
};

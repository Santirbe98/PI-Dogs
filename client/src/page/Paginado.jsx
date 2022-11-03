import s from "./styles/Paginado.module.css";

export const Paginado = ({
  dogsCardsPerPage,
  allDogs,
  paginado,
  paginadoPrev,
  paginadoNext,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsCardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={s.paginationCenter}>
        <div onClick={paginadoPrev}>«</div>
        {pageNumbers.map((number) => (
          <div key={number} onClick={() => paginado(number)}>
            {number}
          </div>
        ))}
        <div onClick={paginadoNext}>»</div>
      </div>
    </nav>
  );
};

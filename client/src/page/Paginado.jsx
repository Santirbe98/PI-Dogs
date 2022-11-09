import s from "./styles/Paginado.module.css";

export const Paginado = ({
  dogsCardsPerPage,
  allDogs,
  paginado,
  paginadoPrev,
  paginadoNext,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsCardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={s.paginationCenter}>
        <div className={s.number} onClick={paginadoPrev}>
          «
        </div>
        {pageNumbers.map((number) => (
          <div
            className={currentPage === number ? s.pageActual : s.number}
            key={number}
            onClick={() => paginado(number)}
          >
            {number}
          </div>
        ))}
        <div className={s.number} onClick={paginadoNext}>
          »
        </div>
      </div>
    </nav>
  );
};

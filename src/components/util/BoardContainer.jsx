import Board from './Board'

function BoardContainer(activePiece, activePlayer, setActivePlayer) {
  return (
    <><Board {...{activePiece, activePlayer, setActivePlayer}}/></>
  );
}

export default BoardContainer;

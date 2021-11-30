import Board from './Board'

function BoardContainer(props) {
  return (
    <div>
      <Board {...props}/>
    </div>
  );
}

export default BoardContainer;

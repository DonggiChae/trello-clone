import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoStorage } from "./atoms";
import Board from "./Components/Board";
import DroppableTrash from "./Components/DroppableTrash";
import { saveTodos } from "./utilities/localStorage"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoStorage);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        const result = {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
        saveTodos(result);
        return result;
      });
    };
    
    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "Trash") {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          boardCopy.splice(source.index, 1);
          const result = {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
          saveTodos(result);
          return result;
        });
        } else {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        const result = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
        saveTodos(result);
        return result;
      });
    };
    };
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <DroppableTrash/>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
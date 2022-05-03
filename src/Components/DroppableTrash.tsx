import { Droppable } from "react-beautiful-dnd";
import { FaTrashAlt, FaTrash } from 'react-icons/fa';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding-top: 70px;
  padding-left: 110vh;
`;


const Content = styled.div<{ isDraggingOver: boolean; draggingFromThisWith: boolean }>`
  font-size: 45px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${(props) => (props.isDraggingOver === true 
    ? "rgba(223, 230, 233,0.3)" : props.draggingFromThisWith === true 
    ? "rgba(225, 112, 85,0.5)" : "transparent")};
`;


function DroppableTrash() {
  
  return (
    <Container>
      <Droppable droppableId="Trash">
        {(provided, snapshot) => (
          <Content isDraggingOver={snapshot.isDraggingOver} 
          draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          >
            {snapshot.isDraggingOver === false ? <FaTrashAlt /> : <FaTrash />}
            {provided.placeholder}
          </Content>
        )}
      </Droppable>
    </Container>
  );
  };

export default DroppableTrash;
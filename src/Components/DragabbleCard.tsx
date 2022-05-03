import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: bolder;
  padding: 10px;
  padding-left: 15px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;


interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}



function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index} key={toDoId}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
        
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
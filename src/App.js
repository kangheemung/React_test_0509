import './App.css';
import React, { useState } from 'react';
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const initialItems = [
  {
    id: "item-0",
    content: "item 0",
  },
  {
    id: "item-1",
    content: "item 1",
  },
  {
    id: "item-2",
    content: "item 2",
  },
  {
    id: "item-3",
    content: "item 3",
  },
  {
    id: "item-4",
    content: "item 4",
  }
];

function App() {
  const [counter, setCounter] = useState(0);
  const [items] = useState(initialItems);

  function countUp() {
    setCounter((current) => current + 1);
  }

  console.log("rendered");
  console.log(counter);
  /* 連番で10個生成 */
const getItems = (count) =>
Array.from({ length: count }, (v, k) => k).map((k) => ({
  id: `item-${k}`,
  content: `item ${k}`,
}));

/* 並び替え */
const reorder = (list, startIndex, endIndex) => {
const removed = list.splice(startIndex, 1); //ドラッグ開始要素の削除
console.log(removed);
list.splice(endIndex, 0, removed[0]); //ドロップした箇所に挿入
};

  const grid = 8;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid} 0`,
    background: isDragging ? "lightgreen" : "grey",

    ...draggableStyle, //あらかじめ用意されている。
  });

  return (
    <div className="App">
      ここはAPPです。{counter}
      <input></input>
      <button onClick={countUp}>Click me</button>
      <DragDropContext>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;

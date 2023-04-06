import React, { FC, HTMLProps } from "react";
import styled from "styled-components";
import { useRxHook, useRxTodoState } from "client/src/store/todo";

const RootDiv: React.ElementType<HTMLProps<HTMLDivElement>> = styled.div`
  // css style
` as any;

interface IProps {}

// desc
export const TodoList: FC<IProps> = function (props) {
  const { state, actions } = useRxTodoState();
  useRxHook();
  return (
    <RootDiv>
      todo list
      <div>
        <input type="text" id={"todo-txt"} />{" "}
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt") as HTMLInputElement;
            actions.setTitle(ip.value);
            ip.value = "";
          }}
        >
          set title
        </button>
      </div>
      <div>
        <input type="text" id={"todo-txt2"} />{" "}
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt2") as HTMLInputElement;
            actions.addTodo(ip.value);
            ip.value = "";
          }}
        >
          add sync
        </button>
        <button
          onClick={() => {
            const ip = document.getElementById("todo-txt2") as HTMLInputElement;
            actions.addTodoAsync(ip.value);
            ip.value = "";
          }}
        >
          add async
        </button>
      </div>
      <div>status:{state.status}</div>
      <div>
        <div>title:{state.title}</div>
        <ul
          style={{
            height: 400,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {state.todoList.map((todo) => {
            return <span key={todo.id}>{todo.text}</span>;
          })}
        </ul>
      </div>
    </RootDiv>
  );
};

export default TodoList;

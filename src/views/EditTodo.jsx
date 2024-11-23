"use client"
import TodoForm from "../components/TodoForm"
const EditTodo = ({data}) => {
  return (
    <TodoForm data={data}/>
  );
};

export default EditTodo;

import { useEffect, useState} from "react"
import TodoInput from "./Components/TodoInput"
import TodoList from "./Components/TodoList"



function App() {
  const[todos,setTodos]=useState([]);
  const [todoValue,setTodoValue]= useState('');
  
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }
 
const handleTodos=((newTodos)=>{
   const newTodoList=[...todos,newTodos]

   persistData(newTodoList)
   setTodos(newTodoList);
  })
const handleDelete=((index)=>{
  const newTodoList=todos.filter((todo,newIndex)=>{
   return newIndex !== index
   
  })
  persistData(newTodoList)
   setTodos(newTodoList)
  })

  const handleEditTodo=((index)=>{
  const  editValue=todos[index]
  setTodoValue(editValue)
  handleDelete(index)
  })
 useEffect(()=>{
  if(!localStorage){
    return
  }
  let localTodos=localStorage.getItem('todos')
  if(!localTodos){
    return
  }
  localTodos=JSON.parse(localTodos).todos
  setTodos(localTodos)

 },[])
 
  return (
  <>
  <TodoInput handleAddTodos={handleTodos} todoValue={todoValue} setTodoValue={setTodoValue}/>
  <TodoList  todos={todos} handleDelete={handleDelete}  handleEditTodo={handleEditTodo}/>
 
  </>
  )
}

export default App

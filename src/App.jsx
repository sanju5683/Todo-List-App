import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./App.css";
import Navbar from "./components/Navbar";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)



  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if (todosString) {


      let t = JSON.parse(localStorage.getItem("todos"))
      setTodos(t)
    }
  }, [])





  const saveToLS = (todos) => {


    localStorage.setItem("todos", JSON.stringify(todos))

    // console.log(localStorage.getItem('todos'));


  }




  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => {
      return i.id === id
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)


  }
  const handleAdd = () => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveToLS(newTodos)

  }

  const handleCheckbox = (e) => {

    let id = e.target.name

    let index = todos.findIndex((item) => { return item.id === id })
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)


  }

  const handleShowfinished = () => {
    setshowFinished(!showFinished)
  }




  return (
    <>
      <Navbar />
      <div className="component p-5 mx-3 bg-violet-200 md:mx-auto md:w-1/2 mt-4 min-h-[90vh]  rounded-lg">

        <div className="addtodo flex flex-col gap-2">
          <h1 className="font-bold text-center text-xl">iTask- Manage your todos at one place</h1>
          <h2 className="font-medium text-violet-900 m-3 text-xl">Add a Todo</h2>
          <input onKeyDown={(e)=>{if(e.key==="Enter"&& todo.length >= 3){handleAdd()}; }}type="text" value={todo} onChange={handleChange} className=" p-1 px-2 w-[100%] rounded-xl outline-none" />

          <button  onClick={() => { handleAdd() }} disabled={todo.length <3} className=" bg-violet-500 rounded-lg px-2 py-1 w-16 m-auto font-semibold disabled:text-gray-700 ">Save</button>
        </div>
        <input id="show" type="checkbox" className="font-bold"  checked={showFinished} onChange={handleShowfinished} /> 
        <label className="mx-3" htmlFor="show">Show Finished</label>
        <hr className="border-violet-900 border-[1px] mt-2" />


        <div className="todos mt-2 p-2">

          <h2 className="font-medium text-violet-950 text-lg">Your Todos</h2>
          {todos.length === 0 && <div className="m-5">No Todos to Display</div>}
          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex   justify-between mt-2 items-center">

              <div className="text flex  items-center gap-2 ">
                <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} />
                <p className={item.isCompleted ? "line-through break-all" : "break-all"}  >{item.todo}</p>
              </div>
           

              <div className="buttons flex ">

                <button className="bg-blue-400 rounded-xl px-4 py-2 mx-2" onClick={(e) => { handleEdit(e, item.id) }}><FaEdit /></button>
                <button className="bg-blue-400 rounded-xl px-4 py-2 mx-2" onClick={(e) => { confirm("Sre you sure") && handleDelete(e, item.id) }}><MdDelete /></button>
              </div>



            </div>

          })}



        </div>


      </div>
    </>
  );
}

export default App;

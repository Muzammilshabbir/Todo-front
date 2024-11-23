'use client'
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material'

import { Delete, Edit, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { fetchTodos, removeTodos, updateTodos } from "../services/todoService"

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [data, error] = await fetchTodos()
    console.log("🚀 ~ fetchData ~ data:", data)
    if (!error) {
      setCompleted(data.records.filter(data => data.isCompleted))
      setTodos(data.records)
    }
  }

  const removeTodo = async (id) => {
    await removeTodos([id])
    fetchData()
  }

  const handleComplete = async (task) => {
    if(!task.isCompleted) {
      await updateTodos({body:{isCompleted: true}, id:task.id})
      fetchData()
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={12} className="flex justify-center w-full">
        <Button
          variant="contained"
          fullWidth
          className="!bg-blue-500 !text-white !py-3 !text-base rounded-lg flex items-center justify-center"
          startIcon={<Add />}
          onClick={() => router.push("/create-todo")}
        >
          Add Task
        </Button>
      </Grid>
      <div className="space-y-3 w-full">

        <div className="flex justify-between items-center" style={{ justifyContent: 'space-between'}}>
          <h2 className="text-white text-lg font-medium">Tasks <span className="text-gray-400">({todos.length})</span></h2>
          <span className="text-gray-400 text-sm">{completed.length} de {todos.length} Completed</span>
        </div>
        {todos.map(task => (
          <div
            className={`flex cursor-pointer mt-4 pt-4 items-center justify-between bg-[#1F1F1F] w-full p-4 rounded-lg border border-gray-600 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}
            style={{ justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <div className="flex items-center gap-3">
            <input
        type="checkbox"
        className="w-5 h-5 mr-4 p-4 accent-blue-500"
        name="task-status"
        checked={task.isCompleted} // Check if the task is completed
        onChange={() => handleComplete(task)} // Call handleComplete when the checkbox changes
      />
              <p className="text-white" style={{
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                color: task.isCompleted ? 'gray' : 'white',
              }}
              >{task.title}</p>
            </div>
            <div>
              <IconButton className="text-white-400" onClick={() => removeTodo(task.id)}>
                <Delete sx={{ color: 'white' }} />
              </IconButton>
              <IconButton className="text-white-400" onClick={() => router.push(`/edit-todo/${task.id}`)}>
                <Edit sx={{ color: 'white' }} />
              </IconButton>
            </div>
          </div>
        ))}

      </div>


    </Grid>
  )
}
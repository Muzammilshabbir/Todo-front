"use client"
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { ArrowBack, Add } from "@mui/icons-material";
import {createTodos, updateTodos} from "../services/todoService"
const TaskForm = (props) => {
  console.log("🚀 ~ TaskForm ~ props:", props)
  const [formValues, setFormValues] = useState({
    title:props?.data?.title ?? '',
    selectedColor:props?.data?.selectedColor ?? ''
  });
    console.log("🚀 ~ TaskForm ~ formValues:", formValues)
    const router = useRouter()
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-amber-700",
  ];

  const onSubmit = async (e) => {
    e.preventDefault()
    if(props.data) {
      await updateTodos({body:formValues, id:props.data.id})
    } else {
      await createTodos({body:formValues})
    }
    router.push("/todo")
  }
  return (
    <div >
      <div className="flex items-center gap-4">
        <IconButton className="text-gray-400" onClick={() => router.push("/todo")}>
          <ArrowBack />
        </IconButton>
        <h2 className="text-white text-lg font-medium">{props.data ? 'Edit' : 'Add'} Task</h2>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-3">
        <label className="block text-white text-sm mb-2">Title</label>
        <TextField
          fullWidth
          placeholder="Ex. Brush your teeth"
          variant="outlined"
          required
          value={formValues.title}
          onChange={(e) => setFormValues({...formValues, title: e.target.value})}
          InputProps={{
            style: { backgroundColor: "#1F1F1F", color: "white" },
          }}
          className="rounded-lg"
        />

        <label className="block text-white text-sm mb-2">Color</label>
        <div className="flex gap-4">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-full border-2 ${
                formValues.selectedColor === color ? "border-white border-2" : "border-transparent"
              } ${color}`}
              onClick={() => setFormValues({...formValues, selectedColor: color})}
              type="button"
            ></button>
          ))}
        </div>

      <Button
        variant="contained"
        fullWidth
        className="!bg-blue-500 !text-white !py-3 !text-base rounded-lg flex items-center justify-center"
        startIcon={<Add />}
        type="submit"
      >
        Add Task
      </Button>
      </form>
    </div>
  );
};

export default TaskForm;

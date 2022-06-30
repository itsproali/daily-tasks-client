import React, { useState, useEffect } from "react";
import "./shared.css";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase-init";
import Loading from "./Loading";
import deleteModal from "../hooks/useDelete";

const ToDo = ({ refetch, setRefetch }) => {
  const [user, userLoading] = useAuthState(auth);
  const userId = user?.uid;
  console.log(userId);
  const [allTasks, setAllTasks] = useState("");

  //   Load Previous Tasks
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/tasks/${userId}`)
        .then((res) => res.json())
        .then((data) => setAllTasks(data));
    }
  }, [refetch, userId]);

  // Add New Task
  const handleAddTask = (e) => {
    e.preventDefault();
    const inputValue = e.target.inputValue.value;
    if (inputValue && user) {
      fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ details: inputValue, completed: false, userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRefetch(!refetch);
          e.target.inputValue.value = "";
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please Enter a Task!",
      });
    }
  };

  // Complete a Task
  const handleCompleteTask = (taskId) => {
    fetch(`http://localhost:5000/completed/${taskId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => setRefetch(!refetch));
  };

  // Edit a Task
  const handleEditTask = (taskId, details) => {
    fetch(`http://localhost:5000/update-task/${taskId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({details}),
    })
      .then((res) => res.json())
      .then((data) => setRefetch(!refetch));
  };

  // User Loading
  if (userLoading) {
    return <Loading />;
  }
  return (
    <div className="py-12 px-2 md:px-12 bg-sky-50 flex flex-col md:flex-row">
      <div className="mb-8 md:mb-0 md:mr-8 w-full">
        <div className="bg-white rounded-lg py-8 px-3 md:px-6 shadow-lg ">
          <h1 className="text-center text-2xl text-primary mb-6">
            Add New Task
          </h1>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              name="inputValue"
              id="inputValue"
              className="input-field"
              placeholder="Enter your Task"
              // *****************************
              // If Not use form then you should use below codes to submit task by pressing enter
              // *****************************
              // onChange={(e) => setInputValue(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleAddTask();
              //   }
              // }}
              required
            />
            <label
              htmlFor="submit"
              className="btn btn-primary w-full mt-6 text-white"
            >
              <input type="submit" value="" />
              ADD
              <MdPlaylistAdd className="text-xl ml-1" />
            </label>
          </form>
        </div>
      </div>
      <div className="bg-white rounded-lg py-8 px-3 md:px-6 shadow-lg w-full">
        <h1 className="text-center text-2xl text-primary mb-6">To-Do List</h1>
        {allTasks &&
          user &&
          allTasks.map((task) => (
            <div
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg my-4 p-4 shadow duration-300"
              key={task._id}
            >
              <div className="flex items-center">
                <label htmlFor={task?.details}>
                  <input
                    type="checkbox"
                    name={task?.details}
                    id={task?.details}
                    className="mr-3 cursor-pointer"
                    onClick={() => handleCompleteTask(task._id)}
                  />
                  {task?.details}
                </label>
              </div>
              <div className="flex items-center">
                <button
                  className="btn btn-ghost btn-circle btn-sm flex items-center justify-center"
                  title="Edit"
                  onClick={async () => {
                    const { value: text } = await Swal.fire({
                      input: "textarea",
                      inputLabel: "Your Task",
                      inputPlaceholder: "Enter your Task .....",
                      inputAttributes: {
                        "aria-label": "Enter your Task .....",
                      },
                      showCancelButton: true,
                    });

                    if (text) {
                      handleEditTask(task._id, text);
                    }
                  }}
                >
                  <FaRegEdit className="text-primary"></FaRegEdit>
                </button>
                <button
                  className="btn btn-ghost btn-circle btn-sm flex items-center justify-center ml-2  "
                  title="Delete"
                  onClick={() => {
                    deleteModal(task._id, refetch, setRefetch);
                  }}
                >
                  <FaRegTrashAlt className="text-error"></FaRegTrashAlt>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDo;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaRegTrashAlt } from "react-icons/fa";
import auth from "../firebase-init";
import deleteModal from "../hooks/useDelete";
import Loading from "./Loading";

const Completed = ({ refetch, setRefetch }) => {
  const [user, userLoading] = useAuthState(auth);
  const [completedTasks, setCompletedTasks] = useState("");
  const userId = user?.uid;

  // Load All Completed Task
  useEffect(() => {
    fetch(`http://localhost:5000/completed-task/${userId}`)
      .then((res) => res.json())
      .then((data) => setCompletedTasks(data));
  }, [refetch, userId]);

  // UnComplete a Task
  const handleUnCompleteTask = (taskId) => {
    fetch(`http://localhost:5000/un-complete/${taskId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => setRefetch(!refetch));
  };

  if (userLoading) {
    return <Loading />;
  }
  return (
    <div className="py-12 px-2 md:px-12 bg-green-100 min-h-[90vh]">
      <h1 className="text-center text-2xl text-primary mb-6 mx-auto">
        Completed Tasks
      </h1>
      {user &&
        completedTasks &&
        completedTasks.map((completed) => (
          <div
            className="flex items-center justify-between bg-white rounded-lg my-4 p-4 shadow duration-300 w-full"
            key={completed._id}
          >
            <div className="flex items-center">
              <label htmlFor={completed?.details} className="line-through">
                <input
                  type="checkbox"
                  name={completed?.details}
                  id={completed?.details}
                  className="mr-3 cursor-pointer"
                  defaultChecked
                  onClick={() => handleUnCompleteTask(completed._id)}
                />
                {completed?.details}
              </label>
            </div>
            <div className="">
              <button
                className="btn btn-ghost btn-circle btn-sm flex items-center justify-center ml-2  "
                title="Delete"
                onClick={() => {
                  deleteModal(completed._id, refetch, setRefetch);
                }}
              >
                <FaRegTrashAlt className="text-error"></FaRegTrashAlt>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Completed;

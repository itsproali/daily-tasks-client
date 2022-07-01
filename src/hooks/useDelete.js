import Swal from "sweetalert2";

const deleteModal = (taskId, refetch, setRefetch) =>
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Deleted!",
        "Your Task has been deleted.",
        "success",
        handleDelete(taskId, refetch, setRefetch)
      );
    }
  });
const handleDelete = (taskId, refetch, setRefetch) => {
  fetch(`https://daily-tasks-itsproali.herokuapp.com/delete-task/${taskId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => setRefetch(!refetch));
};

export default deleteModal;

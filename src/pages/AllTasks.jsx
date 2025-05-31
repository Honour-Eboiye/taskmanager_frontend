import { useApi } from "../hooks/useApi";
import { ScaleLoader } from "react-spinners";
import { BsPencilSquare, BsTrash3, BsPlus } from "react-icons/bs";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const AllTasks = () => {
  const api = "https://officialtaskmanager.onrender.com/api/v1/tasks/";
  const { info, isPending, errors } = useApi(api);
  const [deleting, setDeleting] = useState(false);
  const [confirmDeleting, setConfirmDeleting] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState("");
  const [taskID, setTaskID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const handleDelete = (task) => {
    setConfirmDeleting(true);
    setTaskToDelete(task);
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`${api}${taskID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      if (response.status === 401 || response.status === 403) {
        window.location.href = "/sign_in";
        return;
      }
      if (!response.ok) {
        const errorMessage = await response;
        throw new Error(
          errorMessage.message || `Couldnt delete ${taskToDelete}`
        );
      } else {
        setConfirmDeleting(false);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setConfirmDeleting(false);
    }
  };

  // Add this useEffect to handle 401/403 errors from useApi (viewing tasks)
  useEffect(() => {
    if (errors && (errors.status === 401 || errors.status === 403 || errors === 401 || errors === 403)) {
      window.location.href = "/sign_in";
    }
  }, [errors]);

  return (
    <div>
      <div className="custom-container flex flex-col gap-5 py-4 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl">My Tasks</h1>
          <Link to="/new_task">
            <p className="text-xs color flex items-center">
              <BsPlus size={28}></BsPlus>Add New Task
            </p>
          </Link>
        </div>

        {popUp && (
          <div className="custom-container bg-[#974FD0] w-full py-2">
            <p>{popUp}</p>
          </div>
        )}

        {/* PENDING */}
        {isPending && (
          <div className="mx-auto py-7 h-[20vh] items-center">
            <ScaleLoader size="28px" color="#974FD0"></ScaleLoader>
          </div>
        )}

        {isLoading && (
          <div className="mx-auto py-7 h-[20vh] items-center">
            <ScaleLoader size="28px" color="#974FD0"></ScaleLoader>
          </div>
        )}

        {/* ERRORS */}
        {errors && (
          <div className="bg-[#974FD0] text-white w-auto py-3 text-center">
            <h1>{errors}</h1>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {info.map((task) => {
            return (
              <div
                className="w-full border-1 rounded-lg border-gray-300 px-3 py-5"
                key={task._id}
              >
                <div className="flex justify-between border-b-gray-300 border-b-1 py-2">
                  <div>
                    <h1 className={task.tag}>{task.tag}</h1>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/edit/${task._id}`}>
                      <button className="custom-button">
                        <BsPencilSquare></BsPencilSquare>Edit
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => {
                        setTaskID(task._id);
                        handleDelete(task.title);
                      }}
                    >
                      <BsTrash3></BsTrash3>Delete
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="sm:text-xl">{task.title}</h1>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {task.description}
                  </p>
                </div>
                <div></div>
              </div>
            );
          })}
        </div>

        <div className="w-full border-1 rounded-lg border-gray-300 px-3 py-5">
          <div className="flex justify-between border-b-gray-300 border-b-1 py-2">
            <div>
              <h1 className="Urgent">Urgent</h1>
            </div>
            <div className="flex gap-2">
              <button className="custom-button">
                <BsPencilSquare></BsPencilSquare>Edit
              </button>
              <button className="delete">
                <BsTrash3></BsTrash3>Delete
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="sm:text-xl">Fintech Website Update</h1>
            <p className="text-xs text-gray-500 sm:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              magnam et praesentium accusamus ea labore dolore tenetur esse
              ipsum. Qui facere architecto veniam ullam adipisci porro et nisi
              molestiae alias nam maiores omnis ipsa, nesciunt totam error ipsam
              sequi mollitia?
            </p>
          </div>
          <div></div>
        </div>

        <div className="w-full border-1 rounded-lg border-gray-300 px-3 py-5">
          <div className="flex justify-between border-b-gray-300 border-b-1 py-2">
            <div>
              <h1 className="Important">Important</h1>
            </div>
            <div className="flex gap-2">
              <button className="custom-button">
                {" "}
                <BsPencilSquare></BsPencilSquare> Edit
              </button>
              <button className="delete">
                <BsTrash3></BsTrash3>Delete
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="sm:text-xl">Agro Website Update</h1>
            <p className="text-xs text-gray-500 sm:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              magnam et praesentium accusamus ea labore dolore tenetur esse
              ipsum. Qui facere architecto veniam ullam adipisci porro et nisi
              molestiae alias nam maiores omnis ipsa, nesciunt totam error ipsam
              sequi mollitia?
            </p>
          </div>
          <div></div>
        </div>
      </div>
      {confirmDeleting && (
        <div className="flex justify-center items-center fixed inset-0 top-0 left-0 right-0 text-black">
          <div className="w-100 h-50 bg-[#FAF9FB] drop-shadow-2xl rounded-sm flex flex-col items-center justify-center">
            <h1>Are you sure you want to delete?</h1>
            <p>{taskToDelete}</p>
            <div className="flex justify-around gap-5">
              <button onClick={() => deleteTask(taskID)}>Yes</button>
              <button
                onClick={() => setConfirmDeleting(false)}
                className="cursor-pointer custom-done"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;

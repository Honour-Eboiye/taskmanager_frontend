import { useEffect } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { useApi } from "../hooks/useApi";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";

const EditTask = () => {
  const navigate = useNavigate();
  const api = "https://officialtaskmanager.onrender.com/api/v1/tasks/";
  const { info, isPending, errors } = useApi(api);
  const { taskId } = useParams();
  const handleBack = () => {
    navigate(-1);
  };
  const tasks = info.filter((task) => task._id === taskId);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // Sync formData with the loaded task when tasks[0] changes
  useEffect(() => {
    if (tasks[0]) {
      setFormData({
        title: tasks[0].title,
        description: tasks[0].description,
        tag: tasks[0].tag,
      });
    }
    // eslint-disable-next-line
  }, [tasks[0]?._id]);

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    switch (e.target.name) {
      case "title":
        setFormData({ ...formData, title: e.target.value });
        if(
          formData.title.trim().length < 2
        ){
          setFormError('The minimum title length is 3 characters')
        }
        break;

      case "description":
        setFormData({ ...formData, description: e.target.value });
        if(
          formData.description.trim().length < 10
        ){
          setFormError('The minimum description length is 10 characters')
        }
        break;

      case "tag":
        setFormData({ ...formData, tag: e.target.value });
        if(
          !formData.tag.trim().length
        ){
          setFormError('Select a tag from the options')
        }
        break;

      default:
        break;
    }

  };

  const validation = () => {
    console.log("Validation running")
    if(!tasks[0]){
      setFormError("Task not found!")
      return false
    }
    const { title, description, tag } = formData;
    if (
      !title.trim() ||
      !description.trim() ||
      !tag.trim()
    ) {
      setFormError("Make the necessary changes and try again");
      return false
    } 
    // else if (
    //   title.trim() === tasks[0]?.title ||
    //   description.trim() === tasks[0]?.description ||
    //   tag.trim() === tasks[0]?.tag
    // ) {
    //   setFormError("No changes detected make a few changes and try again");
    //   setValid(false);
    // }
    console.log('else statement')
    return true
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      setSubmitting(true)
      setFormError("Editing Task..")
      console.log(submitting)
      try {
        const response = await fetch(`${api}${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        //FETCH(URL, {DATAISH})
        if(!response.ok){
          const errorData = await response.json()
            throw new Error(errorData.message || "Failed to Edit the Task");
        }
        setFormError("Task edited successfully")
        navigate(-1)
        setSubmitting(false)
      } catch (error) {
        setSubmitting(false)
        setFormError(error.message || "Something went wrong!");
      }
    }
  };
  
  useEffect(() => {
    if (!formError) return;
    const timeout = setTimeout(() => {
      setFormError("");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [formError]);

  const [ submitting, setSubmitting ] = useState(false)


  return (
    <div className="custom-container py-5 flex flex-col gap-7">
      <div onClick={handleBack} className="flex items-center cursor-pointer">
        <BsChevronCompactLeft size={25}></BsChevronCompactLeft>
        <h1 className="text-xl lg:text-3xl">Edit Task</h1>
      </div>

      {/* PENDING */}
      {isPending && (
        <div className="mx-auto py-7 h-[40vh] items-center">
          <ScaleLoader size="28px" color="#974FD0"></ScaleLoader>
        </div>
      )}

      {/* ERRORS */}
      {errors && (
        <div className="bg-[#974FD0] text-white w-auto py-3 text-center">
          <h1>{errors}</h1>
        </div>
      )}

      {/* FORM ERROR */}
      {formError && (
        <div className="bg-[#974FD0] text-white w-auto py-3 text-center">
          <h1>{formError}</h1>
        </div>
      )}

      {/* SUBMITTING */}
      {submitting && (
        <div className="mx-auto py-7 h-[50vh] items-center">
          <ScaleLoader size="28px" color="#974FD0"></ScaleLoader>
        </div>
      )}

      {!isPending && !errors && !submitting && (
        <div>
          <div>
            {tasks.map((task) => {
              return (
                <div key={task._id}>
                  <div className="text-black">
                    <fieldset className="border-1 border-gray-300 px-4 py-2 ">
                      <legend>Task Title</legend>
                      <input
                        type="text"
                        className="w-full outline-0 text-xs"
                        placeholder="E.g Project Defense, Assignment..."
                        defaultValue={task.title}
                        onChange={handleChange}
                        name="title"
                      />
                    </fieldset>
                  </div>
                  <div className="text-black">
                    <fieldset className="border-1 border-gray-300 px-4 py-2 h-40">
                      <legend>Description</legend>
                      <textarea
                        type="text"
                        className="w-full outline-0 text-xs h-30 resize-none"
                        placeholder="Briefly describe your task"
                        defaultValue={task.description}
                        onChange={handleChange}
                        name="description"
                      />
                    </fieldset>
                  </div>
                  <div className="text-black pb-10">
                    <fieldset className="border-1 border-gray-300 px-4 py-2 ">
                      <legend>Tags</legend>
                      <select
                        className="w-full rounded-sm border-0 text-sm"
                        defaultValue={task.tag}
                        onChange={handleChange}
                        name="tag"
                      >
                        <option value="">Urgent, Important</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Important">Important</option>
                      </select>
                    </fieldset>
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSubmit} className="">
            {!submitting && (
              <button className="custom-done items-center w-full" type="submit">
                Edit Task
              </button>
            )}
            {submitting && (
              <button className="custom-submit items-center w-full" type="submit" disabled>
                Editing Task...
              </button>
            )}
          </form>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default EditTask;

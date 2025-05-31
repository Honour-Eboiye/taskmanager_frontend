import { useEffect } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";

const NewTask = () => {
  const navigate = useNavigate();
  const api = "https://officialtaskmanager.onrender.com/api/v1/tasks/";

  const handleBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });

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
    const { title, description, tag } = formData;
    if (
      !title.trim() ||
      !description.trim() ||
      !tag.trim()
    ) {
      setFormError("Fill the required information and try again");
      return false
    } else{
      return true
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      setSubmitting(true)
      setFormError("Creating Task..")
      try {
        const response = await fetch(`${api}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        //FETCH(URL, {DATAISH})
        if(!response.ok){
          const errorData = await response.json()
            throw new Error(errorData.message || "Failed Create the Task");
        }
        setFormError("Task Created successfully")
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
        <h1 className="text-xl lg:text-3xl">New Task</h1>
      </div>


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

      {!submitting && (
        <div>
          <div>
                  <div className="text-black">
                    <fieldset className="border-1 border-gray-300 px-4 py-2 ">
                      <legend>Task Title</legend>
                      <input
                        type="text"
                        className="w-full outline-0 text-xs"
                        placeholder="E.g Project Defense, Assignment..."
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
                        onChange={handleChange}
                        name="tag"
                      >
                        <option value="">Select a tag...</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Important">Important</option>
                      </select>
                    </fieldset>
                  </div>
                </div>
          <form onSubmit={handleSubmit} className="">
            {!submitting && (
              <button className="custom-done items-center w-full" type="submit">
                Create Task
              </button>
            )}
            {submitting && (
              <button className="custom-submit items-center w-full" type="submit" disabled>
                Creating Task...
              </button>
            )}
          </form>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default NewTask;

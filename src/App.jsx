import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import HomePage from './pages/HomePage'
import AllTasks from './pages/AllTasks'
import NewTask from './pages/NewTask'
import EditTask from './pages/EditTask'
import Register from './pages/Register'
import Login from './pages/Login'
import Error404 from './Error404'

function App() {

  return (
    <>
      
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/all_tasks' element={<AllTasks/>}/>
        <Route path='/new_task' element={<NewTask/>}/>
        <Route path='/edit/:taskId' element={<EditTask/>}/>
        <Route path='/sign_up' element={<Register/>}/>
        <Route path='/sign_in' element={<Login/>}/>
        <Route path='/*' element={<Error404/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

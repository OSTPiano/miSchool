import { Login } from './Login'
import {Routes, Route} from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { StudentNew } from './StudentNew'
import { StudentEdit } from "./StudentEdit.jsx";
import { StudentCalifications } from './StudentCalifications.jsx'

export function App() {

    return (  
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student" element={<StudentNew />} />
            <Route path="/student/:studentId" element={<StudentEdit />} />
            <Route path="/student/califications/:matriculaId" element={<StudentCalifications />} />
        </Routes>
    )
  }



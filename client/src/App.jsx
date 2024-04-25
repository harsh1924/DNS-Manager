import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomPage'
import NotFound from './Pages/NotFound'
import UploadDomain from './Pages/Domains/UploadDomain'
import UploadDomainManually from './Pages/Domains/UploadDomainManually'
import ViewDomains from './Pages/Domains/ViewDomains'
import Signup from './Pages/User/Signup'
import Login from './Pages/User/Login'
import RequireAuth from './Auth/RequireAuth'
import Profile from './Pages/User/Profile'
import EditDomain from './Pages/Domains/EditDomain'
import DeleteDomain from './Pages/Domains/DeleteDomain'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />


      <Route path='/user/signup' element={<Signup />} />
      <Route path='/user/login' element={<Login />} />

    <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}  >
      <Route path='/user/me' element={<Profile />} />
      <Route path='/domains' element={<ViewDomains />} />
    </Route>

      <Route element={<RequireAuth allowedRoles = {["ADMIN"]} />} >
        <Route path='/upload' element={<UploadDomain />} />
        <Route path='/upload-manually' element={<UploadDomainManually />} />
        <Route path='/edit/:id' element={<EditDomain />} />
        <Route path='/delete/:id' element={<DeleteDomain />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App

import {
  Register,
  Login,
  Landing,
  Profile,
  Users,
  User,
  UserUnis,
  Tasks,
  Task,
  ComingSoon,
  Unis,
  Uni,
  Unauthorized,
  NotFound,
  CreateUni,
  CreateUserPage,
  Dashboard,
  SendMessages,
  CreateTask,
} from './pages'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { RequireAuth } from './components'

function App() {
  return (
    <div className="bg-slate-800">
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Normal Routes that all can access  */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />

        {/* Admin Routes  */}
        <Route element={<RequireAuth allowedRoles={['admin', 'dev']} />}>
          <Route
            path="/create/admin"
            element={<CreateUserPage role="admin" />}
          />
          <Route path="/create/user" element={<CreateUserPage role="user" />} />
          <Route
            path="/create/agent"
            element={<CreateUserPage role="agent" />}
          />
          <Route path="/create/task" element={<CreateTask />} />
          <Route path="/create/university" element={<CreateUni />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Route>

        {/* Authenticated user */}
        <Route
          element={
            <RequireAuth allowedRoles={['admin', 'user', 'agent', 'dev']} />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/unis" element={<UserUnis />} />
          <Route path="/unis" element={<Unis />} />
          <Route path="/unis/:id" element={<Uni />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<Task />} />
          <Route path="/sendMessages" element={<SendMessages />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

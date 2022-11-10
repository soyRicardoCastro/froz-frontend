import { Route, Routes as Router } from "react-router-dom";
import { MultiForm, RequireAuth } from '../components';
import {
  Calendar,
  CollegeFit, CreateTask, CreateUni,
  CreateUserPage,
  Dashboard,
  EditUni,
  Login,
  NotFound,
  Profile,
  Register,
  SendMessages,
  Tasks,
  Unauthorized,
  Uni,
  Unis,
  User,
  Users,
  UserUnis
} from '../pages';

export default function Routes () {
  return (
    <Router>
    {/* Normal Routes that all can access  */}
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='/*' element={<NotFound />} />

    {/* Admin Routes  */}
      <Route element={<RequireAuth allowedRoles={['admin', 'dev']} />}>
        <Route path='/' element={<Dashboard />} />
        <Route
          path='/create/admin'
          element={<CreateUserPage role='admin' />}
        />
        <Route path='/create/user' element={<CreateUserPage role='user' />} />
        <Route
          path='/create/agent'
          element={<CreateUserPage role='agent' />}
        />
        <Route path='/create/task' element={<CreateTask />} />
        <Route path='/create/university' element={<CreateUni />} />
        <Route path='/unis/:id/edit' element={<EditUni />} />

        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Route>

    {/* Authenticated user */}
    <Route
      element={
        <RequireAuth allowedRoles={['admin', 'user', 'agent', 'dev']} />
      }
      >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/user/unis' element={<UserUnis />} />
        <Route path='/unis' element={<Unis />} />
        <Route path='/unis/:id' element={<Uni />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/user/college-planer' element={<Calendar />} />
        <Route path='/sendMessages' element={<SendMessages />} />
        <Route path='/user/college-fit' element={<CollegeFit />} />
        <Route path='/user/get-to-know-you' element={<MultiForm />} />
    </Route>
  </Router>
)
}


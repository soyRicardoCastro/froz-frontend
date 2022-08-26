import {
  UsersIcon,
  UserAddIcon,
  AcademicCapIcon,
  CollectionIcon,
  UserCircleIcon,
  TableIcon
} from '@heroicons/react/outline'

const s = 'h-5 w-5 text-gray-400 mr-2 group-hover:text-white'

export const sidebarAdminRoutes = [
  {
    title: 'main',
    links: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <TableIcon className={s} />
      },
      {
        label: 'My Profile',
        path: '/profile',
        icon: <UserCircleIcon className={s} />
      }
    ]
  },
  {
    title: 'users',
    links: [
      {
        label: 'All Users',
        path: '/users',
        icon: <UsersIcon className={s} />
      },
      {
        label: 'Create Admin',
        path: '/create/admin',
        icon: <UserAddIcon className={s} />
      },
      {
        label: 'Create Agent',
        path: '/create/agent',
        icon: <UserAddIcon className={s} />
      }
    ]
  },
  {
    title: 'universities',
    links: [
      {
        label: 'All Universities',
        path: '/unis',
        icon: <AcademicCapIcon className={s} />
      },
      {
        label: 'My Universities',
        path: '/user/unis',
        icon: <AcademicCapIcon className={s} />
      },
      {
        label: 'Create University',
        path: '/create/university',
        icon: <AcademicCapIcon className={s} />
      }
    ]
  },
  {
    title: 'Others',
    links: [
      {
        label: 'My Tasks',
        path: '/tasks',
        icon: <CollectionIcon className={s} />
      },
      {
        label: 'Create Task',
        path: '/create/task',
        icon: <CollectionIcon className={s} />
      },
      {
        label: 'Send Messages',
        path: '/sendMessages',
        icon: <CollectionIcon className={s} />
      }
    ]
  }
]

export const sidebarUserRoutes = [
  {
    title: 'main',
    links: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <TableIcon className={s} />
      },
      {
        label: 'My Profile',
        path: '/profile',
        icon: <UserCircleIcon className={s} />
      }
    ]
  },
  {
    title: 'universities',
    links: [
      {
        label: 'All Universities',
        path: '/unis',
        icon: <AcademicCapIcon className={s} />
      },
      {
        label: 'My Universities',
        path: '/user/unis',
        icon: <AcademicCapIcon className={s} />
      }
    ]
  },
  {
    title: 'Others',
    links: [
      {
        label: 'My Tasks',
        path: '/tasks',
        icon: <CollectionIcon className={s} />
      },
      {
        label: 'Send Messages',
        path: '/sendMessages',
        icon: <CollectionIcon className={s} />
      }
    ]
  }
]

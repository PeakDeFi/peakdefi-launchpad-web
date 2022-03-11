import MainScreen from "./scenes/MainScreen/MainScreen"
import IdoDetail from "./scenes/IdoDetail/IdoDetail"
import AllocationStaking from "./scenes/AllocationStaking/AllocationStaking"
import AdminPanel from "./scenes/AdminPanel/AdminPanel"
import SalesPage from "./scenes/SalesPage/SalesPage"
import Login from "./scenes/Login/Login"

export const routes = [
  {
    path: "/",
    exact: true,
    component: <MainScreen />,
    isPrivate: true
  },
  
  {
    path: "/project-details",
    exact: true,
    component: <IdoDetail />,
    isPrivate: true
  },
  
  {
    path: "/allocation-staking",
    exact: true,
    component: <AllocationStaking />,
    isPrivate: true
  },

  {
    path: '/sales',
    exact: true,
    component: <SalesPage />,
    isPrivate: true
  },

  {
    path: "/admin-panel",
    exact: true,
    component: <AdminPanel />,
    isPrivate: true
  },

  {
    path: '/login',
    exact: true,
    component: <Login />,
    isPrivate: false
  }
]
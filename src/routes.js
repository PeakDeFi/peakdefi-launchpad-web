import MainScreen from "./scenes/MainScreen/MainScreen"
import IdoDetail from "./scenes/IdoDetail/IdoDetail"
import AllocationStaking from "./scenes/AllocationStaking/AllocationStaking"
import AdminPanel from "./scenes/AdminPanel/AdminPanel"
import SalesPage from "./scenes/SalesPage/SalesPage"

export const routes = [
  {
    path: "/",
    exact: true,
    component: <MainScreen />
    
  },
  
  {
    path: "/project-details",
    exact: true,
    component: <IdoDetail />
    
  },
  
  {
    path: "/allocation-staking",
    exact: true,
    component: <AllocationStaking />
  },

  {
    path: '/sales',
    exact: true,
    component: <SalesPage />
  },
/*
  {
    path: "/admin-panel",
    exact: true,
    component: <AdminPanel />
  }*/
]
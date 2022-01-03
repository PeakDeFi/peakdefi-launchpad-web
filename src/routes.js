import MainScreen from "./scenes/MainScreen/MainScreen"
import IdoDetail from "./scenes/IdoDetail/IdoDetail"
import AllocationStaking from "./scenes/AllocationStaking/AllocationStaking"

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
]
import MainScreen from "./scenes/MainScreen/MainScreen"
import IdoDetail from "./scenes/IdoDetail/IdoDetail"

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
]
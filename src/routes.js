import MainScreen from "./scenes/MainScreen/MainScreen"
import IdoDetail from "./scenes/IdoDetail/IdoDetail"
import AllocationStaking from "./scenes/AllocationStaking/AllocationStaking"
import AdminPanel from "./scenes/AdminPanel/AdminPanel"
import SalesPage from "./scenes/SalesPage/SalesPage"
import Login from "./scenes/Login/Login"
import AboutPage from "./scenes/AboutPage/AboutPage"
import TierPage from "./scenes/TierPage/TierPage"
import TermsAndConditions from "./scenes/TermsAndConditions/TermsAndConditions"
import FAQ from "./scenes/FAQ/FAQ"
import NotFound from "./scenes/NotFound/NotFound"
import PreviewIdoDetail from "./scenes/PreviewIdoDetail/PreviewIdoDetail"
import ThankYouPage from './scenes/ThankYouPage/ThankYouPage'
import EbookThankYou from "./scenes/EbookThankYou/EbookThankYou"

export const routes = [
  {
    path: "/",
    exact: true,
    component: <MainScreen />,
    isProtected: true
  },

  {
    path: "/project-details/:name",
    exact: true,
    component: <IdoDetail />,
    isProtected: true
  },

  {
    path: "/project-details/:name/:type",
    exact: true,
    component: <IdoDetail />,
    isProtected: true
  },

  {
    path: "/preview-project-details",
    exact: true,
    component: <PreviewIdoDetail />,
    isProtected: true
  },

  {
    path: "/allocation-staking",
    exact: true,
    component: <AllocationStaking />,
    isProtected: true
  },

  // {
  //   path: '/sales',
  //   exact: true,
  //   component: <SalesPage />,
  //   isProtected: true
  // },

  {
    path: "/admin-panel",
    exact: true,
    component: <AdminPanel />,
    isProtected: true
  },

  {
    path: "/admin",
    exact: true,
    component: <AdminPanel />,
    isProtected: true
  },

  {
    path: "/about",
    exact: true,
    component: <AboutPage />,
    isProtected: true
  },

  {
    path: '/tier-system',
    exact: true,
    component: <TierPage />,
    isProtected: true
  },

  {
    path: '/login',
    exact: true,
    component: <Login />,
    isProtected: false
  },

  {
    path: '/terms-and-conditions',
    exact: true,
    component: <TermsAndConditions />,
    isProtected: false
  },

  {
    path: '/faq',
    exact: true,
    component: <FAQ />,
    isProtected: false
  },

  {
    path: '/thank-you-register',
    exact: true,
    component: <ThankYouPage />,
    isProtected: false
  },

  {
    path: '/thank-you-deposit',
    exact: true,
    component: <ThankYouPage />,
    isProtected: false
  },

  {
    path: '/thank-you-stake',
    exact: true,
    component: <ThankYouPage />,
    isProtected: false
  },

  {
    path: '/checklist-thank-you',
    exact: true,
    component: <EbookThankYou />,
    isProtected: false
  },

  {
    path: '*',
    exact: false,
    component: <NotFound />,
    isProtected: false
  }
]
import { ReactElement } from 'react'
import RegisterPage from './pages/register-page/RegisterPage'
import LoginPage from './pages/login-page/LoginPage'
import DashboardPage from './pages/dashboard-page/DashboardPage'
import QuizPage from './pages/quiz-page/QuizPage'
import ResultPage from './pages/result-page/ResultPage'
import PastResultsPage from './pages/past-results-page/PastResultsPage'
import SettingsPage from './pages/settings-page/SettingsPage'

type Route = {
    name: string
    path: string
    element: ReactElement
}

// Define routes
const routes: Route[] = [
    {
        name: 'Register',
        path: 'register',
        element: <RegisterPage />,
    },
    {
        name: 'Login',
        path: 'login',
        element: <LoginPage />,
    },
    {
        name: 'Home',
        path: 'home',
        element: <DashboardPage />,
    },
    {
        name: 'Quiz',
        path: 'quiz',
        element: <QuizPage />,
    },
    {
        name: 'Result',
        path: 'result',
        element: <ResultPage />,
    },
    {
        name: 'Past Results',
        path: 'past-results',
        element: <PastResultsPage />,
    },
    {
        name: 'Settings',
        path: 'settings',
        element: <SettingsPage />,
    }
]

export default routes
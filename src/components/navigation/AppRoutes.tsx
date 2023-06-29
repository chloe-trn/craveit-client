import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/authSlice'

import PrivateRoute from './PrivateRoute'
import PageNotFound from '../../pages/error-pages/PageNotFound'
import AuthorizationPage from '../../pages/authorization-page/AuthorizationPage'
import DashboardPage from '../../pages/dashboard-page/DashboardPage'
import PastResultsPage from '../../pages/past-results-page/PastResultsPage'
import QuizPage from '../../pages/quiz-page/QuizPage'
import ResultPage from '../../pages/result-page/ResultPage'

const AppRoutes = () => {
  const { token } = useSelector(selectAuth)
  
  return (
    <div data-testid='app-routes'>
      <Routes>
        {/* Fallback route for handling 404 errors */}
        <Route path="*" element={<PageNotFound />} />
        {/* Redirect to /home if the user is logged in */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="/auth" element={<AuthorizationPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/questionnaire"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/saved-results"
          element={
            <PrivateRoute>
              <PastResultsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default AppRoutes

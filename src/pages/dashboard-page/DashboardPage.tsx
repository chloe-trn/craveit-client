import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/slices/authSlice'

const DashboardPage = () => {
  const { username } = useSelector(selectAuth)

  return (
    <section className='home'>
      <h2>Hey there, {username} <span>👋</span></h2>
      <p>Welcome to Crave It, the app that helps you overcome indecision and find the perfect restaurant!</p>
      <p>Say goodbye to endless options and dilemmas. Crave It narrows down your choices and presents you with one perfect restaurant recommendation.</p>
      <p>Ready to discover your next favorite dining spot?</p>
      <Link to="/questionnaire">
        <button className="btn gradient">Take the Questionnaire</button>
      </Link>
  </section>
  )
}

export default DashboardPage
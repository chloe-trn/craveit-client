import { useRouteError } from "react-router-dom"

const ErrorPage = () => {

  // TODO: specify "unknown" rather than "any" for error type
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, something went wrong.</p>
      <p>
        <em>{error.statusText || error.message}</em>
      </p>
    </div>
  )
}

export default ErrorPage
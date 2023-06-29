type LoadingProps = {
  text: string
}

const Loading = ({text}: LoadingProps) => {
  return (
    <div className='loading-container' role='status'>
      <div className='animation-container'>
        <div className='animation-dot animation-dot-1'></div>
        <div className='animation-dot animation-dot-2'></div>
        <div className='animation-dot animation-dot-3'></div>
      </div>
      <p className='loading-text'>{text}</p>
    </div>
  )
}

export default Loading
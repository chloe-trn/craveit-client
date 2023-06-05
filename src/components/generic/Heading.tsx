type HeadingProps = {
    title: string
}

const Heading = ({ title }: HeadingProps) => {
  return (
    <h1 className='h1'>{title}</h1>
  )
}

export default Heading
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type MessageProps = {
  className: string, 
  icon: IconProp, 
  text: string
}

const Message = ({ className, icon, text }: MessageProps) => {
  return (
    <p className={className}>
      <FontAwesomeIcon icon={icon} />
      {text}
    </p>
  )
}

export default Message
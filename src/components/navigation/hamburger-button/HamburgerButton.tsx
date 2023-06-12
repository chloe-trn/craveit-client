import './hamburger-button.css'

type HamburgerButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void,
  menuOpen: boolean
}

const HamburgerButton = ({ onClick, menuOpen }: HamburgerButtonProps ) => {
  
  return (
    <button 
      className='hamburger' 
      onClick={onClick}
      aria-controls='nav'
      aria-expanded={menuOpen}
    >
      <span className='line'></span>
      <span className='line'></span>
      <span className='line'></span>
      <span className='line'></span>
    </button>
  )
}

export default HamburgerButton
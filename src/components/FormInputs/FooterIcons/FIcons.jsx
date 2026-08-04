import './FIcons.css'
import '../Button/Button.css'

const FIcons = ({ link, children }) => {
  return (
    <a className="nav-link Ficons" href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default FIcons
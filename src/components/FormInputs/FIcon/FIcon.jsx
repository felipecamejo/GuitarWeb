import './FIcon.css'
import '../Button/Button.css'

import { FaGithub, FaLinkedin } from 'react-icons/fa'


const FIcon = ({ link, fa }) => {

  let child;
  const normalizedFa = fa?.toLowerCase();

  if (normalizedFa === 'github') {
    child = <FaGithub style={{ color: 'white', fontSize: '24px' }} />
  } else if (normalizedFa === 'linkedin') {
    child = <FaLinkedin style={{ color: 'white', fontSize: '24px' }} />
  }

  return (
    <a className="nav-link Ficons" href={link} target="_blank" rel="noopener noreferrer">
      {child}
    </a>
  )
}

export default FIcon
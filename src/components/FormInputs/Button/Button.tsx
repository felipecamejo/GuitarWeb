import { NavLink } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import './Button.css'

export type ButtonType = {
  fa?: Fa,
  to: string,
  label?: string
}

type Fa = 'github' | 'linkedin';

export default function Button (button: ButtonType) {

  let child;

  if (button.fa) {

    const normalizedFa = button.fa?.toLowerCase();

    if (normalizedFa === 'github') {
      child = <FaGithub style={{ color: 'white', fontSize: '24px' }} />
    } else if (normalizedFa === 'linkedin') {
      child = <FaLinkedin style={{ color: 'white', fontSize: '24px' }} />
    }

    return (
      <a className="nav-link nav-link-footer" href={button.to} target="_blank" rel="noopener noreferrer">
        {child}
      </a>
    )
  }

  return (
    <NavLink to={button.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
      {button.label}
    </NavLink>
  )
}







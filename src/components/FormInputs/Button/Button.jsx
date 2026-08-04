import { NavLink } from 'react-router-dom'
import './Button.css'

const Button = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
    >
      {label}
    </NavLink>
  )
}

export default Button
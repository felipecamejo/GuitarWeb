import { NavLink } from 'react-router-dom'
import './Button.css'

export type ButtonType = {
  fa?: string
  to: string,
  label: string
}

export default function Button (button: ButtonType) {
  return (
    <NavLink
      to={button.to}
      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
    >
      {button.label}
    </NavLink>
  )
}

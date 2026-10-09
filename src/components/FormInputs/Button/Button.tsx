import { NavLink } from 'react-router-dom'
import './Button'

export type button = {
  fa?: string
  to: string,
  label: string
}

export default function Button (button: button) {
  return (
    <NavLink
      to={button.to}
      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
    >
      {button.label}
    </NavLink>
  )
}


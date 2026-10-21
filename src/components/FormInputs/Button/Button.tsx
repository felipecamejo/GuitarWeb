import { NavLink } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaRedo } from 'react-icons/fa'
import './Button.css'

export type ButtonType = {
  fa?: Fa,
  to?: string,
  label?: string
  disabled?: boolean
  onClick?: () => void
}

type Fa = 'github' | 'linkedin' | 'refresh';

export default function Button (button: ButtonType) {

  let child;
  const disabledClass = button.disabled ? ' disabled' : ''

  if (button.fa === 'refresh') {
    return (
      <button
        type="button"
        className={`nav-link button-link${disabledClass}`}
        aria-disabled={button.disabled}
        disabled={button.disabled}
        onClick={button.onClick}
      >
        <FaRedo />
      </button>
    )
  }

  if (!button.to) {
    return null
  }

  if (button.fa) {

    const normalizedFa = button.fa?.toLowerCase();

    if (normalizedFa === 'github') {
      child = <FaGithub style={{ color: 'white', fontSize: '24px' }} />
    } else if (normalizedFa === 'linkedin') {
      child = <FaLinkedin style={{ color: 'white', fontSize: '24px' }} />
    }

    return (
      <a
        className={`nav-link nav-link-footer${disabledClass}`}
        href={button.to}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={button.disabled}
        tabIndex={button.disabled ? -1 : undefined}
        onClick={button.disabled ? (event) => event.preventDefault() : button.onClick}
      >
        {child}
      </a>
    )
  }

  return (
    <NavLink
      to={button.to}
      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}${disabledClass}`}
      aria-disabled={button.disabled}
      tabIndex={button.disabled ? -1 : undefined}
      onClick={button.disabled ? (event) => event.preventDefault() : button.onClick}
    >
      {button.label}
    </NavLink>
  )
}




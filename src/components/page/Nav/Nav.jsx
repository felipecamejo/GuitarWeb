import './Nav.css'
import Button from '../../FormInputs/Button/Button'

const Nav = ({ buttons }) => {
  return (
    <nav className="nav">
      {buttons.map((btn, index) => (
        <Button key={`${btn.fa}-${index}`} to={btn.to} label={btn.label} />
      ))}
    </nav>
  )
}

export default Nav
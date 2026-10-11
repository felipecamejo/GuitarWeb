import './Nav.css'
import Button, {ButtonType} from '../../FormInputs/Button/Button'


export default function Nav (buttons: ButtonType[]) {
  return (
    <nav className="nav">
      {buttons.map((btn, index) => (
        <Button key={`${btn.fa}-${index}`} to={btn.to} label={btn.label} />
      ))}
    </nav>
  )
}
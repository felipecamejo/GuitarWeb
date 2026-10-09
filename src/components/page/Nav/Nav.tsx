import './Nav'
import Button, {button} from '../../FormInputs/Button/Button'


export default function Nav (buttons: button[]) {
  return (
    <nav className="nav">
      {buttons.map((btn, index) => (
        <Button key={`${btn.fa}-${index}`} to={btn.to} label={btn.label} />
      ))}
    </nav>
  )
}
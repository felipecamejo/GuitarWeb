import './Footer.css'
import Button, { ButtonType } from '../../FormInputs/Button/Button'

export default function Footer (footerButtons: ButtonType[]) {
  return (
    <footer className="footer">
      {footerButtons.map((footerButton, index: number) => (
        <Button key={`${footerButton.fa}-${index}`} to={footerButton.to} fa={footerButton.fa} />
      ))}
    </footer>
  )
}
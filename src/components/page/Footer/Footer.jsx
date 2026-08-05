import './Footer.css'
import FIcon from '../../FormInputs/FIcon/FIcon'

const Footer = ({ ficons }) => {
  return (
    <footer className="footer">
      {ficons.map((fic, index) => (
        <FIcon key={`${fic.fa}-${index}`} link={fic.link} fa={fic.fa} />
      ))}
    </footer>
  )
}

export default Footer
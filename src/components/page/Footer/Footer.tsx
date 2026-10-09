import './Footer'
import FIcon, {Ficon} from '../../FormInputs/FIcon/FIcon'


export default function Footer (ficons: Ficon[]) {
  return (
    <footer className="footer">
      {ficons.map((ficon, index: number) => (
        <FIcon key={`${ficon.fa}-${index}`} link={ficon.link} fa={ficon.fa} />
      ))}
    </footer>
  )
}
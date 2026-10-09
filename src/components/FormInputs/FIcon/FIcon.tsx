import './FIcon'
import '../Button/Button'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

type Fa = 'github' | 'linkedin';

export type Ficon = {
  fa: Fa
  link: string
}

export default function FIcon (ficon : Ficon) {
  let child;
  const normalizedFa = ficon.fa?.toLowerCase();

  if (normalizedFa === 'github') {
    child = <FaGithub style={{ color: 'white', fontSize: '24px' }} />
  } else if (normalizedFa === 'linkedin') {
    child = <FaLinkedin style={{ color: 'white', fontSize: '24px' }} />
  }

  return (
    <a className="nav-link Ficons" href={ficon.link} target="_blank" rel="noopener noreferrer">
      {child}
    </a>
  )
}
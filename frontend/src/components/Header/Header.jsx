import './Header.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
export default function Header(){
	return (
		<header>
			<div clasName="logo_header">
				<Link to="/" style={{ textDecoration: 'none',color:'black' }}>
				<b>Siberian Transport University</b>
				</Link></div>
			<div className="button_header">
				<Button>Help</Button>
			</div>
		</header>
	)
}

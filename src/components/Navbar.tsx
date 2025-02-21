import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { Logo } from './Logo'

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	height: 60px;
	padding: 0.5rem;
`

const Ul = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	list-style: none;
	gap: 0.25rem;
`

const Li = styled.li`
	height: 100%;
	& a {
		padding: 0 1rem;
		width: 100%;
		height: 100%;
		color: #f0f0f5;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.5s ease-in-out;
		font-weight: bold;
	}
	& a:hover {
		color: #080d10;
		background-color: #b4e900;
	}
`

export function Navbar() {
	return (
		<Nav>
			<Logo />
			<Ul>
				<Li>
					<Link to="/">Dashboard</Link>
				</Li>
				<Li>
					<Link to="/owners">Proprietários</Link>
				</Li>
				<Li>
					<Link to="/properties">Propriedades</Link>
				</Li>
				<Li>
					<Link to="/harvests">Safras</Link>
				</Li>
			</Ul>
		</Nav>
	)
}

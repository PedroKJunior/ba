import styled from 'styled-components'

interface CardProps {
	children: React.ReactNode
}

const CardStyle = styled.div`
	width: 100%;
	background: linear-gradient(45deg, #101619, #171f24);
	padding: 0 15px;
	border-radius: 8px;
	border: 1px solid #182126;
	box-shadow: 0 5px 12px #090c0daa;
`

export function Card({ children }: CardProps) {
	return <CardStyle>{children}</CardStyle>
}

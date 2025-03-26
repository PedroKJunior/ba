import { styled } from 'styled-components'

const H1 = styled.h1`
	font-family: 'Roboto', sans-serif;
	font-size: 2.5em;
	color: #fff;
	background: linear-gradient(0deg, #87de1d, #b4e900);
	background-clip: text;
	-webkit-text-fill-color: transparent;
	text-transform: uppercase;
	display: flex;
	align-items: center;
`

const Image = styled.img`
	width: 1em;
	height: 1em;
	margin-right: 0.25em;
`

export function Logo() {
	return (
		<H1>
			<Image src="images/logo.svg" alt="BA" />
			Brain Agriculture
		</H1>
	)
}

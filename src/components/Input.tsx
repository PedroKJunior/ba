import { styled } from 'styled-components'

const InputStyled = styled.input`
	font-family: 'Roboto', sans-serif;
	font-size: 1em;
	color: #dadada;
	padding: 0.5rem;
	border: none;
	background: #131a1d;
	border-radius: 0.25rem;
	outline: none;
	border: 1px solid #131a1d;
	width: 100%;

	&:focus {
		border-color: #b4e900;
	}
`

export function Input({ ...props }) {
	return <InputStyled {...props} />
}

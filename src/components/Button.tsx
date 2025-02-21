import { styled } from 'styled-components'

const ButtonStyled = styled.button`
	background-color: #b4e900;
	width: 100%;
	color: #080d10;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	transition: background-color 0.3s;

	&:hover {
		background-color: #87de1d;
	}

	&:active {
		background-color: #5cbf0d;
	}
`

export function Button({ ...props }) {
	return <ButtonStyled {...props} />
}

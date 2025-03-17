import type { ChangeEvent, FocusEvent } from 'react'
import { styled } from 'styled-components'

const InputContainer = styled.div`
	height: 55px;
`

const InputStyled = styled.input.withConfig({
	shouldForwardProp: prop => prop !== 'error',
})<{ error: boolean }>`
	font-family: 'Roboto', sans-serif;
	font-size: 1em;
	color: #dadada;
	padding: 0.5rem;
	border: none;
	background: #131a1d;
	border-radius: 0.25rem;
	outline: none;
	border: 1px solid ${({ error }) => (error ? '#e20031' : '#131a1d')};
	width: 100%;
	transition: all 0.2s ease-in-out;

	&:focus {
		border-color: #b4e900;
	}
`

const ErrorStyled = styled.span`
	font-family: 'Roboto', sans-serif;
	font-size: 0.75em;
	color: #e20031;
	font-weight: bold;
	padding: 0.5rem;
	width: 100%;
`

interface InputProps {
	error?: string | null
	name?: string
	value?: string | number
	type?: string
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	onFocus?: (event: FocusEvent<HTMLInputElement> | null) => void
	clearError?: () => void
}

export function Input({ error, clearError, ...props }: InputProps) {
	return (
		<InputContainer>
			<InputStyled {...props} error={!!error} onFocus={clearError} />
			{error && <ErrorStyled>{error}</ErrorStyled>}
		</InputContainer>
	)
}

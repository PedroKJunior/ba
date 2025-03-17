import { useState, useRef, useEffect } from 'react'
import { styled } from 'styled-components'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

interface Option {
	value: string
	label: string
}

interface SelectProps {
	options: Option[]
	onChange: (event: SelectEvent) => void
	placeholder?: string
	name?: string
	disabled?: boolean
	error?: string | null
	onClick?: () => void
	clearError: () => void
	value?: string
}

const SelectContainer = styled.div.withConfig({
	shouldForwardProp: prop => prop !== 'disabled',
})<{ disabled: boolean }>`
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	position: relative;
	width: 100%;
`

const SelectBox = styled.div.withConfig({
	shouldForwardProp: prop => prop !== 'isOpen' && prop !== 'error',
})<{ isOpen: boolean; error: boolean }>`
	border: 1px solid ${({ isOpen, error }) => (isOpen ? '#b4e900' : error ? '#e20031' : '#131a1d')};
	cursor: pointer;
	background-color: #131a1d;
	color: #dadada;
	border-radius: 0.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	outline: none;
	padding: 0;
	padding-right: 0.5rem;
	padding: 0.5rem;
`

const OptionsList = styled.ul.withConfig({
	shouldForwardProp: prop => prop !== 'isOpen',
})<{ isOpen: boolean }>`
	position: absolute;
	width: 100%;
	border: 1px solid #131a1d;
	color: #dadada;
	background-color: #131a1d;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	margin-top: 0.25rem;
	max-height: 15rem;
	overflow: auto;
	opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
	transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
	transition:
		opacity 0.3s ease-in-out,
		transform 0.3s ease-in-out;
	pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
	outline: none;
`

const OptionItem = styled.li`
	padding: 0.5rem;
	cursor: pointer;
	outline: none;
	&:hover {
		background-color: #b4e900;
		color: #131a1d;
	}
	&:focus {
		background-color: #b4e900;
		color: #131a1d;
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

export function Select({
	options,
	onChange,
	placeholder = 'Selecione uma opção',
	name = '',
	disabled = false,
	error,
	clearError,
	value = '',
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState<Option | null>(null)

	const selectRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLUListElement>(null)

	const handleSelect = (option: Option) => {
		setSelectedOption(option)
		onChange({
			target: {
				name,
				value: option.value,
			},
		})
		setIsOpen(false)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<SelectContainer ref={selectRef} disabled={disabled}>
			<SelectBox
				onClick={() => {
					setIsOpen(!isOpen)
					clearError()
				}}
				data-testid="select-box"
				isOpen={isOpen}
				error={!!error}
			>
				{value.trim() ? selectedOption?.label : placeholder}
				<ChevronDownIcon
					style={{
						width: '1rem',
						color: '#b4e900',
						rotate: isOpen ? '180deg' : '0deg',
						transition: 'rotate 0.25s ease-in-out',
					}}
				/>
			</SelectBox>

			<OptionsList isOpen={isOpen} ref={listRef}>
				{options.map(option => (
					<OptionItem tabIndex={0} key={option.value} onClick={() => handleSelect(option)}>
						{option.label}
					</OptionItem>
				))}
			</OptionsList>
			{error && <ErrorStyled>{error}</ErrorStyled>}
		</SelectContainer>
	)
}

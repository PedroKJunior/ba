import { useState, useRef, useEffect } from 'react'
import { styled } from 'styled-components'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

interface Option {
	value: string
	label: string
}

interface SelectProps {
	options: Option[]
	onChange: (value: string) => void
	placeholder?: string
}

const SelectContainer = styled.div`
	position: relative;
	width: 100%;
`

const SelectBox = styled.div`
	border: 1px solid #131a1d;
	padding: 0.5rem;
	cursor: pointer;
	background-color: #131a1d;
	color: #dadada;
	border-radius: 0.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
`

const OptionItem = styled.li`
	padding: 0.5rem;
	cursor: pointer;
	&:hover {
		background-color: #b4e900;
		color: #131a1d;
	}
`

export function Select({ options, onChange, placeholder = 'Selecione uma opção' }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState<Option | null>(null)
	const selectRef = useRef<HTMLDivElement>(null)

	const handleSelect = (option: Option) => {
		setSelectedOption(option)
		onChange(option.value)
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
		<SelectContainer ref={selectRef}>
			<SelectBox onClick={() => setIsOpen(!isOpen)} data-testid="select-box">
				{selectedOption ? selectedOption.label : placeholder}
				<ChevronDownIcon
					style={{
						width: '1rem',
						color: '#b4e900',
						rotate: isOpen ? '180deg' : '0deg',
						transition: 'rotate 0.25s ease-in-out',
					}}
				/>
			</SelectBox>

			<OptionsList isOpen={isOpen}>
				{options.map(option => (
					<OptionItem key={option.value} onClick={() => handleSelect(option)}>
						{option.label}
					</OptionItem>
				))}
			</OptionsList>
		</SelectContainer>
	)
}

import { CheckCircleIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import styled, { keyframes } from 'styled-components'

interface ModalProps {
	success: boolean
	show: boolean
	setShow: (show: boolean) => void
}

const ModalContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: transparent;
	backdrop-filter: blur(2px);
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`

const show = keyframes`
	0% {
		transform: translateY(500px);
		animation-timing-function: ease-in;
		opacity: 0;
  	}
  	38% {
		transform: translateY(0);
        animation-timing-function: ease-out;
	    opacity: 1;
  	}
	55% {
		transform: translateY(65px);
		animation-timing-function: ease-in;
  	}
	72% {
		transform: translateY(0);
		animation-timing-function: ease-out;
	}
	81% {
		transform: translateY(28px);
		animation-timing-function: ease-in;
	}
	90% {
		transform: translateY(0);
		animation-timing-function: ease-out;
	}
	95% {
		transform: translateY(8px);
		animation-timing-function: ease-in;
	}
	100% {
		transform: translateY(0);
		animation-timing-function: ease-out;
	}

`

const ModalBody = styled.div.withConfig({
	shouldForwardProp: prop => prop !== 'color',
})<{ color: string }>`
	position: relative;
	padding: 10px;
	color: #dadada;
	margin-bottom: 10px;
	width: 400px;
	display: grid;
	grid-template-columns: 70px 1fr 30px;
	border-radius: 5px;
	background-image: radial-gradient(circle at 0px 0px, ${({ color }) => `${color}7a`}, #22242f 30%);
	animation: ${show} 1.1s ease-in-out 1 forwards;
	box-shadow: 0 2px 8px #010608;
`

const Content = styled.div`
	height: 100%;
`

const Title = styled.div`
	font-size: x-large;
	font-weight: bold;
	color: #dadada;
	margin-bottom: 2px;
`

const CloseButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	color: #dadada;

	&:hover {
		color: #a8a8a8;
	}
`

export function Modal({ success, show, setShow }: ModalProps) {
	if (!show) return <></>

	if (success)
		return (
			<ModalContainer>
				<ModalBody color="#b4e900">
					<CheckCircleIcon width={42} color="#b4e900" />
					<Content>
						<Title>Sucesso</Title>
						<span>O dado foi salvo.</span>
					</Content>
					<CloseButton>
						<XMarkIcon width={20} onClick={() => setShow(false)} />
					</CloseButton>
				</ModalBody>
			</ModalContainer>
		)

	if (!success)
		return (
			<ModalContainer>
				<ModalBody color="#E20031">
					<ExclamationCircleIcon width={42} color="#E20031" />
					<Content>
						<Title>Erro</Title>
						<span>Algo deu errado! =(</span>
					</Content>
					<CloseButton>
						<XMarkIcon width={20} onClick={() => setShow(false)} />
					</CloseButton>
				</ModalBody>
			</ModalContainer>
		)
}

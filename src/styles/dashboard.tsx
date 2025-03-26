import styled from 'styled-components'

export const View = styled.div`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	padding-left: 1rem;
	padding-right: 1rem;

	@media (min-width: 640px) {
		max-width: 640px;
	}

	@media (min-width: 768px) {
		max-width: 768px;
	}

	@media (min-width: 1024px) {
		max-width: 1024px;
	}

	@media (min-width: 1280px) {
		max-width: 1280px;
	}

	@media (min-width: 1536px) {
		max-width: 1536px;
	}
`

export const Grid = styled.div`
	padding: 10px;
	display: grid;
	grid-template-columns: 1fr;
`

export const Grid2 = styled.div`
	padding: 10px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
`

export const Grid1 = styled.div`
	padding: 10px;
	display: flex;
	gap: 16px;
`
export const Small = styled.span`
	font-size: 18px;
	color: #90a9a9;
	margin-left: -9px;
`
export const Title = styled.h1`
	font-size: 24px;
	margin: 20px 0;
	color: #e1e1e1;
	display: flex;
	align-items: center;
	gap: 15px;
	font-weight: bold;
`
export const Text = styled.p`
	font-size: 24px;
	margin: 20px 0;
	color: #b4e900;
	font-weight: 500;
`
export const SVG = styled.div`
	display: flex;
	align-items: center;
	background: #1f2a30;
	border-radius: 15px;
	font-size: 32px;
	padding: 5px;
	color: #b4e900;
`

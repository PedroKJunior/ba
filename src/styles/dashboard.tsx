import styled from 'styled-components'

export const Grid2 = styled.div`
	padding: 10px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
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

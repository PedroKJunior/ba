import { styled } from 'styled-components'

export const View = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 60px);
	width: 100vw;
	color: #f0f0f5;
	overflow: auto;
`
export const Container = styled.div`
	max-width: 1280px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	padding: 0 1rem;
`

export const Box = styled.div`
	max-width: 1280px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`
export const Hr = styled.hr`
	width: 100%;
	border: 0;
	border-top: 1px solid #131a1d;
	margin: 20px 0;
`
export const Title = styled.h1`
	font-size: 24px;
	margin: 20px 0;
	color: #b4e900;
`
export const Label = styled.label`
	font-size: 16px;
	margin: 20px 0 5px 0;
	color: #b4e900;
`
export const Grid2 = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
`
export const Space = styled.div`
	height: 20px;
`

import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import styled from 'styled-components'

interface ChartProps {
	title: string
	data: { name: string; value: number }[]
}

const COLORS = ['#B4E900', '#FF8552', '#7CFEF0', '#ED614E', '#E7CEE3']

export const Title = styled.h1`
	font-size: 24px;
	color: #e1e1e1;
	font-weight: bold;
`

const GridChart = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 15px;
	background: #1f2a30;
	width: 100%;
`

export function Chart({ title, data }: ChartProps) {
	const renderLabel = ({ name }: { name: string }) => {
		return `${name}`
	}

	return (
		<GridChart>
			<Title>{title}</Title>
			<PieChart width={400} height={400} style={{ margin: 0, padding: 0 }}>
				<Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#B4E900" dataKey="value" label={renderLabel}>
					{data.map((_, index) => (
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
							stroke="#1f2a30"
							strokeWidth={3}
						/>
					))}
				</Pie>{' '}
				<Tooltip />
			</PieChart>
		</GridChart>
	)
}

import { Routes, Route } from 'react-router-dom'

import { Dashboard } from '../views/Dashboard'
import { Productors } from '../views/Productors'
import { Properties } from '../views/Properties'
import { Harvests } from '../views/Harvests'

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/productors" element={<Productors />} />
			<Route path="/properties" Component={Properties} />
			<Route path="/harvests" Component={Harvests} />
		</Routes>
	)
}

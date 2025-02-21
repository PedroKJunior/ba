import { Routes, Route } from 'react-router-dom'

import { Dashboard } from '../views/Dashboard'
import { Owners } from '../views/Owners'
import { Properties } from '../views/Properties'
import { Harvests } from '../views/Harvests'

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/owners" element={<Owners />} />
			<Route path="/properties" Component={Properties} />
			<Route path="/harvests" Component={Harvests} />
		</Routes>
	)
}

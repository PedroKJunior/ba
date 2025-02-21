import { BrowserRouter as Router } from 'react-router-dom'

import { GlobalStyle } from './styles/global'

import { Navbar } from './components/Navbar'
import { AppRoutes } from './routes/index.route'

function App() {
	return (
		<>
			<GlobalStyle />
			<Router>
				<Navbar />
				<AppRoutes />
			</Router>
		</>
	)
}

export default App

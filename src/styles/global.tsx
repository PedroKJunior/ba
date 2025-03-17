import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	body {
		font-family: 'Roboto', sans-serif;
		background-color: #0E1315;
		
	}

  	::-webkit-scrollbar {
		width: 3px;
	}
	
	::-webkit-scrollbar-track {
		background: transparent;
	}
	
	::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background: linear-gradient(#87de1d, #b4e900);
	}
`

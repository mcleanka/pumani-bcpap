import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

interface AppContextState {
	flowRate: number,
	setFlowRate: (value: number) => void;
}

const AppContext = createContext<AppContextState>({
	flowRate: 0,
	setFlowRate: () => { },
});

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [flowRate, setFlowRate] = useState(0)

	return (
		<AppContext.Provider value={{ flowRate, setFlowRate }}>
			{children}
		</AppContext.Provider>
	);
};

export default function useApp() {
	return useContext(AppContext)
}

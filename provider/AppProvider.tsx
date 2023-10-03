import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

interface AppContextState {
	flowRate: number,
	setFlowRate: (value: number) => void;
	ageGroup: string,
	setAgeGroup: (value: string) => void;
}

const AppContext = createContext<AppContextState>({
	flowRate: 0,
	setFlowRate: () => { },
	ageGroup: 'child',
	setAgeGroup: () => { },
});

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [flowRate, setFlowRate] = useState(0)
	const [ageGroup, setAgeGroup] = useState('child')

	return (
		<AppContext.Provider value={{ flowRate, setFlowRate, ageGroup, setAgeGroup }}>
			{children}
		</AppContext.Provider>
	);
};

export default function useApp() {
	return useContext(AppContext)
}

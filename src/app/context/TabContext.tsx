'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'
import { TabProps } from '../page'

type TabContextType = {
	tabs: TabProps[]
	setTabs: (tabs: TabProps[]) => void
}

export const TabContext = createContext<TabContextType | undefined>(undefined)

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [tabs, innerSetTabs] = useState<TabProps[]>([])

	useEffect(() => {
		const tabsJSON = localStorage.getItem('tabs')
		if (tabsJSON) innerSetTabs(JSON.parse(tabsJSON))
	}, [])

	const setTabs = (newTabs: TabProps[]) => {
		localStorage.setItem('tabs', JSON.stringify(newTabs))
		innerSetTabs(newTabs)
	}

	return (
		<TabContext.Provider value={{ tabs, setTabs }}>
			{children}
		</TabContext.Provider>
	)
}

export const useTabContext = () => {
	const context = useContext(TabContext)
	if (!context) {
		throw new Error('useTabContext must be used within a TabProvider')
	}
	return context
}

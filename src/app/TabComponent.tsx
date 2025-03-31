'use client'
// import TabContext from '@mui/lab/TabContext'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import LinkTab, { samePageLinkNavigation } from './LinkTab'
import { TabProps } from './page'

export default function TabComponent() {
	const [value, setValue] = React.useState(0)
	const [tabData, setTabData] = React.useState<TabProps[]>([])
	useEffect(() => {
		let storedTabs: TabProps[] = JSON.parse(
			localStorage.getItem('tabs') as string
		)
		setTabData(storedTabs)
		console.log(tabData)
	}, [])

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		if (
			event.type !== 'click' ||
			(event.type === 'click' &&
				samePageLinkNavigation(
					event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
				))
		) {
			setValue(newValue)
		}
		setValue(newValue)
	}
	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label='nav tabs example'
				role='navigation'
			>
				{/* TODO: FIX BUG WITH ROUTING FROM TABS TO HOME */}
				<LinkTab label='Home' href='/' />
				{tabData &&
					tabData.map((tab, key) => (
						<LinkTab key={key} label={tab.title} href={tab.url} />
					))}
			</Tabs>
		</Box>
	)
}

'use client'
// import TabContext from '@mui/lab/TabContext'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LinkTab, { samePageLinkNavigation } from './LinkTab'
import { TabProps } from './page'

export default function TabComponent() {
	const [tabData, setTabData] = useState<TabProps[] | null>(null)
	const [value, setValue] = useState<number>(0)

	useEffect(() => {
		const savedTabs = localStorage.getItem('tabs')
		setTabData(savedTabs ? JSON.parse(savedTabs) : [])
	}, [])

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		if (
			event.type === 'click' ||
			(event.type === 'click' &&
				samePageLinkNavigation(
					event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
				))
		) {
			setValue(newValue + 1)
		}
	}

	if (tabData === null) return null
	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<Tabs
				// slotProps={{
				// 	indicator: {
				// 		sx: {
				// 			top: 0,
				// 		},
				// 	},
				// }}
				selectionFollowsFocus
				sx={{
					'.MuiTabs-indicator': {
						top: 0,
					},
				}}
				value={value}
				onChange={handleChange}
				aria-label='nav tabs example'
				role='navigation'
			>
				{/* TODO: FIX BUG WITH ROUTING FROM TABS TO HOME */}
				<LinkTab label='Home' href='/' />
				{tabData!.length > 0 &&
					tabData!.map((tab, key) => (
						<LinkTab key={key} label={tab.title} href={tab.url} />
					))}
			</Tabs>
		</Box>
	)
}

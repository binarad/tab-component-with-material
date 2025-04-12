'use client'
// import TabContext from '@mui/lab/TabContext'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import LinkTab, { samePageLinkNavigation } from './LinkTab'
import { TabProps } from './page'

import { useTabContext } from './context/TabContext'

export default function TabComponent() {
	const { tabs } = useTabContext()
	const [value, setValue] = useState<number>(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue + 1)
		console.log(newValue)
	}

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<Tabs
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
				{tabs.length > 0 &&
					tabs.map((tab, key) => (
						<LinkTab key={key} label={tab.title} href={tab.url} />
					))}
			</Tabs>
		</Box>
	)
}

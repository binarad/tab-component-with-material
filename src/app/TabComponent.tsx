'use client'
// import TabContext from '@mui/lab/TabContext'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import LinkTab, { samePageLinkNavigation } from './LinkTab'
import { TabProps } from './page'

import { useTabContext } from './context/TabContext'
import { usePathname, useRouter } from 'next/navigation'

export default function TabComponent() {
	const { tabs } = useTabContext()
	const [value, setValue] = useState<number>(0)
	const pathname = usePathname()

	// To-Do: fix bug with indexes.
	useEffect(() => {
		const paths = ['/', ...tabs.map(tab => tab.url)]
		const currentIndex = paths.findIndex(path => path === pathname)

		if (currentIndex !== -1) {
			setValue(currentIndex)
		}
	}, [pathname, tabs])

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<Tabs
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

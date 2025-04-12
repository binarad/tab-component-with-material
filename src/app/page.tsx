'use client'
import { useEffect, useState } from 'react'
import { TextField, Button, Collapse, IconButton } from '@mui/material'
import TabComponent from './TabComponent'
import Alert from '@mui/material/Alert'

import { useTabContext } from './context/TabContext'

export interface TabProps {
	title: string
	url: string
	pinned?: boolean
	active?: boolean
}

export default function Home() {
	const [tabName, setTabName] = useState<string>('')
	const [isTitleNull, setIsTitleNull] = useState<boolean>(false)

	const { tabs, setTabs } = useTabContext()

	const handleAdd = (tab: TabProps) => {
		if (!tab.title.trim()) {
			// TODO: Make better validation
			setIsTitleNull(true)
			setTimeout(() => setIsTitleNull(false), 3000)
			return
		}
		const newTabs = [...tabs, tab]
		setTabs(newTabs)
		setTabName('')
	}

	const handleDeleteTabs = () => {
		setTabs([])
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<Collapse in={isTitleNull} sx={{ width: '350px' }}>
				<Alert severity='warning' sx={{ mb: 2 }}>
					Please enter the tab name
				</Alert>
			</Collapse>
			{/* <h1>Home Page</h1> */}
			<div className='w-2xs m-10 gap-10 flex flex-col items-center justify-center'>
				<form>
					<TextField
						variant='outlined'
						label='Enter the Tab name'
						sx={{
							width: '250px',
							height: '75px',
						}}
						value={tabName}
						onChange={e => setTabName(e.target.value)}
					/>
				</form>

				<Button
					variant='contained'
					onClick={() =>
						handleAdd({
							title: tabName,
							url: `/tabs/${tabName}`.toLowerCase().trim().replace(' ', ''),
						})
					}
					sx={{
						width: '160px',
						height: '50px',
					}}
				>
					Add Tab
				</Button>

				<Button
					variant='outlined'
					sx={{
						width: '160px',
						height: '50px',
					}}
					onClick={handleDeleteTabs}
				>
					Delete All Tabs
				</Button>
			</div>
		</div>
	)
}

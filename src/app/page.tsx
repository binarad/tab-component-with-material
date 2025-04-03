'use client'
import { useEffect, useState } from 'react'
import { TextField, Button, Collapse, IconButton } from '@mui/material'
import TabComponent from './TabComponent'
import Alert from '@mui/material/Alert'

export interface TabProps {
	title: string
	url: string
	pinned?: boolean
	active?: boolean
}

// const saveHistory = () => {
// 	let searchHistoryArray = JSON.parse(localStorage.getItem('tabs') || '[]')

// 	let searchHistory = {
// 		promptKey: prompt,
// 	}

// 	if (prompt.length != 0) {
// 		searchHistoryArray.push(searchHistory)
// 	}

// 	localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray))
// }

export default function Home() {
	const [tabName, setTabName] = useState<string>('')
	const [isTitleNull, setIsTitleNull] = useState<boolean>(false)
	const [tabs, setTabs] = useState<TabProps[]>([])

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

	useEffect(() => {
		const savedTabs = localStorage.getItem('tabs')
		if (savedTabs) {
			setTabs(JSON.parse(savedTabs))
		}
	}, [])

	const handleDeleteTabs = () => {
		setTabs([])
		// tabs = []
		localStorage.removeItem('tabs')
	}

	useEffect(() => {
		if (tabs.length > 0) {
			localStorage.setItem('tabs', JSON.stringify(tabs))
		}
	}, [tabs])

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

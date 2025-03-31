'use client'
import { useEffect, useState } from 'react'
import { TextField, Button, Collapse, IconButton } from '@mui/material'
import TabComponent from './TabComponent'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
export interface TabProps {
	title: string
	url: string
	pinned?: boolean
	active?: boolean
}
export default function Home() {
	const [tabName, setTabName] = useState<string>('')
	const [isTitleNull, setIsTitleNull] = useState<boolean>(false)
	let [tabs, setTabs] = useState<TabProps[]>([])

	const handleAdd = (tab: TabProps) => {
		const newTabs = tabs.slice()
		if (tab.title !== '') {
			// TODO: Make better validation
			newTabs.push(tab)
			setTabs(newTabs)
		} else {
			setIsTitleNull(true)
			setTimeout(() => setIsTitleNull(false), 3000)
		}
	}

	const handleDeleteTabs = () => {
		tabs = []
		localStorage.removeItem('tabs')
	}

	useEffect(() => {
		localStorage.setItem('tabs', JSON.stringify(tabs))
		const storedTabs: TabProps[] = JSON.parse(localStorage.getItem('tabs')!)
		console.log(storedTabs)
	}, [tabs])

	return (
		<div className='flex flex-col items-center justify-center p-5'>
			<TabComponent />
			<Collapse in={isTitleNull} sx={{ width: '350px' }}>
				<Alert severity='warning' sx={{ mb: 2 }}>
					Please enter the tab name
				</Alert>
			</Collapse>
			{/* <h1>Home Page</h1> */}
			<div className='w-2xs m-10 gap-10 flex flex-col items-center justify-center'>
				<TextField
					variant='outlined'
					label='Enter the Tab name'
					sx={{
						width: '250px',
						height: '75px',
					}}
					onChange={e => setTabName(e.target.value)}
				/>

				<Button
					variant='contained'
					onClick={() =>
						handleAdd({
							title: tabName,
							url: `/tabs/${tabName}`.replace(' ', ''),
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

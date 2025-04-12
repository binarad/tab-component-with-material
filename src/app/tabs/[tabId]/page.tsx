import React from 'react'

async function Page({ params }: { params: { tabId: string } }) {
	const { tabId } = await params
	return <div>Tab number: {tabId}</div>
}

export default Page

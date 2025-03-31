import React from 'react'

async function Page({ params }: { params: { tabId: string } }) {
	return <div>Tab number: {params.tabId}</div>
}

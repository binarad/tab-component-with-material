// import { NextRequest, NextResponse } from 'next/server'

// export async function GET() {
// 	const res = await fetch('http://localhost:3001/api/tabItem')
// 	const tabs = await res.json()

// 	return NextResponse.json(tabs)
// }

// export async function POST(request: NextRequest) {
// 	try {
// 		const body = await request.json()

// 		const res = await fetch('http://localhost:3001/tabItem', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},

// 			body: JSON.stringify(body),
// 		})
// 		if (!res.ok) {
// 			throw new Error(
// 				`Failed to fetch the data: ${res.status} -> ${res.statusText}`
// 			)
// 		}
// 		const tab = await res.json()
// 		return NextResponse.json(tab)
// 	} catch (error) {
// 		console.error('Error: ', error)
// 		return NextResponse.json(
// 			{ error: 'Invalid JSON or request failed' },
// 			{ status: 599 }
// 		)
// 	}
// }

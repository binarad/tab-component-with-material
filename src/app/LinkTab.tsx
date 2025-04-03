import Tab from '@mui/material/Tab'
import React from 'react'

interface LinkTabProps {
	label?: string
	href?: string
	selected?: boolean
}
export function samePageLinkNavigation(
	event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
	if (
		event.defaultPrevented ||
		event.button !== 0 || // ignore everything but left-click
		event.metaKey ||
		event.ctrlKey ||
		event.altKey ||
		event.shiftKey
	) {
		return false
	}
	return true
}

export default function LinkTab(props: LinkTabProps) {
	return (
		<Tab component='a' aria-current={props.selected && 'page'} {...props} />
	)
}

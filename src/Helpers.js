
export function getScrollParent(el, className) {
	while (el.className !== className) {
		el = el.parentNode;
		if (!el) {
			return null;
		}
	}

	return el;
}


export function isWaypointVisible(container, waypoint) {
	const containerRect = container.getBoundingClientRect();
	const waypointRect = waypoint.getBoundingClientRect();

	return waypointRect.top < container.offsetHeight + containerRect.top;
}

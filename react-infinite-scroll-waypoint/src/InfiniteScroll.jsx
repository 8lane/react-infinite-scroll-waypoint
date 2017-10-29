import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getScrollParent, isWaypointVisible, spinner } from './Helpers';

class InfiniteScroll extends Component {
	constructor(props) {
		super(props);

		this.scrollListener = this.scrollListener.bind(this);
	}

	componentDidMount() {
		this.attachScrollListener();
	}

	componentWillUnmount() {
		this.detachScrollListener();
	}

	attachScrollListener() {
		this.scrollElement = getScrollParent(this.scrollComponent, this.props.scrollElementName);
		this.scrollElement.addEventListener('scroll', this.scrollListener);
		this.scrollElement.addEventListener('resize', this.scrollListener);
	}

	detachScrollListener() {
		this.scrollElement.removeEventListener('scroll', this.scrollListener);
		this.scrollElement.removeEventListener('resize', this.scrollListener);
	}
	
	scrollListener() {
		const { currentPage, clickToUpdate, hasMore, loading, onUpdate } = this.props;
		const isVisible = isWaypointVisible(this.scrollElement, this.waypointNode);
		
		if (!loading && !clickToUpdate && hasMore && isVisible) {
			onUpdate(currentPage + 1);
		}
	}

	render() {
		const {
			loading,
			externalSpinner,
			children,
			className,
			clickToUpdate,
			clickToUpdateBtnClassName,
			clickToUpdateBtnLabel,
			currentPage,
			componentTagName: CustomTag,
			waypointTagName: CustomWaypointTag,
			waypointClassName,
			onUpdate,
		} = this.props;

		const loadingSpinner = spinner();

		return (
			<div
				ref={node => {
					this.scrollComponent = node;
				}}
				className={className}
			>
				{children}

				{!externalSpinner && loading ?
					<div className="infinite-scroll__loader">{loadingSpinner}</div>
				: null}

				{!clickToUpdate &&
					<CustomWaypointTag
						ref={node => {
							this.waypointNode = node;
						}}
						className={waypointClassName}
						style={{ display: 'inline-block' }}
					/>
				}

				{clickToUpdate &&
					<button
						ref={node => {
							this.waypointNode = node;
						}}
						className={clickToUpdateBtnClassName}
						disabled={loading}
						onClick={() => onUpdate(currentPage + 1)}>
						{clickToUpdateBtnLabel}
					</button>
				}
			</div>
		)
	}
}

export default InfiniteScroll;

InfiniteScroll.defaultProps = {
	className: 'infinite-scroll',
	hasMore: true,
	currentPage: 1,
	clickToUpdate: false,
	clickToUpdateBtnClassName: 'infinite-scroll__update-cta',
	clickToUpdateBtnLabel: 'Load more...',
	componentTagName: 'div',
	waypointTagName: 'span',
	waypointClassName: 'infinite-scroll__waypoint',
	externalSpinner: false
};

InfiniteScroll.propTypes = {
	children: PropTypes.element,
	onUpdate: PropTypes.func.isRequired,
	scrollElementName: PropTypes.string.isRequired,
	hasMore: PropTypes.bool,
	currentPage: PropTypes.number,
	className: PropTypes.string,
	clickToUpdate: PropTypes.bool,
	clickToUpdateBtnClassName: PropTypes.string,
	clickToUpdateBtnLabel: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	componentTagName: PropTypes.string,
	waypointTagName: PropTypes.string,
	waypointClassName: PropTypes.string
};

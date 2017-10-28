import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getScrollParent, isWaypointVisible, spinner } from './Helpers';

class InfiniteScroll extends Component {
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

	}

	scrollListener = () => {
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
			componentTagName: CustomTag,
			waypointTagName: CustomWaypointTag,
			waypointClassName
		} = this.props;

		const loadingSpinner = spinner();

		return (
			<CustomTag
				ref={node => {
					this.scrollComponent = node;
				}}
				className={`infinite-scroll ${className}`}
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
					/>}
			</CustomTag>
		)
	}

	// render() {
	// 	const {
	// 		children,
	// 		currentPage,
	// 		loading,
	// 		className,
	// 		clickToUpdate,
	// 		clickToUpdateBtn,
	// 		componentTagName: CustomTag,
	// 		waypointTagName: CustomWaypointTag,
	// 		waypointClassName,
	// 		onUpdate,
	// 		externalSpinner
	// 	} = this.props;

	// 	return (
	// 		<CustomTag
	// 			ref={node => {
	// 				this.scrollComponent = node;
	// 			}}
	// 			className={`infinite-scroll ${className}`}>
	// 			{children}

	// 			{!externalSpinner && loading && children.length > 0 && 'loading...'}

	// 			{!clickToUpdate &&
	// 				<CustomWaypointTag
	// 					ref={node => {
	// 						this.waypointNode = node;
	// 					}}
	// 					className={waypointClassName}
	// 					style={{ display: 'inline-block' }}
	// 				/>}

	// 			{children.length > 0 &&
	// 				clickToUpdate &&
	// 				<button
	// 					ref={node => {
	// 						this.waypointNode = node;
	// 					}}
	// 					className={waypointClassName}
	// 					disabled={loading}
	// 					onClick={() => onUpdate(currentPage + 1)}>
	// 					{clickToUpdateBtn}
	// 				</button>}
	// 		</CustomTag>
	// 	);
	// }
}

export default InfiniteScroll;

InfiniteScroll.defaultProps = {
	className: 'infinite-scroll',
	hasMore: true,
	currentPage: 1,
	clickToUpdate: false,
	clickToUpdateBtn: 'Load more...',
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
	clickToUpdateBtn: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	componentTagName: PropTypes.string,
	waypointTagName: PropTypes.string,
	waypointClassName: PropTypes.string
};

import React from 'react';
import { shallow, mount } from 'enzyme';

import InfiniteScroll from './InfiniteScroll';
import { getScrollParent, isWaypointVisible } from './Helpers';

jest.mock('./Helpers');

describe('when setting up an infinite scroll area', () => {
	let infiniteScrollComponent;
	let attachScrollListenerSpy;
	let addEventListener = jest.fn();

	beforeAll(() => {
		getScrollParent.mockImplementation(() => ({ addEventListener }));
		attachScrollListenerSpy = jest.spyOn(InfiniteScroll.prototype, 'attachScrollListener');
		infiniteScrollComponent = shallow(<InfiniteScroll scrollElementName="uareadiv" loading={false} onUpdate={jest.fn()} />);
	});

	it('should attach scroll listeners', () => {
		expect(attachScrollListenerSpy).toHaveBeenCalled();
	});
});

describe('when attaching scrolling and resizing listeners', () => {
	let infiniteScrollComponent;
	let addEventListener = jest.fn();
	let scrollListener = jest.fn();

	beforeAll(() => {
		getScrollParent.mockImplementation(() => ({ addEventListener }));
		infiniteScrollComponent = shallow(<InfiniteScroll scrollElementName="uareadiv" loading={false} onUpdate={jest.fn()} />);
		infiniteScrollComponent.instance().scrollListener = scrollListener;
		infiniteScrollComponent.instance().attachScrollListener();
	});

	it('should listen for scrolling', () => {
		expect(addEventListener).toHaveBeenCalledWith('scroll', scrollListener);
	});

	it('should listen for resizing', () => {
		expect(addEventListener).toHaveBeenCalledWith('resize', scrollListener);
	});
});

describe('when navigating away from an infinite scroll area', () => {
	let infiniteScrollComponent;
	let detachScrollListenerSpy;
	let addEventListener = jest.fn();

	beforeAll(() => {
		getScrollParent.mockImplementation(() => ({ addEventListener }));
		detachScrollListenerSpy = jest.spyOn(InfiniteScroll.prototype, 'attachScrollListener');
		infiniteScrollComponent = shallow(<InfiniteScroll scrollElementName="uareadiv" loading={false} onUpdate={jest.fn()} />);
	});


	it('should unattach scroll listeners', () => {
		expect(detachScrollListenerSpy).toHaveBeenCalled();
	});
});

describe('when unnattaching the scroll and resize listeners', () => {
	let infiniteScrollComponent;
	let addEventListener = jest.fn();
	let removeEventListener = jest.fn();
	let scrollListener = jest.fn();

	beforeAll(() => {
		getScrollParent.mockImplementation(() => ({ addEventListener, removeEventListener }));
		infiniteScrollComponent = shallow(<InfiniteScroll scrollElementName="uareadiv" loading={false} onUpdate={jest.fn()} />);
		infiniteScrollComponent.instance().scrollListener = scrollListener;
		infiniteScrollComponent.instance().detachScrollListener();
	});

	it('should stop listening for scrolling', () => {
		expect(removeEventListener).toHaveBeenCalledWith('scroll', scrollListener);
	});

	it('should stop listening for resizing', () => {
		expect(removeEventListener).toHaveBeenCalledWith('resize', scrollListener);
	});
});

describe('when the waypoint is visible in the scroll area', () => {
	let infiniteScrollComponent;
	let onUpdate;

	beforeAll(() => {
		onUpdate = jest.fn();

		isWaypointVisible.mockImplementation(() => true);

		infiniteScrollComponent = shallow(
			<InfiniteScroll
				scrollElementName="uareadiv"
				loading={false}
				clickToUpdate={false}
				hasMore={true}
				currentPage={12}
				onUpdate={onUpdate}
			/>
		);

		infiniteScrollComponent.instance().scrollListener();
	});

	it('should load more items', () => {
		expect(onUpdate).toHaveBeenCalledWith(13);
	});

	describe('and new items are being loaded', () => {
		beforeAll(() => {
			onUpdate = jest.fn();

			infiniteScrollComponent = shallow(
				<InfiniteScroll
					scrollElementName="uareadiv"
					loading={true}
					clickToUpdate={false}
					hasMore={true}
					currentPage={13}
					onUpdate={onUpdate}
				/>
			);

			infiniteScrollComponent.update();
			infiniteScrollComponent.instance().scrollListener();
		});

		it('should not load more items', () => {
			expect(onUpdate).not.toHaveBeenCalled();
		});
	});

	describe('and manual item loading is enabled', () => {
		beforeAll(() => {
			onUpdate = jest.fn();

			infiniteScrollComponent = shallow(
				<InfiniteScroll
					scrollElementName="uareadiv"
					loading={false}
					clickToUpdate={true}
					hasMore={true}
					currentPage={13}
					onUpdate={onUpdate}
				/>
			);

			infiniteScrollComponent.instance().scrollListener();
		});

		it('should not load more items', () => {
			expect(onUpdate).not.toHaveBeenCalled();
		});
	});

	describe('and there are not more items to load', () => {
		beforeAll(() => {
			onUpdate = jest.fn();

			infiniteScrollComponent = shallow(
				<InfiniteScroll
					scrollElementName="uareadiv"
					loading={false}
					clickToUpdate={true}
					hasMore={false}
					currentPage={13}
					onUpdate={onUpdate}
				/>
			);

			infiniteScrollComponent.instance().scrollListener();
		});

		it('should not load more items', () => {
			expect(onUpdate).not.toHaveBeenCalled();
		});
	});
});

describe('when display an infinite scroll area', () => {
	let infiniteScrollComponent;

	beforeAll(() => {
		infiniteScrollComponent = mount(
			<InfiniteScroll
				className="dayum"
				componentTagName="sicknewhtml5tag"
				waypointTagName="span"
				waypointClassName="waypoint"
				scrollElementName="uareadiv"
				loading={false}
				clickToUpdate={false}
				onUpdate={jest.fn()}
			><span>stuff to scroll inside!</span></InfiniteScroll>);
	});

	it('should display content within the scroll area', () => {
		expect(infiniteScrollComponent.text().includes('stuff to scroll inside!')).toBeTruthy();
	});

	it('should have a custom html tag', () => {
		expect(infiniteScrollComponent.find('sicknewhtml5tag')).toHaveLength(1);
	});

	it('should have a custom class name', () => {
		expect(infiniteScrollComponent.find('sicknewhtml5tag.dayum').exists()).toBeTruthy();
	});

	it('should have an invisible waypoint element', () => {
		expect(infiniteScrollComponent.find('span.waypoint').exists()).toBeTruthy();
	});
});

describe('when loading new items into an infinite scroll area', () => {
	let infiniteScrollComponent;

	beforeAll(() => {
		infiniteScrollComponent = mount(
			<InfiniteScroll
				className="dayum"
				componentTagName="sicknewhtml5tag"
				waypointTagName="span"
				waypointClassName="waypoint"
				scrollElementName="uareadiv"
				loading={true}
				clickToUpdate={false}
				externalSpinner={false}
				onUpdate={jest.fn()}
			><span>stuff to scroll inside!</span></InfiniteScroll>);
	});

	describe('and an external spinner is not being used', () => {
		it('should display a spinner', () => {
			expect(infiniteScrollComponent.find('.infinite-scroll__loader').exists()).toBeTruthy();
		});
	});

	describe('and an external spinner is being used', () => {
		beforeAll(() => {
			infiniteScrollComponent.setProps({ externalSpinner: true });
			infiniteScrollComponent.update();
		});

		it('should not display loading text', () => {
			expect(infiniteScrollComponent.find('.infinite-scroll__loader').exists()).toBeFalsy();
		});
	});
});
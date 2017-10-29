import raf from './polyfill';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;


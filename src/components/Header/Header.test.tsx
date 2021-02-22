import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Header from './Header';
import {findByTestAttr} from '../../Utils';

const setUp = (props={}) => {
    const component = shallow(<Header {...props}/>);
    return component;
};

describe('Header Component', () => {

    let component: ShallowWrapper<any, Readonly<{}>>;
    beforeEach(() => {
        component = setUp();
    })

    it('Should render without errors', () => {
        const wrapper = findByTestAttr(component, 'header');
        expect(wrapper.length).toBe(1);
    })

    it("should render a logo", () => {
        const logo = findByTestAttr(component, 'logo');
        expect(logo.length).toBe(1);
    })

})
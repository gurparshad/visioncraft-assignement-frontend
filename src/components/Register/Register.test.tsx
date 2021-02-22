import React from 'react';
import Register from './Register';
import {shallow} from 'enzyme';

describe('Register component', () => {
    it('fill up the form and submit', () => {

        const wrapper = shallow(<Register/>);
        console.log(wrapper);
        let firstNameInput = wrapper.find('input').first();
        firstNameInput.simulate('change', {
            target: {value: 'jack'},
        })
        firstNameInput = wrapper.find('input').first();
        expect(firstNameInput.props().value).toEqual('jack')
    })
})
import React from 'react';
import { shallow } from 'enzyme';
import Edit_document_expire from './edit_document_expire';

describe('Edit_document_expire', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Edit_document_expire />);
    expect(wrapper).toMatchSnapshot();
  });
});

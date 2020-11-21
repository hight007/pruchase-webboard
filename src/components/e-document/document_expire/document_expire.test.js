import React from 'react';
import { shallow } from 'enzyme';
import Document_expire from './document_expire';

describe('Document_expire', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Document_expire />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Document_expire_month from './document_expire_month';

describe('Document_expire_month', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Document_expire_month />);
    expect(wrapper).toMatchSnapshot();
  });
});

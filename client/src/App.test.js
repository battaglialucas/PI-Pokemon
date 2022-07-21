import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from './componentes/LandingPage';

configure({adapter: new Adapter()});

describe('<LandingPage />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<LandingPage />)
  })

  it('Deberia renderizar un <Link /> que te dirija al home', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/home');
  });
  
})
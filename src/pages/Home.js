import React, {
  // useContext,
  useEffect
} from "react";
import PropTypes from "prop-types";
import {
  // capitalize,
  useTheme
} from '@material-ui/core';

import Head from "../sections/Head";
import Feature from "../sections/Feature";
import Pricing from "../sections/Pricing";

import Section from '../components/navigation/Section';
import About from '../sections/About';
import Portfolio from '../sections/Portfolio';
// import Resume from '../sections/Resume';

import P5Background from '../components/backgrounds/p5/P5Background';
// import HilbertMorph from '../components/backgrounds/HilbertMorph';
// import CirclePacking from '../components/backgrounds/CirclePacking';
import ParallaxSnow from '../components/backgrounds/ParallaxSnow';
import { Wave as WaveFooter } from '../components/footers/Wave';
import { Wave as WaveHeader } from '../components/headers/Wave';

// import { SectionContexts } from '../components/theming/context/SectionContext';
// import { ParallaxSnow } from "../components/backgrounds";

function Home(props) {
  const { selectHome } = props;
  const theme = useTheme();

  // const sectionNames = [
  //   "home",
  //   "about",
  //   "portfolio",
  //   "resume",
  //   "feature",
  //   "services",
  // ];
  // const sectionData = {
  //   home: {
  //     children: Head,
  //     index: 0,
  //   },
  //   about: {
  //     children: About,
  //     index: 1,
  //   },
  //   portfolio: {
  //     children: Portfolio,
  //     index: 2,
  //   },
  //   // resume: {
  //     // children: Resume,
  //     // index: 3,
  //   // },
  //   feature: {
  //     children: Feature,
  //     index: 4,
  //   },
  //   services: {
  //     children: Pricing,
  //     index: 5,
  //   },
  // };
  // let sectionElements = [];

  // const sections = Object.keys(sectionData).map(name => {
  //   const { children, index, } = sectionData[name];
  //   return (
  //     <Section name={capitalize(name)} index={index}>
  //       {children}
  //     </Section>
  //   );
  // });

  useEffect(() => {
    selectHome();
  }, [selectHome]);

  return (
    <>
      {/* <Section
        name="test"
      ><p>Hi</p></Section> */}
      <Section
        name="Home"
        // background={<P5Background sketch='Terrain' />}
        // background={<P5Background sketch='Wavy' />}
        // header={
        //   <WaveHeader
        //     upperColor={theme.palette.primary.main}
        //     lowerColor={theme.palette.background.light}
        //     animationNegativeDelay={4}
        //     padding={100}
        //     leftToRight={true}
        //   />
        // }
        footer={
          <WaveFooter
            upperColor={theme.palette.background.light}
            lowerColor={theme.palette.primary.main}
            animationNegativeDelay={4}
            padding={100}
          />
        }
      >
        <Head />
      </Section>
      <Section
        name="About"
        header={<WaveHeader />}
        background={<P5Background sketch='DVDMenu'/>}
        footer={<WaveFooter />}
      >
        <About />
      </Section>
      <Section
        name="Portfolio"
        background={<ParallaxSnow />}
        header={<WaveHeader />}
      >
        <Portfolio />
      </Section>
      {/* <Section */}
        {/* name="Resume" */}
      {/* > */}
        {/* <Resume /> */}
      {/* </Section> */}
      <Section name="Feature"><Feature /></Section>
      <Section name="Services"><Pricing /></Section>
    </>
  );
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;

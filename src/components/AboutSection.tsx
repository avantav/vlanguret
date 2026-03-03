import AboutSectionClient from './AboutSectionClient';
import { staticTeamMembers } from '@/lib/teamMembers';

const AboutSection = () => {
  // Use static team members with local photos
  return <AboutSectionClient displayMembers={staticTeamMembers} />;
};

export default AboutSection;

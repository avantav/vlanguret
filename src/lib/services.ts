import { client, queries } from './sanity';
import { Project, ProjectCategory, Testimonial, TeamMember } from '@/types';

// Project Categories
export async function getProjectCategories(): Promise<ProjectCategory[]> {
  try {
    const categories = await client.fetch(queries.projectCategories);
    return categories;
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return [];
  }
}

// All Projects
export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(queries.projects);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Featured Projects
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(queries.featuredProjects);
    return projects;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// Projects by Category
export async function getProjectsByCategory(categorySlug: string): Promise<Project[]> {
  try {
    const projects = await client.fetch(queries.projectsByCategory, { categorySlug });
    return projects;
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
}

// Single Project
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(queries.project, { slug });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await client.fetch(queries.testimonials);
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const teamMembers = await client.fetch(queries.teamMembers);
    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

// Static data for services (since we're not using Sanity for this yet)
export const getServices = () => {
  return [
    {
      id: 'full-service',
      title: 'FULL SERVICE DESIGN',
      description: 'From initial meetings to concepts and execution, we guide the way to navigate the design and construction process to get your project built. We see every project through to completion to guarantee a quality building or space for our clients. Build your dream project, and enjoy the journey.',
      image: 'https://static.wixstatic.com/media/11062b_1232b8130b0644f9ab3d5ba4bf33d335~mv2_d_3757_2500_s_4_2.jpg',
      imageAlt: 'Full Service Design - Modern bathroom with glass shower and vanity'
    },
    {
      id: 'cabinets',
      title: 'CABINETS',
      description: 'Cabinets and Installation. We offer a wide variety of selections available to fit any style you have in mind with custom cabinets as well as prefab boxes to fit every budget',
      image: 'https://static.wixstatic.com/media/nsplsh_6ad5e466b5954ff69f6ce0669795934f~mv2.jpg',
      imageAlt: 'Custom kitchen cabinets with warm wood tones'
    },
    {
      id: 'countertops',
      title: 'COUNTERTOPS',
      description: 'Countertops for your every need! We got you. Distributor of all major stone and quartz manufactures with an amazing installation team.',
      image: 'https://static.wixstatic.com/media/11062b_bab3ea519fbb4135b76de2799917940d~mv2.jpg',
      imageAlt: 'Professional countertop installation with level and tools'
    },
    {
      id: 'flooring',
      title: 'FLOORING',
      description: 'Flooring might seem like an expensive and complicated job, but no matter what project you have in mind, trust my team to help you bring your vision to life.',
      image: 'https://static.wixstatic.com/media/11062b_b2cc9ff833c544fb929df56635ed6cb3~mv2.jpg',
      imageAlt: 'Chevron pattern flooring with wooden cabinet base'
    },
    {
      id: 'construction',
      title: 'CONSTRUCTION',
      description: 'We can bring the home of your dreams to reality',
      image: 'https://static.wixstatic.com/media/11062b_51e91128999a46b9b1a291744d7d1a6a~mv2.jpg',
      imageAlt: 'Construction site with wooden framing and windows'
    }
  ];
};

// Photo type for testimonials
interface TestimonialPhoto {
  url: string;
  alt?: string;
}

// Static testimonials data from Google Reviews (20 total reviews, all 5 stars)
export const getStaticTestimonials = () => {
  return [
    {
      _id: '1',
      clientName: 'Tessa Arias',
      content: 'It was such a delight to work with the Vlanguret team! They worked with my already-hired designer on the construction side, and I\'ve never had a renovation project be so organized and finish so quickly. Azu and Christian were a dream team — friendly, detailed, professional, responsive, and trustworthy. The exact opposite of most contractors and builders, who can be evasive, scattered, and always delayed. Vlanguret set the bar HIGH! I\'ve already recommended them to multiple friends & family. Thank you for making my dream home a reality!',
      date: '1 month ago',
      photoCount: 12,
      photos: [] as TestimonialPhoto[],
      order: 1
    },
    {
      _id: '2',
      clientName: 'Lesley McCoy',
      content: 'Thank you Azu and Christian for the design and construction of my new kitchen! You made an overwhelming project fun, and I enjoyed working with your whole team! Everyone you sent to my home was respectful and professional. The team quickly addressed any questions or concerns I had, and you finished the project on time! I would highly recommend Vlanguret Design Build to anybody looking to remodel their home.',
      date: '8 months ago',
      photoCount: 6,
      photos: [] as TestimonialPhoto[],
      order: 2
    },
    {
      _id: '3',
      clientName: 'Sadimira Hadzic',
      content: 'It was a pleasure working with the whole Vlanguret Design team. You guys made our dream bathroom come true. Any questions that we had, you were quick to respond and made the whole process so easy. What team work!!!! You listened closely to what we wanted and made it happen! We are looking forward to working with you in the near future! If anyone is looking for remodeling we highly recommend Vlanguret Design!!! Thank you!!!',
      date: '6 months ago',
      photoCount: 3,
      photos: [] as TestimonialPhoto[],
      order: 3
    },
    {
      _id: '4',
      clientName: 'Catherine McCreary',
      content: 'Vlanguret Design/Build is A+! They recently renovated our entire kitchen, dining, family room, and did AMAZING work - they took our home from a dated feel and weird layout, and turned it into a very inspiring, glamorous, comfortable and ergonomic home! Our guests who come over are always astonished with how amazing it is. Vlanguret\'s team did great work - they took out a fireplace, added a bar, changed our entire kitchen layout, removed windows, added a new door, updated the floors, and added more storage while somehow making our space look bigger. Their work is top-notch with attention to detail, their team is fast, and they are easy to communicate with. The whole process was a great collaboration between our personal needs and taste, and Azu\'s artistic vision and technical execution. I love that they have expert opinions about what will work well and what won\'t, both looks-wise and function-wise. They have great taste in good quality materials. I am thrilled to spend time in our home every day after Vlanguret\'s team did their magic!',
      date: '2 years ago',
      photoCount: 6,
      photos: [] as TestimonialPhoto[],
      order: 4
    },
    {
      _id: '5',
      clientName: 'Heather Gray',
      content: 'Azucena and her team were phenomenal. We used the Vlanguret team for our kitchen remodel with a 5\' addition to the back of the home and new flooring throughout. During our first meeting, Azucena had great, creative ideas that we hadn\'t thought of for the remodel and new layout of the kitchen. She worked with our budget to get us a phenomenal final product. Communication was easy and they were very responsive. It was so nice having the designer and contractor the same person. They will be the company I call for any other home remodeling/contracting need I have in the future.',
      date: '2 years ago',
      photoCount: 2,
      photos: [] as TestimonialPhoto[],
      order: 5
    },
    {
      _id: '6',
      clientName: 'Nathan Gonzalez',
      content: 'The wife and I had contemplated a large house remodel (converting carport to garage, new kitchen and master bedroom, bath and closet) for many years. After a long search, we found Vlanguret Design Build. Azu, Christian and their entire team walked us through the project, took our many suggestions and rebuilt the home of our dreams from inside out. Sure there were a few bumps here and there, but their team was highly responsive and fixed any issues we brought up. Ours was a 10-month journey (we touched and expanded the entire house), but their team made our home even more perfect and we look forward to future memories in our home.',
      date: '1 year ago',
      photoCount: 1,
      photos: [] as TestimonialPhoto[],
      order: 6
    },
    {
      _id: '7',
      clientName: 'Good Works Auto Repair',
      content: 'Stunning Bathroom Transformation – Thank You, Vlanguret Design Build! After inheriting my mother\'s house and not realizing we would be living in it, we never got around to changing the bathroom vanities. But after a couple of the sinks cracked, we knew it was time to call Vlanguret Design Build. We have used Suzy before and absolutely love her work, so we knew we were in great hands! The transformation is incredible—the dark, outdated space is now bright, modern, and functional. The new cabinetry, elegant lighting, and stylish mirrors make such a difference. Plus, the added storage and sleek finishes have completely elevated the space. Suzy\'s craftsmanship and attention to detail are unmatched. We couldn\'t be happier with the results—thank you, Suzy and team, for another amazing job! Highly recommend Vlanguret Design Build to anyone looking to upgrade their home!',
      date: '9 months ago',
      photoCount: 3,
      photos: [] as TestimonialPhoto[],
      order: 7
    },
    {
      _id: '8',
      clientName: 'Ingrid Ahlstrom',
      content: 'VLanguret renovated my kitchen and bathroom, and put in new flooring. They did an excellent job. Loved the attention to detail and the chance to see the design prior to ordering any materials. Her team is friendly, professional, and easy to work with. Great customer service. Highly recommend them to others!',
      date: '2 years ago',
      photoCount: 0,
      photos: [] as TestimonialPhoto[],
      order: 8
    },
    {
      _id: '9',
      clientName: 'Lucas Gayda',
      content: 'We reached out to Azu for a kitchen remodel, and though we had to postpone the project, our brief time working with her was a great experience in itself. Her and her team can move very quickly, and within a week or two we had a full outline of the proposed project, as well as beautiful renderings of the planned remodel. Very much looking forward to finding an opportunity to work with her team in the future!',
      date: '1 year ago',
      photoCount: 0,
      photos: [] as TestimonialPhoto[],
      order: 9
    },
    {
      _id: '10',
      clientName: 'Mayra Cervantes',
      content: 'Worked with Vlanguret Design team to have vinyl flooring installed in the second floor of my condo. The team did an amazing job. They were fast, reliable, and very clean! I highly recommend working with them.',
      date: '2 years ago',
      photoCount: 3,
      photos: [] as TestimonialPhoto[],
      order: 10
    },
    {
      _id: '11',
      clientName: 'Faisal Halis',
      content: 'Wonderful experience with Susy and her team. Hired Vlanguret to complete a kitchen and bath remodel, where they installed tile flooring, quartz countertops, back splash and bathroom plumbing fixtures. The workmanship was outstanding, the project was completed on time, pricing was competitive, and it was easy to communicate with Susy throughout the process. We will definitely be hiring Vlanguret for our next home project.',
      date: '3 years ago',
      photoCount: 1,
      photos: [] as TestimonialPhoto[],
      order: 11
    },
    {
      _id: '12',
      clientName: 'Gloria Tornel',
      content: 'Highly recommend Vlanguret company! It\'s an amazing, professional and reliable team. Loved all their design ideas for my condo, so easy to communicate with the crew, I am very happy with the services and attention! I am definitely using their service and knowledge in the future.',
      date: '2 years ago',
      photoCount: 0,
      photos: [] as TestimonialPhoto[],
      order: 12
    },
    {
      _id: '13',
      clientName: 'Ernesto Gandara',
      content: 'We worked with Azucena Vidal (Susy) to design and remodel our kitchen and we couldn\'t be more pleased with her personalized attention and services. We love our kitchen and we get compliments on it all the time. Her quote was also really fairly priced. We highly recommend her and her crew. We will be coming back for our bathrooms soon.',
      date: '3 years ago',
      photoCount: 2,
      photos: [] as TestimonialPhoto[],
      order: 13
    },
    {
      _id: '14',
      clientName: 'Rob B',
      content: 'I\'ve worked with them on numerous projects now. They\'re always a pleasure to work with.',
      date: '7 months ago',
      photoCount: 0,
      photos: [] as TestimonialPhoto[],
      order: 14
    },
    {
      _id: '15',
      clientName: 'Alain Uribe',
      content: 'Loved her job! Really professional and caring. I highly recommend this company.',
      date: '3 years ago',
      photoCount: 0,
      photos: [] as TestimonialPhoto[],
      order: 15
    },
  ];
};

// Total Google Reviews count (includes reviews without text)
export const TOTAL_GOOGLE_REVIEWS = 20;

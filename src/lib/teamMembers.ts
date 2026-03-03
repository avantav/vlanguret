// Static team members data with local photos
export interface StaticTeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl: string;
  order: number;
}

export const staticTeamMembers: StaticTeamMember[] = [
  {
    _id: 'azucena',
    name: 'Azucena Vidal Languret',
    role: 'Founder and Principal Designer',
    bio: 'Founder and principal designer of VLanguret Design Build LLC with over 13 years of experience in design, remodel and construction.',
    photoUrl: '/members/Azucena Languret.jpg',
    order: 1,
  },
  {
    _id: 'christian',
    name: 'Christian Di Michele',
    role: 'Lead Project Manager',
    bio: 'As a Lead Project Manager at Vlanguret Design Build, communication is at the core of my role. I serve as the main point of contact for clients, keeping them informed of project status, progress, and any updates or changes. By maintaining open and proactive communication, I help build trust and ensure that clients feel confident and informed throughout the entire process.',
    photoUrl: '/members/ChristianDiMichelle.jpg',
    order: 2,
  },
  {
    _id: 'lucia',
    name: 'Lucia Vidal Languret',
    role: 'HR & Financial Operations',
    bio: 'Oversees payroll, employee administration, and key financial processes. Collaborates closely with leadership and project teams to ensure compliance, accuracy, and well-structured operations that support sustainable growth.',
    photoUrl: '/members/Lucia Vidal.jpg',
    order: 3,
  },
  {
    _id: 'vanessa',
    name: 'Vanessa Ruiz Morales',
    role: 'Business Operations Coordinator',
    bio: 'Leads cost estimation, procurement oversight, and expense monitoring. Her proactive approach to financial management helps optimize project budgets, limit cost exposure, and ensure reliable final cost reporting.',
    photoUrl: '/members/Vanessa.jpg',
    order: 4,
  },
  {
    _id: 'lorena',
    name: 'Lorena Rosas',
    role: 'Interior Designer',
    bio: 'With over six years of experience in residential and commercial design and an architectural background, Lorena leads the design phase from initial concept through final layouts, furniture, and material selections. Her favorite part is seeing spaces come to life and the emotion clients feel when they experience their finished project.',
    photoUrl: '/members/Lorena Rosas.jpg',
    order: 5,
  },
  {
    _id: 'fernanda',
    name: 'Fernanda Leon',
    role: 'Architectural Drafter & Renderer',
    bio: 'Creates detailed production drawings that translate design concepts into buildable documentation. Ensures project supervisors and subcontractors have accurate information to execute projects correctly. Also develops 3D models and renderings for coordination and decision-making.',
    photoUrl: '/members/Fernanda Leon.jpg',
    order: 6,
  },
  {
    _id: 'alba',
    name: 'Alba Luz Diaz',
    role: 'Assistant Project Manager',
    bio: 'Dedicated to creating beautiful and functional spaces.',
    photoUrl: '/members/Alba Luz.jpg',
    order: 7,
  },
  {
    _id: 'paulina',
    name: 'Paulina Quevedo',
    role: 'Architectural Drafter Intern',
    bio: 'Architecture graduate contributing to design development and technical documentation. Combines creativity, practicality, and attention to detail, creating spaces that allow people to express meaning and identity through interior design.',
    photoUrl: '/members/Paulina.jpg',
    order: 8,
  },
];

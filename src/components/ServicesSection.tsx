import Image from 'next/image';
import { Service } from '@/types';

const services: Service[] = [
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

const ServicesSection = () => {
  return (
    <section className="py-20 bg-wood-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-wood-800 mb-4">
            SERVICES
          </h2>
          <p className="font-serif text-xl text-wood-600 max-w-3xl mx-auto">
            Comprehensive design and construction services to bring your vision to life
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              {/* Image */}
              <div className="flex-1 relative">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-wood-800">
                  {service.title}
                </h3>
                <p className="font-sans text-lg text-wood-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-4">
                  <div className="w-20 h-1 bg-wood-400 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

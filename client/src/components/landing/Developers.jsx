import { Github, ExternalLink } from 'lucide-react';

const developers = [
  {
    name: 'Paras Bhardwaj',
    summary: 'Full-stack Developer building something meaningful, one step at a time.',
    image: 'https://portfolio-psi-gray-55.vercel.app/paras.png',
    portfolio: 'https://portfolio-psi-gray-55.vercel.app/',
    github: 'https://github.com/parasbhardwaj77'
  },
  {
    name: 'Tejasvi Vermani',
    summary: 'Software Engineer trying to make a difference in the world.',
    image: 'https://pbs.twimg.com/profile_images/1821790227632930816/8zl7iHaZ_400x400.jpg',
    portfolio: 'https://portfolio-tejasvi.vercel.app/',
    github: 'https://github.com/tejasvi001'
  }
];

export default function Developers() {
  return (
    <section id="developers" className="py-24 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Developers Who Made This Possible
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* First Developer Card - Image Left */}
          <div className="flex-1 bg-white dark:bg-dark-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image on Left */}
              <div className="lg:w-1/3 w-full h-64 lg:h-auto flex items-center justify-center p-8">
                <img 
                  src={developers[0].image} 
                  alt={developers[0].name}
                  className="w-48 h-48 rounded-full object-cover"
                />
              </div>
              
              {/* Content on Right */}
              <div className="lg:w-2/3 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {developers[0].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {developers[0].summary}
                </p>
                <div className="flex gap-4">
                  <a 
                    href={developers[0].portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-semibold">Portfolio</span>
                  </a>
                  <a 
                    href={developers[0].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span className="font-semibold">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Developer Card - Image Right */}
          <div className="flex-1 bg-white dark:bg-dark-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex flex-col lg:flex-row-reverse">
              {/* Image on Right */}
              <div className="lg:w-1/3 w-full h-64 lg:h-auto flex items-center justify-center p-8">
                <img 
                  src={developers[1].image} 
                  alt={developers[1].name}
                  className="w-48 h-48 rounded-full object-cover scale-x-[-1]"
                />
              </div>
              
              {/* Content on Left */}
              <div className="lg:w-2/3 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {developers[1].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {developers[1].summary}
                </p>
                <div className="flex gap-4">
                  <a 
                    href={developers[1].portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-semibold">Portfolio</span>
                  </a>
                  <a 
                    href={developers[1].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span className="font-semibold">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
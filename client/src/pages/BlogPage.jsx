import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Telemedicine: Trends and Predictions for 2024',
    excerpt: 'Explore how telemedicine is reshaping healthcare delivery and what trends are driving innovation in remote patient care.',
    author: 'Dr. Sarah Mitchell',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Telemedicine',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    title: '5 Ways Digital Health Records Improve Patient Care',
    excerpt: 'Discover how Electronic Health Records (EHR) are transforming patient care and improving outcomes across healthcare facilities.',
    author: 'Dr. James Anderson',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'HIPAA Compliance: A Complete Guide for Healthcare Providers',
    excerpt: 'Learn about HIPAA requirements, best practices for compliance, and how to protect patient data in the digital age.',
    author: 'Maria Rodriguez',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Compliance',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Streamlining Hospital Operations with AI-Powered Scheduling',
    excerpt: 'See how artificial intelligence is revolutionizing appointment scheduling and reducing wait times in healthcare facilities.',
    author: 'Dr. Emily Chen',
    date: '2023-12-28',
    readTime: '6 min read',
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Patient Engagement: Building Trust Through Technology',
    excerpt: 'Understand how modern patient portals and mobile apps are improving patient engagement and satisfaction scores.',
    author: 'Robert Thompson',
    date: '2023-12-20',
    readTime: '8 min read',
    category: 'Patient Care',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Cost Reduction Strategies for Healthcare Facilities',
    excerpt: 'Learn practical strategies to reduce operational costs while maintaining high-quality patient care standards.',
    author: 'Lisa Wang',
    date: '2023-12-15',
    readTime: '9 min read',
    category: 'Operations',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
           
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Insights & Updates
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay informed about the latest trends, best practices, and innovations in healthcare technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-dark-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      By {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


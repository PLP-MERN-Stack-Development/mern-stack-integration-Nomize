// scripts/seedPosts.js
// Run this to seed example posts: npm run seed-posts

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');

const examplePosts = [
  {
    title: 'The Future of Web Development: Trends to Watch in 2024',
    content: `Web development is constantly evolving, and staying ahead of the curve is crucial for developers. In this post, we'll explore some of the most exciting trends shaping the future of web development.

From AI-powered development tools to the rise of edge computing, the landscape is changing rapidly. React and Vue continue to dominate the frontend space, while backend technologies like Node.js and Python frameworks remain popular choices.

The shift towards serverless architecture is also gaining momentum, allowing developers to focus on business logic rather than infrastructure management. TypeScript adoption has grown significantly, providing better type safety and developer experience.

Performance optimization remains a top priority, with Core Web Vitals becoming increasingly important for SEO. Progressive Web Apps (PWAs) are gaining traction as businesses look for app-like experiences on the web.

The future is exciting, and as developers, we must embrace continuous learning to stay relevant in this dynamic field.`,
    excerpt: 'Explore the latest trends shaping web development and what the future holds for developers.',
    categoryId: 'technology',
  },
  {
    title: 'Mastering React Hooks: A Comprehensive Guide',
    content: `React Hooks have revolutionized how we write React components. Since their introduction in React 16.8, they've become an essential part of the React ecosystem.

Hooks allow you to use state and other React features without writing class components. The useState hook lets you add state to functional components, while useEffect handles side effects.

Custom hooks enable code reuse across components, making your code more maintainable and DRY. The useContext hook simplifies prop drilling, making it easier to manage global state.

Performance optimization is easier with hooks like useMemo and useCallback, which help prevent unnecessary re-renders. The useReducer hook provides a more sophisticated way to manage complex state logic.

In this guide, we'll cover best practices for using hooks, common pitfalls to avoid, and how to write custom hooks that solve real-world problems. By mastering hooks, you'll write cleaner, more efficient React code.`,
    excerpt: 'Learn how to effectively use React Hooks to write cleaner and more efficient components.',
    categoryId: 'technology',
  },
  {
    title: 'Work-Life Balance in the Tech Industry',
    content: `The tech industry is known for its fast-paced environment and demanding work schedules. However, maintaining a healthy work-life balance is crucial for long-term success and well-being.

Burnout is a real issue in tech. Many developers and engineers find themselves working long hours, dealing with tight deadlines, and constantly learning new technologies. This can lead to exhaustion, reduced productivity, and health issues.

Setting boundaries is essential. This means defining clear working hours, learning to say no to unrealistic deadlines, and taking regular breaks. Remote work has blurred these lines, but it's more important than ever to establish a separation between work and personal time.

Prioritize self-care activities like exercise, meditation, and spending time with loved ones. Many successful tech professionals attribute their success to maintaining good work-life balance, which improves focus and creativity.

Remember, your career is a marathon, not a sprint. Taking care of yourself ensures you can perform at your best and enjoy a sustainable career in tech.`,
    excerpt: 'Discover how to maintain a healthy work-life balance while thriving in a tech career.',
    categoryId: 'lifestyle',
  },
  {
    title: 'Starting Your Own Tech Startup: A Beginner\'s Guide',
    content: `Have you ever dreamed of starting your own tech company? The startup landscape is more accessible than ever, but it comes with its own challenges and rewards.

The first step is validating your idea. Talk to potential customers, understand their pain points, and ensure there's a real market for your solution. Many startups fail because they build products nobody wants.

Building an MVP (Minimum Viable Product) allows you to test your idea with minimal investment. This lean approach helps you gather feedback and iterate quickly without wasting resources.

Securing funding is often a challenge. Whether through bootstrapping, angel investors, or venture capital, you need to be strategic about your financial planning. A solid business plan and pitch deck are essential for attracting investors.

Building the right team is crucial. Surround yourself with people who complement your skills and share your vision. A great team can overcome almost any obstacle.

The journey is challenging but rewarding. Many of today's billion-dollar companies started in garages with nothing but an idea and determination. With proper planning and execution, you can turn your startup dreams into reality.`,
    excerpt: 'Learn the essential steps to launch and grow your own successful tech startup.',
    categoryId: 'business',
  },
  {
    title: 'Mental Health and Self-Care for Developers',
    content: `Mental health is often overlooked in the tech industry, but it's as important as physical health. Developers face unique challenges including imposter syndrome, stress from debugging complex problems, and the pressure to constantly learn new technologies.

Imposter syndrome is particularly common among developers. Even experienced programmers sometimes feel like they don't belong. The key is to recognize these feelings and remember that everyone struggles sometimes. Sharing your challenges with others can help normalize these experiences.

Self-care practices like meditation, journaling, and mindfulness can significantly improve mental health. Taking breaks during the workday, going for walks, and disconnecting from screens are simple yet effective practices.

Seeking help from professionals when needed is important. Many companies now offer mental health support and counseling services. Don't hesitate to use these resources.

Building a supportive community helps too. Connect with other developers, share your experiences, and create a network of people who understand the challenges you face.

Remember, taking care of your mental health is not a luxury; it's a necessity for a sustainable and fulfilling career.`,
    excerpt: 'Explore practical strategies for maintaining mental health as a developer.',
    categoryId: 'health',
  },
  {
    title: 'The Rise of AI and Machine Learning in Web Development',
    content: `Artificial Intelligence and Machine Learning are no longer just buzzwords—they're becoming integral parts of web development. From chatbots to personalized recommendations, AI is everywhere.

ChatGPT and similar language models are changing how developers work. Code generation tools help developers write code faster, while AI-powered debugging tools can identify issues automatically.

Machine learning models can analyze user behavior and provide personalized experiences. E-commerce sites use ML algorithms to recommend products, streaming services use it for content recommendations, and social media platforms use it for content ranking.

TensorFlow.js and PyTorch bring machine learning to the browser, allowing developers to build intelligent web applications without deep ML expertise. This democratization of AI opens new possibilities for web development.

However, with great power comes great responsibility. Ethical considerations around AI, data privacy, and bias in algorithms are important topics every developer should understand.

The intersection of web development and AI is where innovation happens. As a web developer, understanding AI and ML concepts will give you a competitive edge in the evolving tech landscape.`,
    excerpt: 'Discover how AI and Machine Learning are transforming web development.',
    categoryId: 'technology',
  },
  {
    title: 'Travel Guide: Digital Nomad Hotspots Around the World',
    content: `Being a digital nomad offers an incredible opportunity to work while exploring the world. Here are some of the best destinations for remote workers and travelers.

Bali, Indonesia, has long been a favorite among digital nomads. With affordable living costs, beautiful beaches, and a thriving nomad community, it's an ideal place to base yourself while working remotely.

Chiang Mai, Thailand, offers an even lower cost of living with excellent food and hospitality. Many developers and remote workers have established a strong community here, making it easy to network and collaborate.

Lisbon, Portugal, combines European charm with a vibrant tech scene. It's becoming increasingly popular among remote workers who want better weather and a rich cultural experience.

Berlin, Germany, is a hub for startups and innovation. The city's creative energy and access to funding make it attractive for entrepreneurs and tech professionals.

Medellín, Colombia, has transformed into a modern city with excellent climate and a growing tech community. It's often overlooked but offers great value and an amazing lifestyle.

The key to successful digital nomadism is finding a balance between work and exploration, maintaining productivity, and building meaningful connections with the communities you visit.`,
    excerpt: 'Explore the best destinations for digital nomads and remote workers worldwide.',
    categoryId: 'travel',
  },
  {
    title: 'Healthy Eating Tips for Busy Tech Professionals',
    content: `When you're deep in coding, it's easy to forget about nutrition. But healthy eating is essential for maintaining energy, focus, and overall well-being.

Quick and healthy meal options can save time while keeping you fueled. Preparing meals in advance allows you to grab nutritious options when you're busy. Investing in meal prep containers and planning your week ahead makes this easier.

Hydration is crucial. Dehydration can cause fatigue and reduce cognitive function. Keep a water bottle at your desk and remind yourself to drink regularly.

Healthy snacks like nuts, fruits, and yogurt can keep your energy stable throughout the day. Avoiding sugary drinks and excessive caffeine can prevent energy crashes.

Regular meal times help maintain metabolism and focus. Skipping meals or eating irregularly can lead to poor food choices and reduced productivity.

Exercise complements good nutrition. Regular physical activity improves mental health, increases energy, and enhances focus—all critical for tech professionals.

Taking care of your health through good nutrition and exercise is an investment in your career and well-being. Treat your body like you treat your code—with care and attention to quality.`,
    excerpt: 'Practical nutrition tips to maintain energy and focus as a busy tech professional.',
    categoryId: 'health',
  },
];

async function seedPosts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the first user (or create one for testing)
    let user = await User.findOne();
    if (!user) {
      console.log('No user found. Please create a user account first.');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`Using user: ${user.name} (${user.email})`);

    // Get categories
    const techCategory = await Category.findOne({ name: 'Technology' });
    const lifestyleCategory = await Category.findOne({ name: 'Lifestyle' });
    const businessCategory = await Category.findOne({ name: 'Business' });
    const healthCategory = await Category.findOne({ name: 'Health' });
    const travelCategory = await Category.findOne({ name: 'Travel' });

    if (!techCategory || !lifestyleCategory || !businessCategory || !healthCategory || !travelCategory) {
      console.log('❌ Missing categories. Please run: npm run seed');
      await mongoose.connection.close();
      process.exit(1);
    }

    const categoryMap = {
      technology: techCategory._id,
      lifestyle: lifestyleCategory._id,
      business: businessCategory._id,
      health: healthCategory._id,
      travel: travelCategory._id,
    };

    // Create posts with user and categories
    const postsToCreate = examplePosts.map(post => ({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: user._id,
      category: categoryMap[post.categoryId],
      isPublished: true,
    }));

    // Use updateOne with upsert to avoid duplicates
    const results = [];
    for (const post of postsToCreate) {
      try {
        const result = await Post.updateOne(
          { title: post.title, author: post.author },
          { $set: post },
          { upsert: true }
        );
        results.push(result);
      } catch (err) {
        console.error(`Error upserting post "${post.title}":`, err.message);
      }
    }

    console.log(`✅ Processed ${results.length} posts`);
    const existingPosts = await Post.countDocuments();
    console.log(`Total posts in database: ${existingPosts}`);

    await mongoose.connection.close();
    console.log('✅ Done!');
  } catch (err) {
    console.error('❌ Error seeding posts:', err.message);
    process.exit(1);
  }
}

seedPosts();

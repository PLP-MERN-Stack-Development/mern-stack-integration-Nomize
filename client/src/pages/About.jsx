// About.jsx
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About MyBlog 📖</h1>
          <p className="text-lg text-gray-200">Inspiring Stories, Shared Knowledge, Growing Community</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Mission Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            MyBlog is dedicated to sharing insightful, inspiring, and practical articles that help you grow, learn, and stay informed. 
            We believe in the power of knowledge and the importance of community.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're passionate about technology, seeking lifestyle tips, exploring business strategies, prioritizing health, 
            or discovering travel destinations, you'll find valuable content here written by our community of passionate writers.
          </p>
        </section>

        {/* What We Cover */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 What We Cover</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-2">💻 Technology</h3>
              <p className="text-gray-700">Latest trends, coding tutorials, and web development insights</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-2">🏢 Business</h3>
              <p className="text-gray-700">Entrepreneurship, startup stories, and business strategy</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-2">❤️ Health & Wellness</h3>
              <p className="text-gray-700">Wellness tips, nutrition, fitness, and mental health</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-2">✈️ Travel & Lifestyle</h3>
              <p className="text-gray-700">Travel guides, lifestyle tips, and personal growth</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">⭐ Our Values</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Quality Content</h3>
                <p className="text-gray-700">We prioritize well-researched, thoughtful, and valuable articles</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Community First</h3>
                <p className="text-gray-700">Our readers and writers are the heart of MyBlog</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Continuous Learning</h3>
                <p className="text-gray-700">We believe in growth, innovation, and staying curious</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Authenticity</h3>
                <p className="text-gray-700">We share genuine stories and real experiences</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

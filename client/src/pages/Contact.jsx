// Contact.jsx
import { useState } from 'react';

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    setSubmitted(true);
    console.log('Message sent:', values);
    setValues({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get In Touch 💬</h1>
          <p className="text-lg text-gray-200">Have questions, feedback, or want to collaborate? We'd love to hear from you!</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          {submitted && (
            <div className="bg-green-50 border border-green-300 text-green-700 px-6 py-4 rounded-lg mb-6 flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <p className="font-bold">Message Sent Successfully!</p>
                <p className="text-sm">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-start">
              <span className="text-2xl mr-3">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                placeholder="Tell us what you're thinking..."
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                rows={7}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              📧 Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Other Ways to Reach Us</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="font-bold text-blue-900">📧 Email</p>
                <p className="text-gray-700">contact@myblog.com</p>
              </div>
              <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                <p className="font-bold text-cyan-900">💬 Social Media</p>
                <p className="text-gray-700">Follow us on Twitter & LinkedIn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

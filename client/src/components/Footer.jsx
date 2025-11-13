export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-12 text-center">
      <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
    </footer>
  );
}

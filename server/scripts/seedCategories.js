// scripts/seedCategories.js
// Run this with: node scripts/seedCategories.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Category = require('../models/Category');

const defaultCategories = [
  { name: 'Technology' },
  { name: 'Lifestyle' },
  { name: 'Business' },
  { name: 'Health' },
  { name: 'Entertainment' },
  { name: 'Travel' },
  { name: 'Food' },
  { name: 'Education' },
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    // Upsert default categories one-by-one to ensure all exist
    const results = [];
    for (const c of defaultCategories) {
      const name = c.name.trim();
      const doc = await Category.findOneAndUpdate(
        { name: new RegExp(`^${name}$`, 'i') },
        { $setOnInsert: { name } },
        { upsert: true, new: true }
      );
      results.push(doc);
    }

    console.log(`✅ Ensured ${results.length} categories exist:`);
    results.forEach(cat => console.log(`  - ${cat.name} (${cat._id})`));

    await mongoose.connection.close();
    console.log('✅ Done! Database connection closed.');
  } catch (err) {
    console.error('❌ Error seeding categories:', err.message);
    process.exit(1);
  }
}

seedCategories();

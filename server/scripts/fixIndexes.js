// scripts/fixIndexes.js
// Run this to drop the slug unique index

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Post = require('../models/Post');
const Category = require('../models/Category');

async function fixIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Drop the problematic slug index from Post collection
    try {
      await Post.collection.dropIndex('slug_1');
      console.log('✅ Dropped slug_1 index from Post');
    } catch (err) {
      console.log('ℹ️  slug_1 index does not exist on Post or already dropped');
    }

    // Drop the problematic slug index from Category collection
    try {
      await Category.collection.dropIndex('slug_1');
      console.log('✅ Dropped slug_1 index from Category');
    } catch (err) {
      console.log('ℹ️  slug_1 index does not exist on Category or already dropped');
    }

    // List current indexes
    const postIndexes = await Post.collection.getIndexes();
    console.log('Current indexes on Post collection:');
    console.log(postIndexes);

    const categoryIndexes = await Category.collection.getIndexes();
    console.log('Current indexes on Category collection:');
    console.log(categoryIndexes);

    await mongoose.connection.close();
    console.log('✅ Done!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixIndexes();

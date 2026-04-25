const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Movie = require('../models/Movie');

const sampleMovies = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    genre: 'Action',
    releaseYear: 2010
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    genre: 'Sci-Fi',
    releaseYear: 2014
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    genre: 'Action',
    releaseYear: 2008
  },
  {
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/f89U3z9vYp7C9CpcACSTBvP9v7i.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4',
    genre: 'Sci-Fi',
    releaseYear: 1999
  },
  {
    title: 'The Wolf of Wall Street',
    description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/p9fuznDWYmOkR7lsCewm6FAp69p.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    genre: 'Drama',
    releaseYear: 2013
  },
  {
    title: 'Superbad',
    description: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/ek89VlPZ46pS9P6NisJ5O8V8W3v.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    genre: 'Comedy',
    releaseYear: 2007
  },
  {
    title: 'The Conjuring',
    description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/9S7G2K2O26S3S7u77O720a4G3R6.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    genre: 'Horror',
    releaseYear: 2013
  },
  {
    title: 'Our Planet',
    description: 'Experience our planet\'s natural beauty and examine how climate change impacts all living creatures in this ambitious documentary of spectacular scope.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/fR7T5yTzNnU0zU6R8q9m7Yp6R9p.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    genre: 'Documentary',
    releaseYear: 2019
  },
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    genre: 'Action',
    releaseYear: 2019
  },
  {
    title: 'Joker',
    description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/udDclJoHjfpt8MvSMzNdQv1pzrv.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    genre: 'Drama',
    releaseYear: 2019
  }
];

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri || mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost')) {
      // Try to connect to local/env URI first, if it fails or isn't provided, use MemoryServer
      try {
        const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (localError) {
        console.log('Local MongoDB not found or failed to connect. Starting In-Memory MongoDB...');
        const path = require('path');
        const fs = require('fs');
        const dbPath = path.join(__dirname, '../.mongo-temp');
        if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true });

        const mongoServer = await MongoMemoryServer.create({
          instance: {
            dbPath: dbPath,
            storageEngine: 'ephemeralForTest'
          },
          binary: {
            version: '4.4.0'
          }
        });
        mongoUri = mongoServer.getUri();
        const conn = await mongoose.connect(mongoUri);
        console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      }
    } else {
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    
    const count = await Movie.countDocuments();
    if (count === 0) {
      await Movie.insertMany(sampleMovies);
      console.log('Sample movies seeded to database!');
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

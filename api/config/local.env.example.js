'use strict';

if (!process.env.DATABASE_URI){
  if (process.env.NODE_ENV == 'test')
    process.env.DATABASE_URI = 'mongodb://127.0.0.1:27017/jonsmusic-test';
  else
    process.env.DATABASE_URI = 'mongodb://127.0.0.1:27017/jonsmusic';
}

if (!process.env.SESSION_SECRET){
  if (process.env.NODE_ENV == 'test')
    process.env.SESSION_SECRET = 'testkey';
  else
    process.env.SESSION_SECRET = 'jonsmusicappsecretkey';
}

if (!process.env.S3_BUCKET){
  process.env.S3_KEY = 'jonsmusic';
}
if (!process.env.S3_KEY){
  process.env.S3_KEY = 'AWS S3 Key';
}
if (!process.env.S3_SECRET){
  process.env.S3_KEY = 'AWS S3 Secret';
}

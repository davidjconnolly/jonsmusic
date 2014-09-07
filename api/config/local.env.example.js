if (!process.env.DATABASE_URI){
  process.env.DATABASE_URI = 'mongodb://127.0.0.1:27017/jonsmusic';
}
if (!process.env.SESSION_SECRET){
  process.env.SESSION_SECRET = 'jonsmusicappsecretkey';
}

// export const domain = '192.168.0.156:8420';
// export const domain = 'indiaretailing.go1cms.com';
const stage = true
export const domain = stage ? 'admin.stage.indiaretailing.com' : 'admin.beta.indiaretailing.com'; //normal stage
// export const domain = 'admin.beta.indiaretailing.com';   //live
export const website = stage ? 'https://stage.indiaretailing.com' : 'https://indiaretailing.vercel.app/';
export const websiteUrl = stage ? 'https://stage.indiaretailing.com/' : 'https://indiaretailing.vercel.app/';
export const YOUTUBE_API_KEY = 'AIzaSyAtZV9erZrT33fiYG9qlTghJjhbQk3zAa0';
// export const website = 'https://indiaretail.vercel.app';
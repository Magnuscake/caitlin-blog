module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fb60f10fb74c5c828e94b520b540b0a9'),
  },
});

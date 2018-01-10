module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'index',
      script    : 'index.js',
      env: {
        COMMON_VARIABLE: 'true', 
        PORT: 80, 
        NODE_ENV: 'production'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: 8080
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      key  : '/Users/bastian/.ssh/transip',
      user : 'lionoda',
      host : '37.97.206.81',
      ref  : 'origin/master',
      repo : 'https://github.com/devbas/idp-sharedprogramming.git',
      path : '/var/www/sharedprogramming',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

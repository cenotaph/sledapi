module.exports = {
  apps : [{
    name      : 'Sled API',
    script    : 'app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'deploy',
      host : 'testing.icewhistle.com',
      ssh_options: "StrictHostKeyChecking=no",
      ref  : 'origin/master',
      repo : 'git@github.com:cenotaph/sledapi.git',
      path : '/var/www/sled/api',
      'post-deploy' : 'ln -sf /var/www/sled/api/shared/data /var/www/sled/api/current/data && cp /var/www/sled/api/shared/.env.production /var/www/sled/api/current && yarn install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

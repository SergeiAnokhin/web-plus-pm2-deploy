require('dotenv').config({path: '.env.deploy'});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', DEPLOY_REPO,
} = process.env;

module.exports = {
  apps : [],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      "post-deploy":
        "cd current/frontend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};

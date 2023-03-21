require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: '.dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};

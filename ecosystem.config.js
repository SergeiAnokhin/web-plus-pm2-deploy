require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      interpreter: 'none',
      cwd: './frontend',
    },
    {
      name: 'backend',
      script: 'npm',
      args: 'start',
      interpreter: 'none',
      cwd: './backend',
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `rsync -avz --exclude='node_modules' ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd frontend && npm install && cd ../backend && npm install && pm2 startOrRestart ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};

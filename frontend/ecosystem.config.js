require('dotenv').config({path: '.env.deploy'});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', DEPLOY_REPO,
} = process.env;

console.log(DEPLOY_HOST);

module.exports = {
  apps : [{
    name   : "frontend",
    script : ".build/index.html"
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': 'scp ./*.env.deploy sa_anokhin@158.160.27.79:/home/sa_anokhin/frontend/source/frontend',
      'post-deploy': 'cd frontend/source/frontend && npm i && npm run build',
    },
  },
};
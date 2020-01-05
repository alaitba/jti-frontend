module.exports = {
    apps: [
      {
        // Production
        name: 'production',
        script: 'server',
        exec_mode: 'cluster',
        instances: 'max',
        autorestart: !true,
        watch: false,
        wait_ready: true,
        max_memory_restart: '1G',
        env: {
          VIA_PM2: true,
          NODE_ENV: 'production',
          PORT: 3000,
        },
      },
      {
        // Testing
        name: 'testing',
        script: 'server',
        exec_mode: 'cluster',
        instances: '2   ',
        autorestart: !true,
        watch: false,
        wait_ready: true,
        max_memory_restart: '1G',
        env: {
          VIA_PM2: true,
          NODE_ENV: 'production',
          PORT: 3003,
        },
      },
    ],
    "deploy" : {
        "testing" : {
          "user" : "jti",
          "host" : ["192.168.1.166"],
          "port" : "2223",
          "ref"  : "origin/master",
          "repo" : "https://gitlab+deploy-token-41:E8Ag1nhDxoMp3fBJx5ex@gitlab.ibecsystems.kz/web/jti-frontend.git",
          "path" : "/var/www/jti/data/www/jti-frontend.ibec.systems",
          "pre-deploy": "git reset --hard",
          "post-deploy" : "npm install && npm run build && pm2 reload ecosystem.config.js --only testing"
         },
        //  "production" : {
        //     "user" : "jti",
        //     "host" : ["188.0.151.149"],
        //     "port" : "2223",
        //     "ref"  : "origin/production",
        //     "repo" : "https://gitlab+deploy-token-41:E8Ag1nhDxoMp3fBJx5ex@gitlab.ibecsystems.kz/web/jti-frontend.git",
        //     "path" : "/var/www/jti/data/www/jti-frontend.ibec.systems",
        //     "pre-deploy": "git reset --hard",
        //     "post-deploy" : "npm install && npm run build && pm2 reload ecosystem.config.js --only testing"
        // },
      }
  }  
  
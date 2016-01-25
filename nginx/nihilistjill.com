server {
  listen        80;
  charset       utf-8;
  server_name   ~nihilistjill.([0-9\.]+).xip.io
                nihilistjill.com;

  root          /home/thomas/CODE/nihilistjill.com;
  access_log    /home/thomas/CODE/nihilistjill.com/logs/access.log;
  error_log     /home/thomas/CODE/nihilistjill.com/logs/error.log;


  location / {
    proxy_pass http://127.0.0.1:1337;
    proxy_redirect off;
    proxy_set_header X-Site-Name 'jill';

    #proxy_http_version 1.1;
    #proxy_set_header Upgrade $http_upgrade;
    #proxy_set_header Connection 'upgrade';
    #proxy_set_header Host $host;
    #proxy_cache_bypass $http_upgrade;
  }
}

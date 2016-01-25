server {
  listen        80;
  charset       utf-8;
  server_name   ~nihilistbill.([0-9\.]+).xip.io
                nihilistbill.com;

  root          /var/www/nihilistbill.com;
  access_log    /var/www/nihilistbill.com/logs/access.log;
  error_log     /var/www/nihilistbill.com/logs/error.log;


  location / {
    proxy_pass http://127.0.0.1:1337?site=bill;
    proxy_redirect off;
  }
}
server {
  listen        80;
  charset       utf-8;
  server_name   ~nihilistjill.([0-9\.]+).xip.io
                nihilistjill.com;

  root          /home/thomas/CODE/nihilistjill.com;
  access_log    /home/thomas/CODE/nihilistjill.com/logs/access.log;
  error_log     /home/thomas/CODE/nihilistjill.com/logs/error.log;


  location / {
    proxy_pass http://127.0.0.1:1337?site=jill;
    proxy_redirect off;
  }
}

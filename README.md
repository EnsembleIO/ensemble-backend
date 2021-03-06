<img src="./public/images/logo/ensemble2@0,5x.png" alt="Ensemble" width="450px;"/>
## Genral setup

Clone repo :
```
git clone 'url'
```

Start mongo database :
```
mongod
```

Start elasticsearch :
```
./bin/elasticsearch
```

Start ensemble-backend server :
```
npm install
node server.js
```


## Security setup

### OAuth 2.0

Insert a client in the database :

```
db.oauthclients.save({ clientId: 's6BhdRkqt3', clientSecret: 'gX1fBat3bV', redirectUri: 'http://beesearch.fr/logged' })
```

Insert a user in the database, hashed password correspond to string 'test' :

```
db.oauthusers.save({ username: 'alex', password:'$2a$10$BpEsMD.X9BLXoTzvxetHEeLR51peGeiHaa2LMCgALSlw1XlwcEFpe', firstname: 'Alex', lastname: 'Doe' })
```

Passwords are hashed using [bcrypt](https://github.com/ncb000gt/node.bcrypt.js), following these recomendations : [How To Safely Store A Password](http://codahale.com/how-to-safely-store-a-password/).

To get an access token, launch a POST request on /oauth/token :

```
POST /oauth/token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=alex&password=test
```

### HTTPS

Go in the in the keys folder and generate the sign key :

```bash
$ cd keys
$ openssl genrsa -out bee-key.pem 1024
```

Then generate the certificate request :

```bash
$ openssl req -new -key bee-key.pem -out certrequest.csr

Country Name (2 letter code) [AU]:FR
State or Province Name (full name) [Some-State]:Pays de la loire
Locality Name (eg, city) []:Nantes
Organization Name (eg, company) [Internet Widgits Pty Ltd]:BeeSearch
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:beesearch.fr
Email Address []:your.address@beesearch.fr

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

Generate the certificate:

```bash
$ openssl x509 -req -in certrequest.csr -signkey bee-key.pem -out bee-cert.pem
```

Finally start the server:
```bash
$ node server.js
```

To start in a producti
on environment, use:
```bash
$ NODE_ENV=production node server.js
```

Config file `config.production.json` will be used.

Deploy to heroku
```bash
$ git push heroku master
```

Get news feeds : http://localhost:3000/search?search=Margaux
# bee-backend

## Security setup

### OAuth 2.0

Insert a client in the database:

```

db.oauthclients.save({ clientId: 's6BhdRkqt3', clientSecret: 'gX1fBat3bV', redirectUri: 'http://beesearch.fr/logged' })

```

Insert a user in the database, hashed password correspond to string 'test':

```

db.oauthusers.save({ username: 'test', password:'$2a$10$BpEsMD.X9BLXoTzvxetHEeLR51peGeiHaa2LMCgALSlw1XlwcEFpe', firstname: 'Alex', lastname: 'Doe' })

```

Password are hashed using bcrypt : https://github.com/ncb000gt/node.bcrypt.js, following these recomendations : http://codahale.com/how-to-safely-store-a-password/

To get an access token, launch a POST request on /oauth/token:

```

POST /oauth/token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=johndoe&password=534b44a19bf18d20b71ecc4eb77c572f

```

### HTTPS

Go in the in the keys folder and generate the sign key:

```bash

$ cd keys

$ openssl genrsa -out bee-key.pem 1024

```

Then generate the certificate request:

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

Finally configure the server:
```bash

$ cp config.json.sample config.json

```

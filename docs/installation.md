# Installation
A step by step series of how to set this up and running.

>If you want SSL to be enabled, follow the [SSL](#ssl) steps first.



Run this command in both the frontend and the backend folder to install the dependencies.
```shell
$ npm install
```



After you have installed the dependencies, open two terminals. One for the frontend and one for the backend.
First type this command in the backend terminal
```shell
$ npm run build
```

After that run this command in both the frontend and backend terminal
```shell
$ npm run start
```


# SSL
> For this ssl setup, we are using [mkcert](https://github.com/FiloSottile/mkcert).
Creates a new Certificate Authorities and installs it in your local CA system trust store
```shell
$ mkcert -install 
```

Creates the cert.pem file and the key.pem file to be used in the project.
```shell
$ mkcert -cert-file cert.pem -key-file key.pem localhost
```
In the frontend folder, create .env file and put this content inside it.
```dotenv
HTTPS=true
SSL_CRT_FILE="PATH TO THE cert.pem"
SSL_KEY_FILE="PATH TO THE key.pem"
```
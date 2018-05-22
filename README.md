# ApiExampleProject

>This project is to demonstrate how to build APIs in a number of different languages.


## How Tos

This repo runs as completely detached services, and so requires a number of tools to run properly.

### List of Tools

* Visual Studio 2017 (pick your flavor)
* Visual Studio Code
* [npm](https://nodejs.org/en/download/)

### Instalation Instructions

I have both `gulp` and ``http-serve` installed globally to save time and typing. To install them globally, run the following commands:

```sh
npm install -g gulp
```

```sh
npm install -g http-serve
```

### How to build

#### NPM
```sh
cd {directory of repo}
```

```sh
npm install
```

```sh
gulp
```

#### .NET

Open the .NET Core application in Visual Studio. Build menu -> Build Solution.

### How to run

In Visual Studio, start the ASP.NET project. It will run on port 8081 as to not interfere with the client. Inside your repo directory, run the `http-serve` command. This will get the HTTP server running. Open a browser (Chrome or Firefox are preferred), and go to [http://localhost:8080](http://localhost:8080).
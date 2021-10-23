<img alt="Easy React Library logo" src="erl.png" width="15%">

# Easy React Library

This is a React UI components library codebase for you who needs to create a shared component library and go fast with setup and understand how it works. We're gonna mainly use Typescript and Storybook. And we'll not publish the lib, instead we install it directly from a git repository with `git add ssh`.

## Compiler/bundler
This version is built with Typescript Compiler (`tsc`). For a version built with [rollup](https://rollupjs.org/) bundler take a look at branch [`built-with-rollup`](https://github.com/jeff-pal/easy-react-lib/tree/built-with-rollup).

> Not compatible with Nextjs because of this: [CSS Imported by a Dependency](https://nextjs.org/docs/messages/css-npm) 


# Install
```
yarn add ssh://git@github.com:jeff-pal/easy-react-lib.git

#or

npm i ssh://git@github.com:jeff-pal/easy-react-lib.git
```


# Step-by-step

Here it's presented the steps to build the lib. As this is not a web application itself, so it would be better lean, then we setup React from scratch instead of using something like create-react-app.

### 1. Create a Git Repository

Create a git repo for your component library if you haven't done it yet. Then create a new folder and init it:

```bash
echo "# My Component Lib" >> README.md
git init
git add README.md
git commit -m "docs: add readme"
git branch -M main
git remote add origin <your-ssh-repo-address>
git push -u origin main
```
### 2. Init

From the lib root path run `npm init -y`.

### 3. Installing dependencies

```bash
npm i --save-dev react react-dom @types/react typescript
```

When installed the lib will need the `react` and `rect-dom` dependencies. So we need to add it to peerDependencies too so that our lib uses the package installed in the client's project.

Add the following snippet to the *package.json*:

```json
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
```

### 4. Setup Typescript

Let's configure the  typescript by running the command `npx tsc --init`. Then update the *tsconfig.json* to this: 

```json
{
  "compilerOptions": {
    "target": "es5",
    "outDir": "lib/esm",
    "lib": [
      "dom",
      "es6", 
      "es2016",
      "es2017",
      "es2018",
      "es2019",
      "es2020",
      "es2021",
      "esnext"
    ],
    "declaration": true,
    "declarationDir": "lib/esm",
    "allowJs": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react"
  },
  "include": [
    "src",
  ],
  "exclude": [
    "**/*.spec.?s",
    "**/*.test.?s",
    "**/*.stories.?s",
    "**/*.stories.?sx",
  ]
}
```

You can check all these config options in the [Typescript tsconfig reference](https://www.typescriptlang.org/tsconfig).

### 5. Setup Storybook

Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

1. Init

    In the lib root path run the command `npx sb init`. This command will install all the core devDependencies, add scripts in the *package.json*, setup some configuration files, and create example stories.

2. Run
    
    Now you can run Storybook with this command `yarn storybook` and see the examples.

3. Remove stories folder
    
    Since everything is working fine and you can check the Storybook examples, we can safely delete the stories folder.

4. Update stories config
    
    Open the file _.storybook/main.js_ and update de _stories_ key to this:

    ```json
    "stories": [
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ]
    ```
### Starting to create components ans stories

First of all, create a folder src/components and place a component and a story.

### Setup package.json

Add the following scripts and update the key `main`, `module` and `types`:

```json
...
"scripts": {
  ...
  "build": "npm run build:esm && npm run build:cjs",
  "build:esm": "npx tsc",
  "build:cjs": "npx tsc --module commonjs --outDir lib/cjs",
  "copy-files": "npm run copy-files:css",
  "copy-files:css": "npx copyfiles -u 1 src/**/*.css lib/esm && npx copyfiles -u 1 src/**/*.css lib/cjs",
  "postbuild": "npm run copy-files && npm run remove-files",
  "postinstall": "npm run build",
  "remove-files": "npx rimraf src .gitignore tsconfig"
},
"main": "lib/cjs/index.js",
"module": "lib/esm/index.js",
"types": "lib/esm/index.d.ts"

```

### How to create CLI

#### 1. Creacte the file **cli.js** within **/bin** in the root path, containing this:

```
#!/usr/bin/env node
console.log('Arguments: ', process.argv);
```

`env` is the name of a Unix program. One way to use it is `env COMMAND`. Where COMMAND, in this case, is `node`.

Therefore, `/usr/bin/env node` is an instruction to set the [PATH](https://opensource.com/article/17/6/set-path-linux) (as well as all the other NAME=VALUE pairs), and then run node, using the first directory in the PATH that contains the node executable.

I recommend you to look for more details about [`env`](https://man7.org/linux/man-pages/man1/env.1.html) and #! ([shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)))


#### 2. Give running permission for that file:

```
chmod +x bin/cli.js
```

#### 3. Map a command-line script to a command name

In **package.json** add the following key:

```json
"bin": {
    "my-command-name": "./bin/cli.js"
}
```

If you want to provide a single NodeJS command-line script with the same name as the project (name in package.json), you could just set a string instead of an object where the string would be the local file path.

> Do not existing system or package command names!

Possible causes:

- if testing locally, package may not be linked (run `npm link`)


### References

https://prateeksurana.me/blog/react-component-library-using-storybook-6/

https://prateeksurana.me/blog/react-library-with-typescript/

https://nextjs.org/docs/messages/css-npm
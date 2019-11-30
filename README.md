# base-express-server
A simple base repo for initializing a typescript based express server including route structures, service pattern, and npm scripts to help build, run, and debug your server. This also includes a launch file for vscode for easily launching and debugging. This implementation of an express server is written in typescript and includes a preset tsconfig.json file to help run out of the box (see more below).

# Installation
To install simply duplicate this repo however you would like, update file names such as app.ts (don't forget to update the new entrypoint name in package.json), and replace the dummy routes and service that are used as a simple example.

# Usage
This repo is broken up into three parts: 
 - Main app.ts file
 - Express Server
 - Services

Using typescript and the npm package [module-alias](https://www.npmjs.com/package/module-alias), this repo takes advantage of module aliasing the simplify internal module references. The express server and services directories are marked as aliases in tsconfig.json as well as package.json. The former being for typscript compiling and vscode development, and the latter for usage at runtime with node. To import anything in the server directory or the services directory use an absolute path like shown:

```
import { DummyService } from '@services'
```

Both the server/routes and services directories also include an index.ts file in their respective roots to be able to import all your services and routes from a single location. This can be useful for only needing to use a single line in the imports of your actual code.

```
import { DummyRoutes, MoreDummyRoutes } from './routes'
```

app.ts servers as the entry point to the application. If you would like this to be called something else specific to your application, make sure to update the ***main*** property in package.json to reflect this change:
```
{
    "main": "dist/myapp.js"
}
```

# Typescript
Using typescript allows us to take advantage of a lot of useful tools and features to improve our code and development process. It allows us to be specific about our types, use more modern styles of javascript modules without the need of a larger module and package resolution solution such as babel or webpack, and overall makes code easier to read and debug (subjectively of course). However, for many, using typescript outside of a prebaked solution such as Angular, and techinically even this repo, can raise a lot of questions that aren't always so intuitive or well documented. For this reason I have included a quick write up of the tsconfig.json file used in this repo.

```
{
  "compilerOptions": {
      "module": "commonjs",
      "target": "esnext",
      "moduleResolution": "node",
      "noImplicitAny": false,
      "sourceMap": true,
      "outDir": "dist",
      "baseUrl": ".",
      "paths": {
        "@services": ["src/services"],
        "@server": ["src/server"]
      }
    }
}
```

For starters we'll knock out the easy ones and then move on to the larger more problematic settings. 

 - ***noImplicitAny***: This flag is used to specifiy the use of the any type in typescript. Here, I have it set to false to make it easier to deal with any javascript libraries that don't have typings and require you to deal with their properties and return types. Obviously, there is more than one way to get around this problem but sometimes I find it easier to allow a cursed *any* to be used as long as I keep track of it with comments. This is clearly a personal preference and is perfectly safe to turn off if you want.
 - ***sourceMap***: This flag is used to tell tsc to generate map files between javascript and typescript. Your debugger will use these files to allow you to seamlessly debug your typescript code that is mapped back from javascript. Often times trying to read and debug the generated javascript code can be quite painful and these mappings will almost always make your life easier
 - ***outDir***: This just tells tsc to compile everything to a dist folder (it will create it on the first build). This makes it so that your code doesn't end up cluttered with javascript and map files, and also makes it easier to then transport your finished project.
 - ***baseUrl***: This is used to tell tsc where the base of all your absolute path references are, both in code and in the paths option
 - ***paths***: This is a collection of any path aliases that are used in your typescript code. This allows you to use an absolute path alias rather than digging up and down directory structures in your imports. Be careful with this however, as discussed below, this only affects the typescript compilation and does nothing to the generated javascript files.
 
 The next few options all deal with module imports and exports and language support, both in typescript and the generated javascript. Module resolution in javascript can be a little funky. Here's a pretty good article explaining some of the differences between the different modules: [medium](https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b). Long story short, module resolution is a pain, es6 modules look the best, node uses commonjs out of the box, and amd.....well that was designed for browsers anyways so we won't worry about that. Personally, I prefer es6 (aka ECMA2015) style of imports and exports but since we're running node out of the box here, we need a way to convert from es6 modules to commonjs modules. Enter typescript. Typescript allows us to set what type of modules we want to write our code in, and what modules we want to export to.

  - ***target***: This option sets what language support we want to use. This is important depending on what node version you use, or what browser your app might run in.
  - ***module***: This option sets what type of module resolution we want typescript to generate our code in
  - ***moduleResolution***: This sets the module resolution settings for typescript. Setting this to node allows us to take advantage of index files to define modules based off directories

The important piece to understand here is what Typescript was created to do. Typescript is not it's own language, it's mearly a wrapper around javascript. This wrapper must take into account multiple module resolution patterns, target platforms, etc... Typescript was created to not make any decisions for you. This allows developers to continue to use long standing frameworks and bundlers while still taking advantage of typescripts typings and class structures. This also means that we as developers have to be very specific about what we want typescript to do, and how we want our javascript to work.
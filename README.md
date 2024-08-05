# Memory issues with Bun and NestJS + NestJS-GraphQL

When running this simple NestJS project with bun, there are some kind of memory
leak that causes the memory comsumption to grow with each request. The same
error does not occur when running the same project with NodeJS.

The memory leak problem only occurs when we include the NestJS-GraphQL module.
If this module is removed, the memory consumption remains stable.

Tested with Bun v1.1.21 and NodeJS v22.3.0.

## Steps to reproduce : Initial setup

1. Clone this repository
2. Run `bun install`

## Steps to reproduce : Running the project with Bun

1. Build and start the project by running `bun run build-node && bun ./dist/main.js`
2. Generate traffic to the server `http://localhost:3000/`. A simple tool for
   this is available in the `tools` folder. Run `node tools/simple-traffic-test.js` to
   generate 300.000 requests to the server (will be executed one by one).
3. Monitor the memory comsumption of the bun-process. It will grow with each
   request.

Note that the requests to `http://localhost:3000/` does not actually trigger any
GraphQL endpoints as this is available at `http://localhost:3000/graphql`.

### "Remove" the memory leak

1. Stop the bun-process
2. Remove the `GraphQLModule` from `src/gql/gql.module.ts` by commenting out
   line `10`-`15`
3. Build and start the project by running `bun run build-node && bun
./dist/main.js`
4. Generate traffic to the server `http://localhost:3000/`. A simple tool for
   this is available in the `tools` folder. Run `node tools/simple-traffic-test.js` to
   generate 300.000 requests to the server (will be executed one by one).
5. Monitor the memory comsumption of the bun-process. It will remain stable.

### Alternate build step

In our case, we build the project using Bun, and not the NestJS CLI. We do this
in a similar manner to what is set up in `build.ts`. To use this, you can run
`bun run build-bun && bun ./dist/main.js`.

The memory leak problem is still present when using this build step.

## Steps to reproduce : Running the project with NodeJS

1. Build and start the project by running `npm run build-node && node ./dist/main.js`
2. Generate traffic to the server `http://localhost:3000/`. A simple tool for
   this is available in the `tools` folder. Run `node tools/simple-traffic-test.js` to
   generate 300.000 requests to the server (will be executed one by one).
3. Monitor the memory comsumption of the node-process. It will remain stable.

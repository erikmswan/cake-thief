# The cake thief problem

This is my go at solving the cake thief problem.

https://www.interviewcake.com/question/python/cake-thief

# Usage

I used node v8.0.0 when programming this, but I'm sure earlier versions would work fine. You'll need to have some version of node installed globally in order for it to work. If you don't, I recommend using [node version manager](https://github.com/creationix/nvm) for managing your node versions or [docker](https://www.docker.com/) if you prefer containerized environments.

To install:

- `git clone git@github.com:erikmswan/cake-thief.git`
- `npm i`

To run:

- `npm run start`

If you want to just build the app for some reason, use `npm run build` (or `npm run watch` to keep watching for changes). If you want to just run the app without building it, use `npm run exe`.

# Changing the input

To change the input, you have to edit `src/models.js` and rebuild the app (run `npm run start`). I've loaded it with 3 cases, but you're free to build your own:

- Input with case of 0 value cakes (default)
- Input with case of 0 weight cakes
- Input with case of 0 weight and value cakes

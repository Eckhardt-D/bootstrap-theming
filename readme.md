# Bootstrap sass theme tool

A simple html, css and js tool I use to make modified bootstrap components by applying some sass glue.

## Usage

The main function is a specific builder. the src directory contains all the html, the builder dynamically adds everything into the build/ directory on `npm run build`.

## Static & Public

The static directory contains the bootstrap source code and should never need to change, unless a newer version is required. The public directory is where all your images etc. will be added and will be copied along with the source to the build/ directory.

## index.html

Purely a test file. Use src to create components.

## Theme.sass

The main Sass glue. All overriding/helper classes functions and variables should go here. Ideally every instance of this repository should be it's own theme.

## Development

`npm run dev`

- Runs a development server on port 1011. (Navigate to your file's path)
- Watches sass file and automatically builds to theme.css in src.
- Changes in html and sass requires hard refresh of the browser for now. SOZ.
- The development server uses CDN versions of the Bootstrap.

### Note

If you want to add custom css and js, do so in your public folder and link it :)
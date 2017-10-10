# Website for Samantha Todhunter


## A static website, built using Gulp, Nunjucks templates, Sass and JavaScript

### Requirements:

- Node
- Homebrew
- Yarn

### Installation instructions:

If not already installed, install Homebrew:
`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

If not already installed, install Yarn - this will also install Node.js:
`$ brew install yarn`

Install the project dependencies:
`$ yarn install`

To compile the site for development:
`$ gulp`

Tompile the site for development and run a basic web server with BrowserSync capabilities:
`$ gulp watch`

To compile a shippable version of the site with optimised assets:
`$ gulp ship`

**See gulpfile.js for compilation configuration**

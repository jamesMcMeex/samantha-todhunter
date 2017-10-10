Website for Samantha Todhunter

Static HTML website

Compiled using Nunjucks HTML templates, Sass & JavaScript

Requirements:

- Node
- Homebrew
- Yarn

Installation instructions:

# If not already installed, install Homebrew
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# If not already installed, install Yarn - this will also install Node.js
$ brew install yarn

# Install the project dependencies
$ yarn install

# To compile the site
$ gulp

# Compile the site and run the basic web server with BrowserSync capabilities
$ gulp watch

# Compile a shippable version of the site with optimised code
$ gulp ship

See gulpfile.js for compilation configuration

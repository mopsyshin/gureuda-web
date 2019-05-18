import { addParameters, configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  backgrounds: [
    { name: 'white', value: '#ffffff'},
    { name: 'light-grey', value: '#f9f9f9', default: true},
    { name: 'black', value: '#000000'},
  ],
});

configure(loadStories, module);

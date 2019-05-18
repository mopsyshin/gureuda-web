import React from 'react';

import { storiesOf, addDecorator, addParameters } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TodoInput from 'components/input/TodoInput';
import TodoListItem from 'components/list-item/TodoListItem';

addDecorator((story) => <div style={{ padding: '24px', maxWidth: '375px' }}>{story()}</div>)

storiesOf('Input', module)
  .add('todo-input', () => <TodoInput handleChange={action('right')}/>);

storiesOf('ListItem', module)
  .add('todo-list-item', () => <TodoListItem/>);


# Jellyfish Feedback Plugin

Provides the tools to manage user feedback within Jellyfish.

# Usage

Below is an example how to use this library:

```typescript
import { feedbackPlugin } from '@balena/jellyfish-plugin-feedback';
import { PluginManager } from '@balena/jellyfish-worker';

// Load contracts from this plugin
const pluginManager = new PluginManager([
	feedbackPlugin(),
]);
const contracts = pluginManager.getCards();
console.dir(contracts);
```

# Documentation

Visit the website for complete documentation: https://product-os.github.io/jellyfish-plugin-feedback

# Testing

Unit tests can be easily run with the command `npm test`.

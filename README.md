# lightning-linter

A linter for lightning components.

## Installation

```bash
npm install lightning-linter
```

Create a test.js file with the following content:

```javascript
// test.js
require('lightning-linter');
```

## Run

Locate a directory with lightning components. And launch the following command:

```bash
node test.js <lightning-components-dir> <outputFile CSV>
```

Open the generated CSV with your favourite CSV viewer.

## Customizing rules

You can customize your own ESlint rules by editing the following file

```bash
<install_dir>/node_modules/lightning-linter/my_rules.json
```
# Profit calculator

## Description
Calculate your profit simply by inputting the Price, Cost, and Discount percent. The usage of a Discount is optional and can be set within the form.

#### Profit formula
Profit = Price * (100 - Discount) / 100 - Cost

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Test
```
npm run test
```

### Test:watch
```
npm run test:watch
```

### Test:coverage
```
npm run test:coverage
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
Customize the app with config.ts settings.
| Config key               | Description                                                                                        | Values            |
| -------------            | -------------------------------------------------------------------------------------------------- |-------------------|
| CurrencySymbol           | You can set a custom currency symbol. Leave it empty if you don't want to use a currency symbol.   | '', '€', '$', etc |
| ClearDiscountIfDisabled  | Clear the current discount input value when disabling the discount usage. Default value is false.  | true, false       |

See [Configuration Reference](https://cli.vuejs.org/config/).

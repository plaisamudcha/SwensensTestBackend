export const PRODUCT_MODES = {
  CAKE: 'CAKE',
  QUARTER450: 'QUARTER450',
  QUARTER250: 'QUARTER250',
  SUNDAESET: 'SUNDAESET',
  SCOOP: 'SCOOP',
  TOPPING: 'TOPPING'
} as const;

export type ProductMode = (typeof PRODUCT_MODES)[keyof typeof PRODUCT_MODES];

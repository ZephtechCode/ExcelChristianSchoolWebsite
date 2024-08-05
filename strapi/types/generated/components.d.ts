import type { Schema, Attribute } from '@strapi/strapi';

export interface MenuItemMenuItem extends Schema.Component {
  collectionName: 'components_menu_item_menu_items';
  info: {
    displayName: 'Menu Item';
    description: '';
  };
  attributes: {
    URL: Attribute.String;
    Label: Attribute.String & Attribute.Unique;
    External: Attribute.Boolean;
    Order: Attribute.Integer;
    Parent: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'menu-item.menu-item': MenuItemMenuItem;
    }
  }
}

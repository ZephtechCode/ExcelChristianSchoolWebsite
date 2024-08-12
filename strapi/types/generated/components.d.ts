import type { Schema, Attribute } from '@strapi/strapi';

export interface WhyGrid extends Schema.Component {
  collectionName: 'components_why_grids';
  info: {
    displayName: 'Grid';
    icon: 'grid';
  };
  attributes: {
    Card: Attribute.Component<'why.card', true>;
  };
}

export interface WhyCard extends Schema.Component {
  collectionName: 'components_why_cards';
  info: {
    displayName: 'Card';
    icon: 'grid';
  };
  attributes: {
    Title: Attribute.String;
  };
}

export interface MacroRichText extends Schema.Component {
  collectionName: 'components_macro_rich_texts';
  info: {
    displayName: 'Rich Text';
  };
  attributes: {
    Content: Attribute.Blocks;
  };
}

export interface MacroAdminStaffList extends Schema.Component {
  collectionName: 'components_macro_admin_staff_lists';
  info: {
    displayName: 'AdminStaffList';
    icon: 'bulletList';
  };
  attributes: {
    faculties: Attribute.Relation<
      'macro.admin-staff-list',
      'oneToMany',
      'api::faculty.faculty'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'why.grid': WhyGrid;
      'why.card': WhyCard;
      'macro.rich-text': MacroRichText;
      'macro.admin-staff-list': MacroAdminStaffList;
    }
  }
}

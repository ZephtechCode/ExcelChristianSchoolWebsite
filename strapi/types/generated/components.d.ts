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

export interface MacroComponentsProfileList extends Schema.Component {
  collectionName: 'components_macro_components_profile_lists';
  info: {
    displayName: 'Profile List';
    icon: 'emotionHappy';
  };
  attributes: {
    profiles: Attribute.Relation<
      'macro-components.profile-list',
      'oneToMany',
      'api::profile.profile'
    >;
    componentName: Attribute.Enumeration<['ProfileList']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'why.grid': WhyGrid;
      'why.card': WhyCard;
      'macro-components.profile-list': MacroComponentsProfileList;
    }
  }
}

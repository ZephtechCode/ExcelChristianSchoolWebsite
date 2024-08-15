import type { Schema, Attribute } from '@strapi/strapi';

export interface MacroComponentsRichText extends Schema.Component {
  collectionName: 'components_macro_components_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'apps';
    description: '';
  };
  attributes: {
    Content: Attribute.Blocks;
  };
}

export interface MacroComponentsProfileList extends Schema.Component {
  collectionName: 'components_macro_components_profile_lists';
  info: {
    displayName: 'Profile List';
    icon: 'emotionHappy';
    description: '';
  };
  attributes: {
    profiles: Attribute.Relation<
      'macro-components.profile-list',
      'oneToMany',
      'api::profile.profile'
    >;
  };
}

export interface MiniComponentsButtonFramed extends Schema.Component {
  collectionName: 'components_mini_components_button_frameds';
  info: {
    displayName: 'Button Framed';
  };
  attributes: {
    Label: Attribute.String;
    URL: Attribute.String;
    Icon: Attribute.Enumeration<['coffee']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'macro-components.rich-text': MacroComponentsRichText;
      'macro-components.profile-list': MacroComponentsProfileList;
      'mini-components.button-framed': MiniComponentsButtonFramed;
    }
  }
}

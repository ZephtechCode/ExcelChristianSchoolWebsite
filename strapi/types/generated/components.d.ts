import type { Schema, Attribute } from '@strapi/strapi';

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

export interface MacroComponentsRichText extends Schema.Component {
  collectionName: 'components_macro_components_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'apps';
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
      'mini-components.button-framed': MiniComponentsButtonFramed;
      'macro-components.rich-text': MacroComponentsRichText;
      'macro-components.profile-list': MacroComponentsProfileList;
    }
  }
}

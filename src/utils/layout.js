const LayoutConfig = {
  autoCollapseDisabled: false,
  collapsedBreakpoint: 'sm',
  heightAdjustmentDisabled: false,
  xs: {
    sidebar: {
      anchor: 'left',
      hidden: false,
      inset: false,
      variant: 'temporary',
      width: 240,
      collapsible: false,
      collapsedWidth: 64,
    },
    header: {
      position: 'sticky',
      clipped: false,
      offsetHeight: 56,
      persistentBehavior: 'fit',
    },
    content: {
      persistentBehavior: 'fit',
    },
    footer: {
      persistentBehavior: 'fit',
    },
  },
  sm: {
    sidebar: {
      anchor: 'left',
      hidden: false,
      inset: false,
      variant: 'persistent',
      width: 256,
      collapsible: false,
      collapsedWidth: 64,
    },
    header: {
      position: 'sticky',
      clipped: false,
      offsetHeight: 64,
      persistentBehavior: 'fit',
    },
    content: {
      persistentBehavior: 'fit',
    },
    footer: {
      persistentBehavior: 'fit',
    },
  },
  md: {
    sidebar: {
      anchor: 'left',
      hidden: false,
      inset: false,
      variant: 'persistent',
      width: 256,
      collapsible: true,
      collapsedWidth: 64,
    },
    header: {
      position: 'sticky',
      clipped: false,
      offsetHeight: 64,
      persistentBehavior: 'fit',
    },
    content: {
      persistentBehavior: 'fit',
    },
    footer: {
      persistentBehavior: 'fit',
    },
  },
};

export default LayoutConfig;

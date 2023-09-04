const materioTheme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    unit: 'px',
  },
  direction: 'ltr',
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-rounded': {
            borderRadius: 4,
          },
        },
        deleteIcon: {
          width: 18,
          height: 18,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {},
    },
    MuiListItemAvatar: {
      styleOverrides: {},
    },
    MuiListItemText: {
      styleOverrides: {},
    },
    MuiListSubheader: {
      styleOverrides: {},
    },
    MuiMenu: {
      styleOverrides: {},
    },
    MuiTabs: {
      styleOverrides: {},
    },
    MuiTab: {
      styleOverrides: {},
    },
    MuiCard: {
      styleOverrides: {},
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          lineHeight: 1.6,
          fontWeight: 500,
          fontSize: '1.125rem',
          letterSpacing: '0.15px',
          '@media (min-width: 600px)': {
            fontSize: '1.25rem',
          },
        },
        action: {
          marginTop: 0,
          marginRight: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {},
    },
    MuiCardActions: {
      styleOverrides: {},
    },
    MuiInputLabel: {
      styleOverrides: {},
    },
    MuiInput: {
      styleOverrides: {},
    },
    MuiFilledInput: {
      styleOverrides: {},
    },
    MuiOutlinedInput: {
      styleOverrides: {},
    },
    MuiAlert: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {},
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiDialog: {
      styleOverrides: {},
    },
    MuiDialogTitle: {
      styleOverrides: {},
    },
    MuiDialogContent: {
      styleOverrides: {},
    },
    MuiDialogActions: {
      styleOverrides: {},
    },
    MuiRating: {
      styleOverrides: {},
    },
    MuiTableContainer: {
      styleOverrides: {},
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          '& .MuiTableCell-head': {
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.13px',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {},
    },
    MuiTableRow: {
      styleOverrides: {},
    },
    MuiTableCell: {
      styleOverrides: {},
    },
    MuiAvatar: {
      styleOverrides: {
        rounded: {
          borderRadius: 5,
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {},
    },
    MuiDivider: {
      styleOverrides: {},
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {},
    },
    MuiTooltip: {
      styleOverrides: {},
    },
    MuiBackdrop: {
      styleOverrides: {
        invisible: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeaderCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important',
        },
        columnHeaderTitleContainer: {
          padding: 0,
        },
        columnHeaderTitle: {
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.17px',
          textTransform: 'uppercase',
        },
        row: {
          '&:last-child': {
            '& .MuiDataGrid-cell': {
              borderBottom: 0,
            },
          },
        },
        cellCheckbox: {
          maxWidth: '58px !important',
          minWidth: '58px !important',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {},
    },
    MuiSwitch: {
      styleOverrides: {},
    },
    MuiTimelineItem: {
      styleOverrides: {},
    },
    MuiTimelineConnector: {
      styleOverrides: {},
    },
    MuiTimelineContent: {
      styleOverrides: {},
    },
    MuiTimelineDot: {
      styleOverrides: {},
    },
    MuiAccordion: {
      styleOverrides: {},
    },
    MuiAccordionSummary: {
      styleOverrides: {},
    },
    MuiAccordionDetails: {
      styleOverrides: {},
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minWidth: '6rem !important',
          '&.MuiTablePagination-select': {
            minWidth: '1.5rem !important',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {},
    },
    MuiBreadcrumbs: {
      styleOverrides: {},
    },
    MuiPaginationItem: {
      styleOverrides: {},
    },
    MuiAutocomplete: {
      styleOverrides: {},
    },
    MuiTypography: {
      styleOverrides: {},
      variants: [
        {
          props: {
            variant: 'h1',
          },
        },
        {
          props: {
            variant: 'h2',
          },
        },
        {
          props: {
            variant: 'h3',
          },
        },
        {
          props: {
            variant: 'h4',
          },
        },
        {
          props: {
            variant: 'h5',
          },
        },
        {
          props: {
            variant: 'h6',
          },
        },
        {
          props: {
            variant: 'subtitle1',
          },
        },
        {
          props: {
            variant: 'subtitle2',
          },
        },
        {
          props: {
            variant: 'body1',
          },
        },
        {
          props: {
            variant: 'body2',
          },
        },
        {
          props: {
            variant: 'button',
          },
        },
        {
          props: {
            variant: 'caption',
          },
        },
        {
          props: {
            variant: 'overline',
          },
        },
      ],
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    customColors: {
      dark: '231, 227, 252',
      main: '231, 227, 252',
      light: '58, 53, 65',
      primaryGradient: '#9C9FA4',
      bodyBg: '#28243D',
      trackBg: '#474360',
      avatarBg: '#3F3B59',
      darkBg: '#312D4B',
      lightBg: '#FFF',
      tableHeaderBg: '#3D3759',
    },
    common: {
      black: '#000',
      white: '#FFF',
    },
    primary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: '#FFF',
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: '#FFF',
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: '#FFF',
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: '#FFF',
    },
    success: {
      light: '#6AD01F',
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: '#FFF',
    },
    grey: {
      '50': '#FAFAFA',
      '100': '#F5F5F5',
      '200': '#EEEEEE',
      '300': '#E0E0E0',
      '400': '#BDBDBD',
      '500': '#9E9E9E',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161',
    },
    text: {
      primary: 'rgba(231, 227, 252, 0.87)',
      secondary: 'rgba(231, 227, 252, 0.6)',
      disabled: 'rgba(231, 227, 252, 0.38)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(231, 227, 252, 0.12)',
    background: {
      paper: '#312D4B',
      default: '#312D4B',
    },
    action: {
      active: 'rgba(231, 227, 252, 0.54)',
      hover: 'rgba(231, 227, 252, 0.04)',
      selected: 'rgba(231, 227, 252, 0.08)',
      disabled: 'rgba(231, 227, 252, 0.26)',
      disabledBackground: 'rgba(231, 227, 252, 0.12)',
      focus: 'rgba(231, 227, 252, 0.12)',
      hoverOpacity: 0.08,
      selectedOpacity: 0.16,
      disabledOpacity: 0.38,
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  shape: {
    borderRadius: 6,
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(19, 17, 32, 0.2), 0px 1px 1px 0px rgba(19, 17, 32, 0.14), 0px 1px 3px 0px rgba(19, 17, 32, 0.12)',
    '0px 3px 1px -2px rgba(19, 17, 32, 0.2), 0px 2px 2px 0px rgba(19, 17, 32, 0.14), 0px 1px 5px 0px rgba(19, 17, 32, 0.12)',
    '0px 4px 8px -4px rgba(19, 17, 32, 0.42)',
    '0px 6px 18px -8px rgba(19, 17, 32, 0.56)',
    '0px 3px 5px -1px rgba(19, 17, 32, 0.2), 0px 5px 8px rgba(19, 17, 32, 0.14), 0px 1px 14px rgba(19, 17, 32, 0.12)',
    '0px 2px 10px 0px rgba(19, 17, 32, 0.1)',
    '0px 4px 5px -2px rgba(19, 17, 32, 0.2), 0px 7px 10px 1px rgba(19, 17, 32, 0.14), 0px 2px 16px 1px rgba(19, 17, 32, 0.12)',
    '0px 5px 5px -3px rgba(19, 17, 32, 0.2), 0px 8px 10px 1px rgba(19, 17, 32, 0.14), 0px 3px 14px 2px rgba(19, 17, 32, 0.12)',
    '0px 5px 6px -3px rgba(19, 17, 32, 0.2), 0px 9px 12px 1px rgba(19, 17, 32, 0.14), 0px 3px 16px 2px rgba(19, 17, 32, 0.12)',
    '0px 6px 6px -3px rgba(19, 17, 32, 0.2), 0px 10px 14px 1px rgba(19, 17, 32, 0.14), 0px 4px 18px 3px rgba(19, 17, 32, 0.12)',
    '0px 6px 7px -4px rgba(19, 17, 32, 0.2), 0px 11px 15px 1px rgba(19, 17, 32, 0.14), 0px 4px 20px 3px rgba(19, 17, 32, 0.12)',
    '0px 7px 8px -4px rgba(19, 17, 32, 0.2), 0px 12px 17px 2px rgba(19, 17, 32, 0.14), 0px 5px 22px 4px rgba(19, 17, 32, 0.12)',
    '0px 7px 8px -4px rgba(19, 17, 32, 0.2), 0px 13px 19px 2px rgba(19, 17, 32, 0.14), 0px 5px 24px 4px rgba(19, 17, 32, 0.12)',
    '0px 7px 9px -4px rgba(19, 17, 32, 0.2), 0px 14px 21px 2px rgba(19, 17, 32, 0.14), 0px 5px 26px 4px rgba(19, 17, 32, 0.12)',
    '0px 8px 9px -5px rgba(19, 17, 32, 0.2), 0px 15px 22px 2px rgba(19, 17, 32, 0.14), 0px 6px 28px 5px rgba(19, 17, 32, 0.12)',
    '0px 8px 10px -5px rgba(19, 17, 32, 0.2), 0px 16px 24px 2px rgba(19, 17, 32, 0.14), 0px 6px 30px 5px rgba(19, 17, 32, 0.12)',
    '0px 8px 11px -5px rgba(19, 17, 32, 0.2), 0px 17px 26px 2px rgba(19, 17, 32, 0.14), 0px 6px 32px 5px rgba(19, 17, 32, 0.12)',
    '0px 9px 11px -5px rgba(19, 17, 32, 0.2), 0px 18px 28px 2px rgba(19, 17, 32, 0.14), 0px 7px 34px 6px rgba(19, 17, 32, 0.12)',
    '0px 9px 12px -6px rgba(19, 17, 32, 0.2), 0px 19px 29px 2px rgba(19, 17, 32, 0.14), 0px 7px 36px 6px rgba(19, 17, 32, 0.12)',
    '0px 10px 13px -6px rgba(19, 17, 32, 0.2), 0px 20px 31px 3px rgba(19, 17, 32, 0.14), 0px 8px 38px 7px rgba(19, 17, 32, 0.12)',
    '0px 10px 13px -6px rgba(19, 17, 32, 0.2), 0px 21px 33px 3px rgba(19, 17, 32, 0.14), 0px 8px 40px 7px rgba(19, 17, 32, 0.12)',
    '0px 10px 14px -6px rgba(19, 17, 32, 0.2), 0px 22px 35px 3px rgba(19, 17, 32, 0.14), 0px 8px 42px 7px rgba(19, 17, 32, 0.12)',
    '0px 11px 14px -7px rgba(19, 17, 32, 0.2), 0px 23px 36px 3px rgba(19, 17, 32, 0.14), 0px 9px 44px 8px rgba(19, 17, 32, 0.12)',
    '0px 11px 15px -7px rgba(19, 17, 32, 0.2), 0px 24px 38px 3px rgba(19, 17, 32, 0.14), 0px 9px 46px 8px rgba(19, 17, 32, 0.12)',
  ],
  typography: {
    fontFamily:
      'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    h1: {
      fontWeight: 500,
      letterSpacing: '-1.5px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: '3.5rem',
      lineHeight: 1.167,
      '@media (min-width:600px)': {
        fontSize: '4.7129rem',
      },
      '@media (min-width:900px)': {
        fontSize: '5.3556rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '5.9983rem',
      },
    },
    h2: {
      fontWeight: 500,
      letterSpacing: '-0.5px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: '2.375rem',
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '3.125rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3.3333rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '3.75rem',
      },
    },
    h3: {
      fontWeight: 500,
      letterSpacing: 0,
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: '2rem',
      lineHeight: 1.167,
      '@media (min-width:600px)': {
        fontSize: '2.5707rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.7849rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '2.9991rem',
      },
    },
    h4: {
      fontWeight: 500,
      letterSpacing: '0.25px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: '1.5625rem',
      lineHeight: 1.235,
      '@media (min-width:600px)': {
        fontSize: '1.8219rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.0243rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '2.0243rem',
      },
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0,
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: '1.25rem',
      lineHeight: 1.334,
      '@media (min-width:600px)': {
        fontSize: '1.3118rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.4993rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.4993rem',
      },
    },
    h6: {
      letterSpacing: '0.15px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.6,
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '1.25rem',
      },
    },
    subtitle1: {
      letterSpacing: '0.15px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.75,
    },
    subtitle2: {
      letterSpacing: '0.1px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body1: {
      letterSpacing: '0.15px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      lineHeight: 1.5,
      letterSpacing: '0.15px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    button: {
      letterSpacing: '0.3px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      textTransform: 'uppercase',
    },
    caption: {
      letterSpacing: '0.4px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      letterSpacing: '1px',
      fontFamily:
        'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    inherit: {
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
    },
  },
  unstable_sxConfig: {
    border: {
      themeKey: 'borders',
    },
    borderTop: {
      themeKey: 'borders',
    },
    borderRight: {
      themeKey: 'borders',
    },
    borderBottom: {
      themeKey: 'borders',
    },
    borderLeft: {
      themeKey: 'borders',
    },
    borderColor: {
      themeKey: 'palette',
    },
    borderTopColor: {
      themeKey: 'palette',
    },
    borderRightColor: {
      themeKey: 'palette',
    },
    borderBottomColor: {
      themeKey: 'palette',
    },
    borderLeftColor: {
      themeKey: 'palette',
    },
    borderRadius: {
      themeKey: 'shape.borderRadius',
    },
    color: {
      themeKey: 'palette',
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
    },
    backgroundColor: {
      themeKey: 'palette',
    },
    p: {},
    pt: {},
    pr: {},
    pb: {},
    pl: {},
    px: {},
    py: {},
    padding: {},
    paddingTop: {},
    paddingRight: {},
    paddingBottom: {},
    paddingLeft: {},
    paddingX: {},
    paddingY: {},
    paddingInline: {},
    paddingInlineStart: {},
    paddingInlineEnd: {},
    paddingBlock: {},
    paddingBlockStart: {},
    paddingBlockEnd: {},
    m: {},
    mt: {},
    mr: {},
    mb: {},
    ml: {},
    mx: {},
    my: {},
    margin: {},
    marginTop: {},
    marginRight: {},
    marginBottom: {},
    marginLeft: {},
    marginX: {},
    marginY: {},
    marginInline: {},
    marginInlineStart: {},
    marginInlineEnd: {},
    marginBlock: {},
    marginBlockStart: {},
    marginBlockEnd: {},
    displayPrint: {
      cssProperty: false,
    },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
    flexBasis: {},
    flexDirection: {},
    flexWrap: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    order: {},
    flex: {},
    flexGrow: {},
    flexShrink: {},
    alignSelf: {},
    justifyItems: {},
    justifySelf: {},
    gap: {},
    rowGap: {},
    columnGap: {},
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    position: {},
    zIndex: {
      themeKey: 'zIndex',
    },
    top: {},
    right: {},
    bottom: {},
    left: {},
    boxShadow: {
      themeKey: 'shadows',
    },
    width: {},
    maxWidth: {},
    minWidth: {},
    height: {},
    maxHeight: {},
    minHeight: {},
    boxSizing: {},
    fontFamily: {
      themeKey: 'typography',
    },
    fontSize: {
      themeKey: 'typography',
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
    },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: {
      cssProperty: false,
      themeKey: 'typography',
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export default materioTheme;

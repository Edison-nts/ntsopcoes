import { colors } from '@mui/material';
import { createTheme } from '@mui/material';

export const palette = {
  primary: {
    main: '#79aec8',
    contrastText: '#fff',
  },
  secondary: {
    main: colors.deepPurple['500'], // '#4db5ab',
    contrastText: '#fff',
    dark: colors.deepPurple['700'],
  },
  background: {
    default: '#f1f1f3',
  },
  error: {
    main: colors.red['500'],
    contrastText: '#fff',
  },
  success: {
    main: colors.green['500'],
    contrastText: '#fff',
  },
  textColor: {
    main: colors.grey['600'],
    contrastText: '#fff',
    dark: colors.grey['700'],
  },
};

export const themeMUIDataTable2 = createTheme({
  components: {
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF0000',
        },
      },
    },
  },
});

export const themeBase = createTheme({
  palette: palette,
  components: {
    MUIDataTable: {
      styleOverrides: {
        paper: {
          boxShadow: 'none',
        },
      },
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        root: { display: 'none' },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        data: {
          color: '#fff',
        },
        fixedHeader: {
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: palette?.primary?.main,
          color: '#fff',
          '&[aria-sort]': {
            backgroundColor: '#459ac4',
          },
        },
        sortActive: {
          color: '#fff',
        },
        sortAction: {
          alignItems: 'center',
        },
        sortLabelRoot: {
          '& svg': {
            color: '#fff !important',
          },
        },
      },
    },
    MUIDataTableSelectCell: {
      styleOverrides: {
        headerCell: {
          backgroundColor: palette?.primary?.main,
          '& span': {
            color: '#fff !important',
          },
        },
      },
    },
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          color: palette?.textColor?.main,
          '&:hover, &:active, &:focus': {
            color: palette?.textColor?.dark,
          },
        },
      },
    },
    MUIDataTableToolbarSelect: {
      styleOverrides: {
        title: {
          color: palette?.textColor?.main,
        },
        iconButton: {
          color: palette?.textColor?.main,
        },
      },
    },
    MUIDataTablePagination: {
      styleOverrides: {
        root: {
          color: palette?.textColor?.main,
        },
      },
    },
  },
});

export interface StringToString {
  [key: string]: string;
}

export interface Color<C extends StringToString = StringToString> {
  missing?: string;
  map: C;
  name: string;
}

export interface Theme<C extends StringToString = StringToString> {
  color: Color<C>;
  name?: string;
}

export const CLR_MISSING = 'hsla(309, 89%, 77%, 1)';

export const COLOR_MISSING: Color = {
  map: {},
  missing: CLR_MISSING,
  name: 'missing',
};

export const THEME_MISSING: Theme = {
  color: COLOR_MISSING,
  name: 'missing',
};

export const reduceThemes = (name: string, themes: Theme[]) =>
  themes.reduce<Theme>(
    (acc, theme) => ({
      ...acc,
      color: {
        ...acc.color,
        map: {...(acc.color.map as any), ...(theme.color.map as any)},
        missing: acc.color.missing || theme.color.missing,
        name: acc.color.name || theme.color.name,
      },
      name: acc.name || theme.name,
    }),
    {name, color: {map: {}, name: null}},
  );

export const themeColor = <C extends StringToString>(theme: Theme<C>, getter: (map: C) => string) =>
  theme ? getter(theme.color.map) || theme.color.missing : null;
export const fTthemeColor = <C extends StringToString>(getter: (map: C) => string) => (theme: Theme<C>) => themeColor(theme, getter);

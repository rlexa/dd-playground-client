export interface StringToString { [key: string]: string }

export interface Color<C extends StringToString> {
  missing?: string,
  map: C,
  name: string,
}

export interface Theme<C extends StringToString> {
  color: Color<C>,
  name: string,
}

export const CLR_MISSING = 'hsla(309, 89%, 77%, 1)';

export const COLOR_MISSING = <Color<StringToString>>{
  map: {},
  missing: CLR_MISSING,
  name: 'missing',
}

export const THEME_MISSING = <Theme<StringToString>>{
  color: COLOR_MISSING,
  name: 'missing',
}

export const reduceThemes = <C extends StringToString>(name: string, themes: Theme<C>[]): Theme<C> => themes.reduce((acc, _) => (
  {
    ...acc,
    color: { ...acc.color, map: { ...(acc.color.map as any), ...(_.color.map as any) }, missing: acc.color.missing || _.color.missing, name: acc.color.name || _.color.name },
    name: acc.name || _.name,
  }),
  <Theme<C>>{ name, color: {} });

export const themeColor = <C extends StringToString>(theme: Theme<C>, getter: (map: C) => string) => theme ? getter(theme.color.map) || theme.color.missing : null;
export const themeColor_ = <C extends StringToString>(getter: (map: C) => string) => (theme: Theme<C>) => themeColor(theme, getter);

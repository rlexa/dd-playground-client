import { Pipe, PipeTransform } from '@angular/core';

export const ICON_MAP: { [key: string]: string } = {
  ai: 'school',
  back: 'keyboard_backspace',
  build_config: 'device_hub',
  close: 'close',
  collapse: 'expand_less',
  configuration: 'perm_data_setting',
  create: 'add',
  current: 'new_releases',
  delete: 'delete',
  done: 'done',
  edit: 'edit',
  email: 'email',
  error: 'block',
  exit: 'power_settings_new',
  expand: 'expand_more',
  filter: 'filter_list',
  go_down: 'arrow_downward',
  go_down_left: 'subdirectory_arrow_left',
  go_down_right: 'subdirectory_arrow_right',
  help: 'help_outline',
  info: 'info_outline',
  items1: 'filter_1',
  items2: 'filter_2',
  items3: 'filter_3',
  items4: 'filter_4',
  items5: 'filter_5',
  link: 'link',
  locale: 'language',
  menu: 'menu',
  menuh: 'more_horiz',
  menuv: 'more_vert',
  overview: 'widgets',
  playground: 'videogame_asset',
  polynom: 'format_textdirection_l_to_r',
  refresh: 'refresh',
  release_notes: 'linear_scale',
  request: 'send',
  save: 'save',
  settings: 'settings',
  sort: 'sort',
  sortAsc: 'expand_less',
  sortDesc: 'expand_more',
  telephone: 'phone',
  tens: 'train',
  vens: 'account_box',
  warning: 'warning',
  web: 'web'
}

export const resolveIcon = (key: string) => key in ICON_MAP ? ICON_MAP[key] : key;

@Pipe({ name: 'icon', pure: true })
export class IconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return resolveIcon(value);
  }

}

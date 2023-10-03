import {Pipe, PipeTransform} from '@angular/core';

export const ICON_MAP: {[key: string]: string} = {
  ai: 'school',
  back: 'keyboard_backspace',
  build_config: 'device_hub',
  close: 'close',
  collapse: 'expand_less',
  configuration: 'perm_data_setting',
  create: 'add',
  cryptocurrency: 'monetization_on',
  current: 'new_releases',
  delete: 'delete',
  done: 'done',
  edit: 'edit',
  email: 'email',
  error: 'block',
  exit: 'power_settings_new',
  expand: 'expand_more',
  filter: 'filter_list',
  game: 'games',
  go_down: 'arrow_downward',
  go_down_left: 'subdirectory_arrow_left',
  go_down_right: 'subdirectory_arrow_right',
  go_left: 'chevron_left',
  go_right: 'chevron_right',
  graph: 'blur_on',
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
  walker: 'pets',
  warning: 'warning',
  web: 'web',
};

export const resolveIcon = (key: string) => (key in ICON_MAP ? ICON_MAP[key] : key);

@Pipe({name: 'icon', pure: true, standalone: true})
export class IconPipe implements PipeTransform {
  transform(value: any): any {
    return resolveIcon(value);
  }
}

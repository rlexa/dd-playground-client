import {animate, keyframes, style, transition, trigger} from '@angular/animations';

const ANIM_ENTER_APPEAR = [style({opacity: '0'}), animate('150ms ease-in')];
const ANIM_ENTER_LEFT = [style({transform: 'translateX(50%)', opacity: '0'}), animate('200ms ease-in')];
const ANIM_LEAVE_BOTTOM = [animate('150ms ease-out', style({transform: 'translateY(50%)', opacity: '0'}))];
const ANIM_LEAVE_DISAPPEAR = [animate('150ms ease-out'), style({opacity: '0'})];
const ANIM_ROTATE_X = [style({transform: 'rotateX(-360deg)'}), animate('600ms 50ms ease-in')];
const ANIM_SCALE_UP_DOWN_UP_DOWN = [
  animate(
    '600ms 50ms ease-out',
    keyframes([
      style({offset: 0, transform: 'scale(1)'}),
      style({offset: 0.25, transform: 'scale(1.1)'}),
      style({offset: 0.5, transform: 'scale(1)'}),
      style({offset: 0.75, transform: 'scale(1.05)'}),
      style({offset: 1, transform: 'scale(1)'}),
    ]),
  ),
];
const ANIM_SCALE_BIG_UP_DOWN_UP_DOWN = [
  animate(
    '600ms 50ms ease-out',
    keyframes([
      style({offset: 0, transform: 'scale(1)'}),
      style({offset: 0.25, transform: 'scale(1.75)'}),
      style({offset: 0.5, transform: 'scale(1.25)'}),
      style({offset: 0.75, transform: 'scale(1.5)'}),
      style({offset: 1, transform: 'scale(1)'}),
    ]),
  ),
];
const ANIM_WOBBLE_X = [
  animate(
    '400ms 50ms ease-out',
    keyframes([
      style({offset: 0, transform: 'translateX(0rem)'}),
      style({offset: 0.25, transform: 'translateX(.3rem)'}),
      style({offset: 0.5, transform: 'translateX(0rem)'}),
      style({offset: 0.75, transform: 'translateX(-.3rem)'}),
      style({offset: 1, transform: 'translateX(0rem)'}),
    ]),
  ),
];

// Triggers

export const TRIGGER_ENTER_APPEAR = trigger('TRIGGER_EnterAppear', [transition(':enter', [...ANIM_ENTER_APPEAR])]);
export const TRIGGER_ENTER_APPEAR_LEAVE_DISAPPEAR = trigger('TRIGGER_EnterAppear_LeaveDisappear', [
  transition(':enter', [...ANIM_ENTER_APPEAR]),
  transition(':leave', [...ANIM_LEAVE_DISAPPEAR]),
]);
export const TRIGGER_ENTER_LEFT = trigger('TRIGGER_EnterLeft', [transition(':enter', [...ANIM_ENTER_LEFT])]);
export const TRIGGER_ENTER_LEFT_LEAVE_BOTTOM = trigger('TRIGGER_EnterLeft_LeaveBottom', [
  transition(':enter', [...ANIM_ENTER_LEFT]),
  transition(':leave', [...ANIM_LEAVE_BOTTOM]),
]);
export const TRIGGER_ENTER_SCALE_BIG_UP_DOWN_UP_DOWN = trigger('TRIGGER_EnterScaleBigUpDownUpDown', [
  transition(':enter', [...ANIM_SCALE_BIG_UP_DOWN_UP_DOWN]),
]);
export const TRIGGER_ROTATE_X = trigger('TRIGGER_RotateX', [transition('* <=> *', [...ANIM_ROTATE_X])]);
export const TRIGGER_SCALE_UP_DOWN_UP_DOWN = trigger('TRIGGER_ScaleUpDownUpDown', [transition('* <=> *', [...ANIM_SCALE_UP_DOWN_UP_DOWN])]);
export const TRIGGER_WOBBLE_X = trigger('TRIGGER_WobbleX', [transition('* <=> *', [...ANIM_WOBBLE_X])]);

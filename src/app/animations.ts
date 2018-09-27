import { animate, keyframes, style, transition, trigger } from '@angular/animations';

const ANIM_EnterAppear = [style({ opacity: '0' }), animate('150ms ease-in')];
const ANIM_EnterLeft = [style({ transform: 'translateX(50%)', opacity: '0' }), animate('200ms ease-in')];
const ANIM_LeaveBottom = [animate('150ms ease-out', style({ transform: 'translateY(50%)', opacity: '0' }))];
const ANIM_LeaveDisappear = [animate('150ms ease-out'), style({ opacity: '0' })];
const ANIM_RotateX = [style({ transform: 'rotateX(-360deg)' }), animate('600ms 50ms ease-in')];
const ANIM_ScaleUpDownUpDown = [
  animate('600ms 50ms ease-out', keyframes([
    style({ offset: 0, transform: 'scale(1)' }),
    style({ offset: .25, transform: 'scale(1.1)' }),
    style({ offset: .5, transform: 'scale(1)' }),
    style({ offset: .75, transform: 'scale(1.05)' }),
    style({ offset: 1, transform: 'scale(1)' }),
  ]))];
const ANIM_ScaleBigUpDownUpDown = [
  animate('600ms 50ms ease-out', keyframes([
    style({ offset: 0, transform: 'scale(1)' }),
    style({ offset: .25, transform: 'scale(1.75)' }),
    style({ offset: .5, transform: 'scale(1.25)' }),
    style({ offset: .75, transform: 'scale(1.5)' }),
    style({ offset: 1, transform: 'scale(1)' }),
  ]))];
const ANIM_WobbleX = [
  animate('400ms 50ms ease-out', keyframes([
    style({ offset: 0, transform: 'translateX(0rem)' }),
    style({ offset: .25, transform: 'translateX(.3rem)' }),
    style({ offset: .5, transform: 'translateX(0rem)' }),
    style({ offset: .75, transform: 'translateX(-.3rem)' }),
    style({ offset: 1, transform: 'translateX(0rem)' }),
  ]))];

// Triggers

export const TRIGGER_EnterAppear = trigger('TRIGGER_EnterAppear', [transition(':enter', [...ANIM_EnterAppear])]);
export const TRIGGER_EnterAppear_LeaveDisappear = trigger(
  'TRIGGER_EnterAppear_LeaveDisappear', [
    transition(':enter', [...ANIM_EnterAppear]),
    transition(':leave', [...ANIM_LeaveDisappear]),
  ]);
export const TRIGGER_EnterLeft = trigger('TRIGGER_EnterLeft', [transition(':enter', [...ANIM_EnterLeft])]);
export const TRIGGER_EnterLeft_LeaveBottom = trigger(
  'TRIGGER_EnterLeft_LeaveBottom', [
    transition(':enter', [...ANIM_EnterLeft]),
    transition(':leave', [...ANIM_LeaveBottom]),
  ]);
export const TRIGGER_EnterScaleBigUpDownUpDown = trigger('TRIGGER_EnterScaleBigUpDownUpDown', [transition(':enter', [...ANIM_ScaleBigUpDownUpDown])]);
export const TRIGGER_RotateX = trigger('TRIGGER_RotateX', [transition('* <=> *', [...ANIM_RotateX])]);
export const TRIGGER_ScaleUpDownUpDown = trigger('TRIGGER_ScaleUpDownUpDown', [transition('* <=> *', [...ANIM_ScaleUpDownUpDown])]);
export const TRIGGER_WobbleX = trigger('TRIGGER_WobbleX', [transition('* <=> *', [...ANIM_WobbleX])]);

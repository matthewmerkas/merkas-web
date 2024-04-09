import {
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations'

export function animations(speed = '150ms'): any[] {
  return [
    trigger('fade', [
      transition(
        ':enter',
        animate(
          `${speed} ease-in`,
          keyframes([style({ opacity: 0 }), style({ opacity: 1 })])
        )
      ),
      transition(
        ':leave',
        animate(
          `${speed} ease-out`,
          keyframes([style({ opacity: 1 }), style({ opacity: 0 })])
        )
      )
    ]),
    trigger('fadeIn', [
      transition(
        ':enter',
        animate(
          `${speed} ease-in`,
          keyframes([style({ opacity: 0 }), style({ opacity: 1 })])
        )
      )
    ]),
    trigger('fadeOut', [
      transition(
        ':leave',
        animate(
          `${speed} ease-out`,
          keyframes([style({ opacity: 1 }), style({ opacity: 0 })])
        )
      )
    ]),
    trigger('rotate', [
      transition(
        '* => *',
        animate(
          '500ms',
          keyframes([style({ rotate: '0deg' }), style({ rotate: '360deg' })])
        )
      )
    ])
  ]
}

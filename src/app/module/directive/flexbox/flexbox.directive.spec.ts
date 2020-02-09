import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FlexboxDirective } from './flexbox.directive';

// GENERAL

describe('FlexboxDirective', () => {
  test('should create an instance', () => {
    const directive = new FlexboxDirective();
    expect(directive).toBeTruthy();
  });
});

// ddFlexbox params

const STYLE_DEFAULT_FLEXBOX = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  flexWrap: 'no-wrap'
};

const STYLE_DEFAULT_FLEXITEM = {
  alignSelf: 'auto',
  flex: '0 1 auto'
}

interface TestingGround {
  info: string;
  param: string;
  styles: { [key: string]: string };
}

const mapJustifyContent = {
  'xs': 'flex-start',
  'xc': 'center',
  'xe': 'flex-end',
  'xb': 'space-between',
  'xa': 'space-around'
};

const mapAlignItems = {
  'ys': 'flex-start',
  'yc': 'center',
  'ye': 'flex-end',
  'yb': 'baseline',
  'yt': 'stretch'
};

const mapAlignContent = {
  'cs': 'flex-start',
  'cc': 'center',
  'ce': 'flex-end',
  'cb': 'space-between',
  'ca': 'space-around',
  'ct': 'stretch'
};

const mapAlignSelf = {
  'as': 'flex-start',
  'ac': 'center',
  'ae': 'flex-end',
  'ab': 'baseline',
  'at': 'stretch',
  'aa': 'auto'
};

const mapFlex = {
  '0 0 1rem': '0 0 1rem',
  '1 1': '1 1 auto',
  'too many params here': STYLE_DEFAULT_FLEXITEM.flex
};

const testsFlexbox: TestingGround[] = [
  { info: 'default', param: null, styles: { ...STYLE_DEFAULT_FLEXBOX } },
  { info: 'hbox', param: 'h', styles: { ...STYLE_DEFAULT_FLEXBOX } },
  { info: 'vbox', param: 'v', styles: { ...STYLE_DEFAULT_FLEXBOX, flexDirection: 'column' } },
  { info: 'wrap', param: 'w', styles: { ...STYLE_DEFAULT_FLEXBOX, flexWrap: 'wrap' } },
  ...Object.keys(mapJustifyContent).map(param => <TestingGround>{
    info: 'x dir ' + mapJustifyContent[param], param, styles: { ...STYLE_DEFAULT_FLEXBOX, justifyContent: mapJustifyContent[param] }
  }),
  ...Object.keys(mapAlignItems).map(param => <TestingGround>{
    info: 'y dir ' + mapAlignItems[param], param, styles: { ...STYLE_DEFAULT_FLEXBOX, alignItems: mapAlignItems[param] }
  }),
  ...Object.keys(mapAlignContent).map(param => <TestingGround>{
    info: 'content ' + mapAlignContent[param], param, styles: { ...STYLE_DEFAULT_FLEXBOX, alignContent: mapAlignContent[param] }
  }),
  {
    info: 'multiple', param: 'vycw', styles: { ...STYLE_DEFAULT_FLEXBOX, flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }
  },
  {
    info: 'multiple spaced', param: ' v yc   w  ', styles: {
      ...STYLE_DEFAULT_FLEXBOX, flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap'
    }
  },
];

const testsFlexitem: TestingGround[] = [
  { info: 'default', param: null, styles: { ...STYLE_DEFAULT_FLEXITEM } },
  ...Object.keys(mapAlignSelf).map(param => <TestingGround>{
    info: 'self ' + mapAlignSelf[param], param, styles: { ...STYLE_DEFAULT_FLEXITEM, alignSelf: mapAlignSelf[param] }
  }),
  ...Object.keys(mapFlex).map(param => <TestingGround>{
    info: 'flex ' + mapFlex[param], param, styles: { ...STYLE_DEFAULT_FLEXITEM, flex: mapFlex[param] }
  }),
  { info: 'multiple', param: 'as1 2 300px', styles: { ...STYLE_DEFAULT_FLEXITEM, alignSelf: 'flex-start', flex: '1 2 300px' } },
  {
    info: 'multiple spaced', param: ' as  1 2 300px    ', styles: { ...STYLE_DEFAULT_FLEXITEM, alignSelf: 'flex-start', flex: '1 2 300px' }
  }
];

@Component({ template: `<div [ddFlexbox]="paramsFlexbox"  [ddFlexitem]="paramsFlexitem"></div>` })
class TestFlexboxComponent {
  paramsFlexbox: string = null;
  paramsFlexitem: string = null;
}

describe('FlexboxDirective: parameter', () => {
  let fixture: ComponentFixture<TestFlexboxComponent>;
  let component: TestFlexboxComponent;
  let target: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [FlexboxDirective, TestFlexboxComponent] });
    fixture = TestBed.createComponent(TestFlexboxComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    target = fixture.debugElement.nativeElement.querySelector('div');
  });

  test('should have target container', () => { expect(target).toBeTruthy(); });

  testsFlexbox.forEach(ii =>
    test('should evaluate ddFlexbox parameter "' + ii.param + '": ' + ii.info, () => {
      component.paramsFlexbox = ii.param;
      fixture.detectChanges();
      Object.keys(ii.styles).forEach(key => expect(key + ': ' + target.style[key]).toBe(key + ': ' + ii.styles[key]));
    })
  );

  testsFlexitem.forEach(ii =>
    test('should evaluate ddFlexitem parameter "' + ii.param + '": ' + ii.info, () => {
      component.paramsFlexitem = ii.param;
      fixture.detectChanges();
      Object.keys(ii.styles).forEach(key => expect(key + ': ' + target.style[key]).toBe(key + ': ' + ii.styles[key]));
    })
  );
});

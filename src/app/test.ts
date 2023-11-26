import {Provider, Type} from '@angular/core';
import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MockedComponent} from 'ng-mocks';
import {Mock} from 'ts-mockery';

/**
 * Builds a getter of existing mocked component by type.
 */
export const getterMockedComponent =
  <T>(type: Type<T>) =>
  (fixture: ComponentFixture<any>): MockedComponent<T> =>
    fixture.debugElement.query(By.directive(type))?.componentInstance;

/**
 * Mocks via factory.
 */
export const mockWith = <T>(provide: Type<T>, mock: T) => ({provide, useFactory: () => mock}) as Provider;

export const mockAll = <T>(provide: Type<T>) => mockWith(provide, Mock.all<T>());

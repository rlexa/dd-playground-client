import 'jest-preset-angular/setup-jest';
import './jest-global-mocks';
import {Mock} from 'ts-mockery';

Mock.configure('jest');

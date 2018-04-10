import 'jest-preset-angular';
import './jest-global-mocks';

// Zone outputs giant stacks, let's limit for the tests
Error['stackTraceLimit'] = 2;

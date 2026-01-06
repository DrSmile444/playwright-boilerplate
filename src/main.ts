import { environmentConfig } from './config/environment.config';
import { OVERALL_PROJECT_RELEASE_VERSION } from './version';

export function showHello() {
  return `Hello world ${environmentConfig.CI} ${OVERALL_PROJECT_RELEASE_VERSION}`;
}

console.info(showHello());

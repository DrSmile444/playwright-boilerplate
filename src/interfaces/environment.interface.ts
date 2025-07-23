/* eslint-disable @typescript-eslint/naming-convention */
export interface EnvironmentBaseUrlConfig {
  DEV_API_BASE_URL: string;
  DEV_BASE_URL: string;
  LOCAL_API_BASE_URL: string;
  LOCAL_BASE_URL: string;
  PROD_API_BASE_URL: string;
  PROD_BASE_URL: string;
}

export interface EnvironmentConfig extends EnvironmentBaseUrlConfig {
  CI: boolean;
  PLAYWRIGHT_RECORD: boolean;
}

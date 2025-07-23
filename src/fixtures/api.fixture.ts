import type { APIRequestContext } from '@playwright/test';
import { request, test as base } from '@playwright/test';

import type { PlaywrightExtraConfig } from '@interfaces';

interface APIRequestFixture {
  apiRequest: APIRequestContext;
}

export const test = base.extend<PlaywrightExtraConfig & APIRequestFixture>({
  apiUrl: ['', { option: true }],

  apiRequest: async ({ apiUrl }, use) => {
    const refreshToken = 'TOKEN'; // Add your logic of retrieving the token

    const apiRequestContext = await request.newContext({
      baseURL: apiUrl,
      extraHTTPHeaders: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    await use(apiRequestContext);
    await apiRequestContext.dispose();
  },
});

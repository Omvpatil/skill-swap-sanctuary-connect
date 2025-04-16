
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2e944a9220bf44f98999d51eb32eea08',
  appName: 'skill-swap-sanctuary-connect',
  webDir: 'dist',
  server: {
    url: 'https://2e944a92-20bf-44f9-8999-d51eb32eea08.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;

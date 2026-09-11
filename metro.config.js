const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Speeds up resolution of deep sub-dependencies like Supabase
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
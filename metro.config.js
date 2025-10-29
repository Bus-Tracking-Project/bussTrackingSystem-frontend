const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)

// Fix for Firebase Auth "Component auth has not been registered yet" error
// Add 'cjs' to the source extensions
config.resolver.sourceExts.push('cjs');

// Disable the experimental package exports feature
config.resolver.unstable_enablePackageExports = false;
 
module.exports = withNativeWind(config, { input: './app/globals.css' })
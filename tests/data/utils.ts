/**
 * ### Introduction
 * Polyfill for Node.js
 *
 * ### Parameters
 * - `version` - `number | string`
 *   + The version of Node.js
 *   + A Semver string or a number representing
 *     the major version + minor version
 *
 * ### Results
 * - `Promise<boolean>`
 *   + Whether the polyfill is applied
 */
export async function polyfillNodejs(
  version: number | (string & {}) | `${'v' | ''}${number}.${number}.${number}`,
): Promise<boolean> {
  const nodejsVersion =
    typeof version === 'number'
      ? version
      : Number(/(\d+\.\d+)/.exec(version)?.[1] ?? '18');

  // Apply the polyfill if the version is old enough
  if (nodejsVersion < 20 && nodejsVersion >= 18) {
    Object.assign(global, await import('buffer'));
  } else {
    // Not to apply the polyfill if the version is new enough
    return false;
  }
  return true;
}

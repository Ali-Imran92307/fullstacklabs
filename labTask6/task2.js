const { fetchUser } = require('./task1.js');

function isValidDetails(details) {
  return details !== null
    && typeof details === 'object'
    && !details.error
    && Object.keys(details).length > 0;
}

async function fetchProfile(fetchImplementation) {
  return fetchUser('/users/profile', fetchImplementation);
}

async function fetchPreferences(fetchImplementation) {
  return fetchUser('/users/preferences', fetchImplementation);
}

async function fetchUserDetails(fetchImplementation = globalThis.fetch) {
  const [profile, preferences] = await Promise.all([
    fetchProfile(fetchImplementation),
    fetchPreferences(fetchImplementation)
  ]);

  if (!isValidDetails(profile) || !isValidDetails(preferences)) {
    throw new Error('Could not fetch valid profile and preference details');
  }

  return { profile, preferences };
}

module.exports = { fetchUserDetails };

function isValidUser(user) {
  return user !== null
    && typeof user === 'object'
    && Number.isInteger(user.id)
    && typeof user.name === 'string'
    && user.name.trim().length > 0
    && typeof user.email === 'string'
    && user.email.includes('@');
}

async function fetchUser(url, fetchImplementation = globalThis.fetch) {
  try {
    const response = await fetchImplementation(url);

    if (!response.ok) {
      throw new Error(`User request failed with status ${response.status}`);
    }

    const user = await response.json();
    if (!isValidUser(user)) {
      throw new Error('Fetched data is not a valid user object');
    }

    return user;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'User request failed' };
  }
}

module.exports = { fetchUser };

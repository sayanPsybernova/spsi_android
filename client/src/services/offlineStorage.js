import { set, get, del, values } from 'idb-keyval';

const STORE_KEY = 'offline_submissions';

export const saveOfflineSubmission = async (submission) => {
  const submissions = (await get(STORE_KEY)) || [];
  const newSubmission = {
    ...submission,
    id: `offline_${Date.now()}`, // Temporary ID
    timestamp: Date.now(),
  };
  submissions.push(newSubmission);
  await set(STORE_KEY, submissions);
  return newSubmission;
};

export const getOfflineSubmissions = async () => {
  return (await get(STORE_KEY)) || [];
};

export const removeOfflineSubmission = async (id) => {
  const submissions = (await get(STORE_KEY)) || [];
  const filtered = submissions.filter((s) => s.id !== id);
  await set(STORE_KEY, filtered);
};

export const clearOfflineSubmissions = async () => {
  await del(STORE_KEY);
};

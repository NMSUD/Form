import { anyObject } from '@helpers/typescriptHacks';

const propertiesToIgnore = [
  'approvalStatus',
  'bioMediaFiles',
  'discordWebhookId',
  'profilePicFile',
  'xata',
];

export const stripPropertiesFromObject = <T extends {}>(persistenceObj: T) => {
  // this spread operator is important, otherwise result can be updated by reference
  let result = { ...anyObject };
  const keys = Object.keys(persistenceObj).filter((k) => k !== 'id');

  for (const persistenceProp of ['id', ...keys]) {
    if (propertiesToIgnore.includes(persistenceProp)) continue;
    if (Object.prototype.hasOwnProperty.call(persistenceObj, persistenceProp) === false) continue;

    const persistenceValue = (persistenceObj as { [x: string]: unknown })[persistenceProp];
    result[persistenceProp] = persistenceValue;
  }

  return result;
};

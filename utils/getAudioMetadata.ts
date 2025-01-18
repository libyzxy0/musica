import { getAudioMetadata } from '@missingcore/audio-metadata';

export const getMetadata = async (uri: string) => {
  const data = await getAudioMetadata(uri, ['artist', 'name','album','artwork']);
  return data
}
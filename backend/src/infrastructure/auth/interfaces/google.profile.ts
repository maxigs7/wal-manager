export class GoogleProfile {
  name: { givenName: string; familyName: string };
  emails: { value: string }[];
  photos: { value: string }[];
}

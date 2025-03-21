import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  baseURL:"https://sklife.in/sk-portal/",
  basePath:"https://sklife.in/sk-portal/backend/api/",
  AdminbasePath:"https://sklife.in/sk-portal/backend/api/admin/",
  FilebasePath:"https://sklife.in/sk-portal/storage/"
};

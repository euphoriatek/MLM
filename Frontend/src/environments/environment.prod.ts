import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  baseURL:"https://sklife.in/",
  basePath:"https://sklife.in/backend/api/",
  AdminbasePath:"https://sklife.in/backend/api/admin/",
  FilebasePath:"https://sklife.in/backend/public/storage/",
  TdsPercentage:10,
  RazorpayApiKey:'rzp_test_er0Zna0Q1TQrgL'
 
};

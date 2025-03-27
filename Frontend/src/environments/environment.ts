import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  baseURL:"http://localhost:4200/",
  basePath:"http://localhost:8000/api/",
  AdminbasePath:"http://localhost:8000/api/admin/",
  FilebasePath:"http://localhost:8000/storage/",
  TdsPercentage:2,
  RazorpayApiKey:'rzp_test_er0Zna0Q1TQrgL'
};

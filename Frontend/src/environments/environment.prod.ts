import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  baseURL:"https://sklife.in/sk-portal/",
  basePath:"https://sklife.in/api/",
  AdminbasePath:"https://sklife.in/api/admin/",
  FilebasePath:"https://sklife.in/public/storage/",
  TdsPercentage:2,
  // RazorpayApiKey:'rzp_test_er0Zna0Q1TQrgL'
  RazorpayApiKey:'rzp_live_Pt38ixYPqDBK5p'
};

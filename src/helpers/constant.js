export const CURRENCY = 'BDT';
export const ACCESS_TOKEN = 'panni-access-token';
export const SECURED_SESSION_TOKEN_KEY = '__Secure-next-auth.session-token';
export const SESSION_TOKEN_KEY = 'next-auth.session-token';
export const ENV_DEV = 'dev';

export const openRoutes = [
  '/login',
  '/signup',
  '/register',
  '/',
  '/order',
  '/checkout',
  '/verify-otp',
  '/forgot-password',
];

export const protectedRoutes = [];

export const INSIDE_DHAKA_CITIES = [{ label: 'Dhaka', value: 'DHAKA' }];
export const OUTSIDE_DHAKA_CITIES = [
  // { label: 'Dhaka', value: 'DHAKA' },
  { label: 'Chattogram', value: 'CHATTOGRAM' },
  { label: 'Khulna', value: 'KHULNA' },
  { label: 'Rajshahi', value: 'RAJSHAHI' },
  { label: 'Sylhet', value: 'SYLHET' },
  { label: 'Barishal', value: 'BARISHAL' },
  { label: 'Rangpur', value: 'RANGPUR' },
  { label: 'Mymensingh', value: 'MYMENSINGH' },
  { label: 'Comilla', value: 'COMILLA' },
  { label: 'Narayanganj', value: 'NARAYANGANJ' },
  { label: 'Gazipur', value: 'GAZIPUR' },
  { label: "Cox's Bazar", value: 'COXS_BAZAR' },
  { label: 'Jessore', value: 'JESSORE' },
  { label: 'Bogra', value: 'BOGRA' },
  { label: 'Dinajpur', value: 'DINAJPUR' },
  { label: 'Madaripur', value: 'MADARIPUR' },
  { label: 'Faridpur', value: 'FARIDPUR' },
  { label: 'Feni', value: 'FENI' },
  { label: 'Kushtia', value: 'KUSHTIA' },
  { label: 'Rangamati', value: 'RANGAMATI' },
  { label: 'Tangail', value: 'TANGAIL' },
  { label: 'Manikganj', value: 'MANIKGANJ' },
  { label: 'Pabna', value: 'PABNA' },
  { label: 'Jhenaidah', value: 'JHENAIDAH' },
  { label: 'Barisal', value: 'BARISAL' },
  { label: 'Satkhira', value: 'SATKHIRA' },
  { label: 'Bagerhat', value: 'BAGERHAT' },
  { label: 'Narsingdi', value: 'NARSINGDI' },
  { label: 'Lalmonirhat', value: 'LALMONIRHAT' },
  { label: 'Netrokona', value: 'NETROKONA' },
  { label: 'Sherpur', value: 'SHERPUR' },
  { label: 'Patuakhali', value: 'PATUAKHALI' },
  { label: 'Jhalokathi', value: 'JHALOKATHI' },
  { label: 'Bhola', value: 'BHOLA' },
  { label: 'Naogaon', value: 'NAOGAON' },
  { label: 'Natore', value: 'NATORE' },
  { label: 'Chuadanga', value: 'CHUADANGA' },
  { label: 'Habiganj', value: 'HABIGANJ' },
  { label: 'Magura', value: 'MAGURA' },
  { label: 'Meherpur', value: 'MEHERPUR' },
  { label: 'Chapainawabganj', value: 'CHAPAINAWABGANJ' },
  { label: 'Sirajganj', value: 'SIRAJGANJ' },
  { label: 'Thakurgaon', value: 'THAKURGAON' },
  { label: 'Kurigram', value: 'KURIGRAM' },
  { label: 'Nilphamari', value: 'NILPHAMARI' },
  { label: 'Gaibandha', value: 'GAIBANDHA' },
  { label: 'Panchagarh', value: 'PANCHAGARH' },
];

// export const MODE_CAR = 1;
// export const MODE_BIKE = 2;

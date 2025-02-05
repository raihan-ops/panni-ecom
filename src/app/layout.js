// import './globals.css';
// import '../styles/utils.css';
// import { AntdRegistry } from '@ant-design/nextjs-registry';
// import { ConfigProvider } from 'antd';
// import { antdThemeConfigs } from '@/themeConfig/antdthemeConfig';
// import ProviderInjection from '@/providers/ProviderInjection';
// import localFont from 'next/font/local';

// export const metadata = {
//   metadataBase: new URL('http://localhost:3000'),
//   title: {
//     absolute: 'Panni',
//     default: 'Panni',
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={``}>
//         <AntdRegistry>
//           <ConfigProvider theme={antdThemeConfigs}>
//             <ProviderInjection>{children}</ProviderInjection>
//           </ConfigProvider>
//         </AntdRegistry>
//       </body>
//     </html>
//   );
// }
import './globals.css';
import '../styles/utils.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { antdThemeConfigs } from '@/themeConfig/antdthemeConfig';
import ProviderInjection from '@/providers/ProviderInjection';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://pannibd.com/'),
  title: {
    absolute: 'Panni',
    default: 'Panni',
  },
};

export default function RootLayout({ children }) {
  // const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Head */}
        <Script
          id="tag-manager-head"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P6BV439W');
          `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager - Body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P6BV439W"
            height="0"
            width="0"
            className="hidden"
          ></iframe>
        </noscript>

        <AntdRegistry>
          <ConfigProvider theme={antdThemeConfigs}>
            <ProviderInjection>{children}</ProviderInjection>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

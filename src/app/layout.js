import './globals.css';
import '../styles/utils.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { antdThemeConfigs } from '@/themeConfig/antdthemeConfig';
import ProviderInjection from '@/providers/ProviderInjection';
import localFont from 'next/font/local';

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    absolute: '',
    default: 'Panni',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <AntdRegistry>
          <ConfigProvider theme={antdThemeConfigs}>
            <ProviderInjection>{children}</ProviderInjection>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

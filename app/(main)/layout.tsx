
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css';
import NavBar from '@/app/components/navbar';
import LoginModal from "@/app/components/auth/loginModal";
import SignUpModal from "@/app/components/auth/signupModal";
import ToasterProvider from '../providers/ToasterProvider';
import getCurrentUser from "@/app/actions/getCurrentUser";
import Footer from "@/app/components/HomeComponent/Footer"
import { Locale, i18n } from '@/i18n.config'
import SessionWrapper from '../providers/SessionProvider';




const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CV BUILDER',
  description: 'powerful cv builder that allows anyone to create a modern professional resume in 3 simple steps. For those who have an existing resume, it also provides a resume parser to help test and confirm its ATS readability',
}

// export async function generateStaticParams() {
//   return i18n.locales.map(locale => ({ lang: locale }))
// }


export default async function RootLayout({
  children,
  // params
}: {
  children: React.ReactNode,
  // params: { lang: Locale }
}) {
  const currentUser = await getCurrentUser();
  // const language = await getLanguage(lang) 
  return (
    <html >
      <SessionWrapper>
        <body className={inter.className}>
          <LoginModal />
          <SignUpModal />
          <ToasterProvider />

          <div className="flex flex-col min-h-screen">
            <NavBar user={currentUser} />
            <div className="flex-1">{children}</div>
            <footer className=''>
              <Footer />
            </footer>
          </div>

        </body>

      </SessionWrapper>
    </html>
  )
}

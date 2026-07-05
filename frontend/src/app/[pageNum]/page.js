'use client';
import { useParams } from 'next/navigation';
import Page1 from '../../components/Page1';
import Page2 from '../../components/Page2';
import Page3 from '../../components/Page3';
import Page4 from '../../components/Page4';
import Page5 from '../../components/Page5';
import Page6 from '../../components/Page6';
import Page7 from '../../components/Page7';
import Page8 from '../../components/Page8';

const pageComponents = {
  page1: Page1,
  page2: Page2,
  page3: Page3,
  page4: Page4,
  page5: Page5,
  page6: Page6,
  page7: Page7,
  page8: Page8,
};

export default function PageDetail() {
  const { pageNum } = useParams();
  const SelectedPage = pageComponents[pageNum?.toLowerCase()];

  if (!SelectedPage) {
    return <div className="flex min-h-screen items-center justify-center text-gray-500">Page not found</div>;
  }

  return <SelectedPage />;
}

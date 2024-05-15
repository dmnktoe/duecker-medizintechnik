import { useTranslation } from 'next-i18next';
import { Key } from 'react';
import { VscCloudDownload } from 'react-icons/vsc';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import PrimaryLink from '@/components/ui/Links/PrimaryLink';
import { Title } from '@/components/ui/Typography';

import { Download } from '@/interfaces/Download';

export const DownloadCenter = () => {
  const { t, ready } = useTranslation('downloads', { useSuspense: false });

  const SectionTitle = ({ title }: { title: string }) => (
    <Title renderAs='h2' size='four' margin={false} className='mb-2'>
      {title}
    </Title>
  );

  const FileTitle = ({ title }: { title: string }) => (
    <Title renderAs='h3' size='five' margin={false}>
      {title}
    </Title>
  );

  const File = ({
    title,
    size,
    url,
    type,
  }: {
    title: string;
    size: string;
    url: string;
    type: string;
  }) => (
    <div className='w-full border-[1px] border-solid border-gray-100 p-4 text-dark'>
      <div className='flex flex-row justify-between'>
        <PrimaryLink className='text-base' href={url}>
          {title}
        </PrimaryLink>
        <div className='flex flex-row items-center gap-3'>
          <span className='text-light text-sm'>
            {size}, {type.toUpperCase()}
          </span>
          <PrimaryLink className='text-base' href={url}>
            <VscCloudDownload className='h-6 w-6' />
          </PrimaryLink>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {ready &&
        t('content.downloads', { returnObjects: true }).map(
          (download: Download, index: Key) => (
            <div className='mb-0 flex flex-col' key={index}>
              <SectionTitle title={download.sectionTitle} />
              <Accordion type='multiple'>
                {download.items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className='bg-gray-100 px-4'>
                      <FileTitle title={item.title} />
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='mt-4 flex flex-col gap-2'>
                        {item.files.map((file, index) => (
                          <File
                            key={index}
                            title={file.title}
                            size={file.size}
                            url={file.url}
                            type={file.type}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ),
        )}
    </>
  );
};

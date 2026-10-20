import { Icon } from '@lobehub/ui';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

interface PageLoadingProps {
  className?: string;
  description?: React.ReactNode;
  style?: React.CSSProperties;
  title: React.ReactNode;
}

const PageLoading = (props: PageLoadingProps) => {
  const { title, className, style, description } = props;
  return (
    <Flexbox height={'100%'} width={'100%'} className={className} style={style}>
      <Center flex={1} gap={12} width={'100%'}>
        {/* 外部ロゴ（@lobehub/ui の Logo は npmmirror を参照する）は使わない */}
        <Image alt="CLADS" height={64} src={'/icons/shino-192.png'} width={64} />
        <Center gap={8} horizontal>
          <Icon icon={Loader2} spin />
          {title}
        </Center>
        {description && <Center>{description}</Center>}
      </Center>
    </Flexbox>
  );
};

export default memo(PageLoading);

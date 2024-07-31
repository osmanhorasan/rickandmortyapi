
'use client'; 

import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

interface StatusFilterProps {
  currentStatus: string | null;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ currentStatus }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus) {
      params.set('status', newStatus);
    } else {
      params.delete('status');
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <Space size="middle" className='pb-10'>
      <Button
        type={status === 'alive' ? 'primary' : 'default'}
        onClick={() => handleStatusChange('alive')}
      >
        Alive
      </Button>
      <Button
        type={status === 'dead' ? 'primary' : 'default'}
        onClick={() => handleStatusChange('dead')}
      >
        Dead
      </Button>
      <Button
        type={status === 'unknown' ? 'primary' : 'default'}
        onClick={() => handleStatusChange('unknown')}
      >
        Unknown
      </Button>
      <Button
        type={status === null ? 'primary' : 'default'}
        onClick={() => handleStatusChange('')}
      >
        All
      </Button>
    </Space>
  );
};

export default StatusFilter;

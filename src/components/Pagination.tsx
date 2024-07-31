
'use client'; 

import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <AntPagination
      current={currentPage}
      total={totalPages * 10} 
      onChange={handlePageChange}
      showSizeChanger={false}
      className='py-5 bg-white my-5 rounded-md'
    />
  );
};

export default Pagination;

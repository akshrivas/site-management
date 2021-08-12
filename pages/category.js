import Head from 'next/head';
import React from 'react';
import CategoryComponent from 'src/components/Category';

const Category = () => {
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>
      <CategoryComponent />
    </>
  );
};

export default Category;
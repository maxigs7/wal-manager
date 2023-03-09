import Image from 'next/image';
import React from 'react';

const IMAGES = [
  'https://images.unsplash.com/photo-1677396390519-c56094fc16b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=990&q=80',
  'https://images.unsplash.com/photo-1677435369384-585fa3ee8c22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=990&q=80',
  'https://images.unsplash.com/photo-1677400841013-b17f87ca8af3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=990&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=990&q=80',
];

const IMAGE_INDEX = Math.floor(Math.random() * IMAGES.length);

export const SideImage: React.FC = () => (
  <Image
    alt="background image"
    className="hidden h-screen w-full object-cover lg:block"
    height="1080"
    src={IMAGES[IMAGE_INDEX]}
    width="990"
    priority
  />
);

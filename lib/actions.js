// lib/actions.js
'use server';

import { addPost } from './data'; // <-- Usamos la nueva función
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createCustomer(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  const newPost = {
    id: Date.now(),
    title,
    content,
  };

  addPost(newPost); // <-- La usamos aquí

  revalidatePath('/');
  redirect('/');
}
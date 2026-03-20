'use server'
import { redirect } from 'next/navigation'
import {addNote, updateNote, delNote} from '@/lib/redis';
import { sleep } from '@/lib/tools';
import { revalidatePath } from 'next/cache';

export async function saveNote(prevState: any, formData: FormData) {
  
  const noteId = formData.get('noteId') as string;

  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  })
  await sleep(500)
  if (noteId) {
    updateNote(noteId, data)
    revalidatePath('/','layout')

  } else {
    const res = await addNote(data)
    revalidatePath('/','layout')
  }
  return { message: 'Note saved successfully' };
}

export async function deleteNote(prevState: any, formData: FormData) {
  const noteId = formData.get('noteId') as string;
  delNote(noteId)
  revalidatePath('/','layout')
  redirect('/')
}

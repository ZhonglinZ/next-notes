import { getServerSession } from 'next-auth';
import { prisma } from './prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getAllNotes() {
    const session = await getServerSession(authOptions);
    if(!session?.user?.id)
        return []
    const notes = await prisma.note.findMany({
        where: {
            authorId: session?.user?.id
        }
    });
    const res = {};
    notes.forEach(({title, content, id, updatedAt}) => {
    res[id] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })
  return res
}

export async function addNote(data: string) {
  const session = await getServerSession(authOptions);
  console.log('调试 session', session);
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }
  
  const parsedData = JSON.parse(data);
  const result = await prisma.note.create({
    data: {
      title: parsedData.title,
      content: parsedData.content,
      authorId: session.user.id, // 直接使用 authorId
    }
  });

  return result.id;
}

export async function updateNote(uuid: string, data: string) {
  const parsedData = JSON.parse(data);
  await prisma.note.update({
    where: {
      id: uuid
    },
    data: {
      title: parsedData.title,
      content: parsedData.content
    }
  })
}

export async function getNote(uuid: string) {
  const session = await getServerSession(authOptions)
  if (session == null) return;
  const {title, content, updateTime, id} = await prisma.note.findFirst({
    where: {
      id: uuid
    }
  })

  return {
    title,
    content,
    updateTime,
    id
  }
}

export async function delNote(uuid: string) {
  await prisma.note.delete({
    where: {
      id: uuid
    }
  })
}

export async function addUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: []
      }
    }
  })

  return {
    name: username,
    username,
    userId: user.id
  }
}

export async function getUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      notes: true
    }
  })
  if (!user) return 0;
  if (user.password !== password) return 1
  return {
    name: username,
    username,
    userId: user.id
  } 
}


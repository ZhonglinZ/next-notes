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
    const res: { [key: string]: string } = {};
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
  
  const note = await prisma.note.findFirst({
    where: {
      id: uuid
    }
  })
  
  if (!note) {
    return null;
  }
  
  const {title, content, updatedAt, id} = note

  return {
    title,
    content,
    updateTime: updatedAt,
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
    id: user.id,
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
  
  if (!user) {
    return { found: false, reason: 'not_found' as const }
  }
  
  if (user.password !== password) {
    return { found: false, reason: 'wrong_password' as const }
  }
  
  return {
    found: true,
    user: {
      id: user.id,
      name: username,
      username,
      userId: user.id
    }
  }
}


import Redis from 'ioredis'

const redis = new Redis()

const initialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

export async function getAllNotes() {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes")
}

export async function addNote(data: unknown) {
  const uuid = Date.now().toString();
  await redis.hset("notes", uuid, data as string);
  return uuid
}

export async function updateNote(uuid: string, data: unknown) {
  await redis.hset("notes", uuid, data as string);
}

export async function getNote(uuid: string) {
  const note = await redis.hget("notes", uuid);
  if (!note) return null;
  return JSON.parse(note);
}

export async function delNote(uuid: string) {
  return redis.hdel("notes", uuid)
}

export default redis
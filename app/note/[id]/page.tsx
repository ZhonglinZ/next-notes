import Note from "@/components/Note";
// import { getNote } from "@/lib/redis";
import { getNote } from "@/lib/script";

import { sleep } from "@/lib/tools";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 动态路由 获取笔记 id
  const { id: noteId } = await params;
  const note = await getNote(noteId);

  // 为了让 Suspense 的效果更明显
  await sleep(500);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note || {}} />;
}

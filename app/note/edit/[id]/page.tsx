import NoteEditor from "@/components/NoteEditor";
// import { getNote } from "@/lib/redis";
import { getNote } from "@/lib/script";

import { sleep } from "@/lib/tools";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: noteId } = await params;
  const note = await getNote(noteId);

  // 让效果更明显
  await sleep(500);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note?.title || ""}
      initialBody={note?.content || ""}
    />
  );
}

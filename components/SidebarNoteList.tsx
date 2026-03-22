import { getAllNotes } from "@/lib/redis";
import { sleep } from "@/lib/tools";
import SidebarNoteListFilter from "./SidebarNoteListFilter";
import SidebarNoteItemHeader from "./SiderbarNoteItemHeader";

export default async function NoteList() {
  await sleep(3000);
  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}

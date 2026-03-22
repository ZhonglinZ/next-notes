import dayjs from 'dayjs';
import SidebarNoteItemContent from './SidebarNoteItemContent';
import SidebarNoteItemHeader from './SiderbarNoteItemHeader';

export default function SidebarNoteItem({ noteId, note }: { noteId: string; note: { title: string; content: string; updateTime: string; } }) {

  const { title, content = '', updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }>
       <SidebarNoteItemHeader title={title} updateTime={updateTime} />>
    </SidebarNoteItemContent>
  );
}
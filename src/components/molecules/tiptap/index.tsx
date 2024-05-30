import './style.css'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Highlighter,
  Image,
  Italic,
  List,
  ListOrdered,
  Paperclip,
  UnderlineIcon,
} from 'lucide-react'
import { cn } from '@/libs/helpers/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/Select'

// IQRO https://codesandbox.io/s/tiptap-0sqm3i?file=/src/components/Tiptap.tsx
interface ToolbarProps extends Partial<HTMLElement> {
  editor: Editor
  hasAttachment?: boolean
  hasImage?: boolean
}
function Toolbar({ editor, className, hasAttachment, hasImage }: ToolbarProps) {
  const headerChange = (val: string) => {
    const toRun = editor.chain().focus()
    if (+val < 4) toRun.toggleHeading({ level: +val as 1 | 2 | 3 | 4 }).run()
    else toRun.setParagraph().run()
  }
  const findActive = () => {
    for (let level = 1; level < 4; level++)
      if (editor.isActive('heading', { level })) return String(level)
    return '4'
  }
  return (
    <div className="mx-0 rounded-t-md border">
      <div className={cn('Toolbar gap-16 bg-background', className)}>
        <Select
          defaultValue="4"
          onValueChange={headerChange}
          value={findActive()}
        >
          <SelectTrigger className="w-[140px] border-0">
            <SelectValue placeholder="Normal Text" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-white">
              <SelectItem
                value="1"
                className="text-[3.6rem] hover:text-primary"
              >
                Heading 1
              </SelectItem>
              <SelectItem
                value="2"
                className="text-[3.2rem] hover:text-primary"
              >
                Heading 2
              </SelectItem>
              <SelectItem
                value="3"
                className="text-[2.4rem] hover:text-primary"
              >
                Heading 3
              </SelectItem>
              <SelectItem value="4" className="text-[2rem] hover:text-primary">
                Normal Text
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="Toolbar items-center gap-8">
          <div
            className={cn('icon', editor.isActive('bold') ? 'is-active' : '')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold />
          </div>
          <div
            className={cn('icon', editor.isActive('italic') ? 'is-active' : '')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </div>
          <div
            className={cn(
              'icon',
              editor.isActive('underline') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon />
          </div>
          <div
            className={cn(
              'icon',
              editor.isActive('highlight') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Highlighter />
          </div>
          <div
            className={cn(
              'icon ml-4',
              editor.isActive('bulletList') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List />
          </div>
          <div
            className={cn(
              'icon',
              editor.isActive('orderedList') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered />
          </div>
          {hasAttachment && (
            <div
              className={cn(
                'icon',
                // editor.isActive('orderedList') ? 'is-active' : '',
              )}
              // onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <Paperclip className="rounded-md" />
            </div>
          )}
          {hasImage && (
            <div
              className={cn(
                'icon',
                // editor.isActive('orderedList') ? 'is-active' : '',
              )}
              // onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <Image className="rounded-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
interface tiptapProps extends Partial<HTMLElement> {
  content: string
  placeholder?: string
  update?: (e) => void
  toolbarClassName?: string
  hasAttachment?: boolean
  hasImage?: boolean
}
const Tiptap = ({
  content,
  placeholder,
  className,
  toolbarClassName,
  hasAttachment,
  hasImage,
  update,
}: tiptapProps) => {
  const editorProps = {
    attributes: {
      class: cn(
        'mx-0 p-2 border border-t-0 bg-white border-black rounded-b-md border-state-subued border-opacity-30 overflow-y-auto',
        className,
      ),
    },
  }
  const extensions = [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Highlight,
    Placeholder.configure({
      placeholder,
    }),
    Underline,
  ]
  const editor = useEditor({
    content,
    editorProps,
    onUpdate: (e) => {
      update(e.editor.getHTML())
    },
    extensions,
  })
  if (!editor) {
    return null
  }
  return (
    <div>
      <Toolbar
        editor={editor}
        className={toolbarClassName}
        hasAttachment={hasAttachment}
        hasImage={hasImage}
      />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap

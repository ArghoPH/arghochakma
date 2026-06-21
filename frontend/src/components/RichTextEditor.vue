<script setup>
import { Extension } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle']
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize || null,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setFontSize:
        fontSize =>
          ({ chain }) => {
            return chain().setMark('textStyle', { fontSize }).run()
          },
      unsetFontSize:
        () =>
          ({ chain }) => {
            return chain()
              .setMark('textStyle', { fontSize: null })
              .removeEmptyTextStyle()
              .run()
          }
    }
  }
})

function cleanPastedHtml(html) {
  return html
    .replace(/background-color:\s*[^;"]+;?/gi, '')
    .replace(/color:\s*[^;"]+;?/gi, '')
    .replace(/font-family:\s*[^;"]+;?/gi, '')
    .replace(/style="\s*;?\s*"/gi, '')
}

const editor = useEditor({
  content: props.modelValue || '<p></p>',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4]
      }
    }),
    Underline,
    TextStyle,
    Color,
    FontSize,
    Highlight.configure({
      multicolor: true
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Image.configure({
      inline: false,
      allowBase64: true
    }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell
  ],
  editorProps: {
    attributes: {
      class: 'rich-editor-content'
    },
    transformPastedHTML(html) {
      return cleanPastedHtml(html)
    }
  },
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  }
})

watch(
  () => props.modelValue,
  value => {
    if (!editor.value) {
      return
    }

    const currentHtml = editor.value.getHTML()

    if (value !== currentHtml) {
      editor.value.commands.setContent(value || '<p></p>', false)
    }
  }
)

function setLink() {
  if (!editor.value) {
    return
  }

  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('Enter URL', previousUrl || 'https://')

  if (url === null) {
    return
  }

  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}

function addImage() {
  if (!editor.value) {
    return
  }

  const url = window.prompt('Enter image URL')

  if (!url) {
    return
  }

  editor.value.chain().focus().setImage({ src: url }).run()
}

function setTextColor(event) {
  editor.value?.chain().focus().setColor(event.target.value).run()
}

function setFontSize(event) {
  const value = event.target.value

  if (!value) {
    editor.value?.chain().focus().unsetFontSize().run()
    return
  }

  editor.value?.chain().focus().setFontSize(value).run()
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-950">
    <div v-if="editor"
      class="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-3 dark:border-slate-800 dark:bg-slate-900">
      <button type="button" @click="editor.chain().focus().toggleBold().run()" class="editor-btn"
        :class="{ active: editor.isActive('bold') }">B</button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()" class="editor-btn italic"
        :class="{ active: editor.isActive('italic') }">I</button>
      <button type="button" @click="editor.chain().focus().toggleUnderline().run()" class="editor-btn underline"
        :class="{ active: editor.isActive('underline') }">U</button>
      <button type="button" @click="editor.chain().focus().toggleStrike().run()" class="editor-btn"
        :class="{ active: editor.isActive('strike') }">S</button>

      <select class="editor-select"
        @change="event => editor.chain().focus().toggleHeading({ level: Number(event.target.value) }).run()">
        <option value="">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
      </select>

      <select class="editor-select" @change="setFontSize">
        <option value="">Font Size</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="22px">22px</option>
        <option value="28px">28px</option>
        <option value="36px">36px</option>
      </select>


      <input type="color" value="#2563eb" title="Text color"
        class="h-9 w-12 rounded border border-gray-300 bg-white p-1 dark:border-slate-700" @input="setTextColor" />
      <button type="button" @click="editor.chain().focus().setTextAlign('left').run()" class="editor-btn">Left</button>
      <button type="button" @click="editor.chain().focus().setTextAlign('center').run()"
        class="editor-btn">Center</button>
      <button type="button" @click="editor.chain().focus().setTextAlign('right').run()"
        class="editor-btn">Right</button>
      <button type="button" @click="editor.chain().focus().setTextAlign('justify').run()"
        class="editor-btn">Justify</button>

      <button type="button" @click="editor.chain().focus().toggleBulletList().run()" class="editor-btn">Bullet</button>
      <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" class="editor-btn">Number</button>
      <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" class="editor-btn">Quote</button>
      <button type="button" @click="editor.chain().focus().setHorizontalRule().run()" class="editor-btn">Line</button>

      <button type="button" @click="setLink" class="editor-btn">Link</button>
      <button type="button" @click="editor.chain().focus().unsetLink().run()" class="editor-btn">Unlink</button>
      <button type="button" @click="addImage" class="editor-btn">Image URL</button>

      <button type="button" @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
        class="editor-btn">Table</button>
      <button type="button" @click="editor.chain().focus().addColumnBefore().run()" class="editor-btn">Col
        Before</button>
      <button type="button" @click="editor.chain().focus().addColumnAfter().run()" class="editor-btn">Col After</button>
      <button type="button" @click="editor.chain().focus().deleteColumn().run()" class="editor-btn">Del Col</button>
      <button type="button" @click="editor.chain().focus().addRowBefore().run()" class="editor-btn">Row Before</button>
      <button type="button" @click="editor.chain().focus().addRowAfter().run()" class="editor-btn">Row After</button>
      <button type="button" @click="editor.chain().focus().deleteRow().run()" class="editor-btn">Del Row</button>
      <button type="button" @click="editor.chain().focus().deleteTable().run()" class="editor-btn">Del Table</button>

      <button type="button" @click="editor.chain().focus().undo().run()" class="editor-btn">Undo</button>
      <button type="button" @click="editor.chain().focus().redo().run()" class="editor-btn">Redo</button>
      <button type="button" @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
        class="editor-btn">Clear</button>
    </div>

    <EditorContent :editor="editor" class="min-h-[360px] p-4 text-gray-900 dark:text-white" />
  </div>
</template>

<style scoped>
.editor-btn {
  border-radius: 0.6rem;
  border: 1px solid #d1d5db;
  padding: 0.45rem 0.7rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #374151;
  background: white;
  transition: 0.2s;
}

.editor-btn:hover,
.editor-btn.active {
  border-color: #2563eb;
  background: #2563eb;
  color: white;
}

.editor-select {
  border-radius: 0.6rem;
  border: 1px solid #d1d5db;
  padding: 0.45rem 0.7rem;
  font-size: 0.85rem;
  font-weight: 600;
  background: white;
  color: #374151;
}

:deep(.rich-editor-content) {
  min-height: 330px;
  outline: none;
}

:deep(.rich-editor-content h1) {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 1rem 0;
}

:deep(.rich-editor-content h2) {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 1rem 0;
}

:deep(.rich-editor-content h3) {
  font-size: 1.45rem;
  font-weight: 700;
  margin: 0.9rem 0;
}

:deep(.rich-editor-content p) {
  margin: 0.75rem 0;
  line-height: 1.8;
}

:deep(.rich-editor-content ul) {
  list-style: disc;
  padding-left: 1.5rem;
}

:deep(.rich-editor-content ol) {
  list-style: decimal;
  padding-left: 1.5rem;
}

:deep(.rich-editor-content blockquote) {
  border-left: 4px solid #2563eb;
  padding-left: 1rem;
  color: #64748b;
  margin: 1rem 0;
}

:deep(.rich-editor-content table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

:deep(.rich-editor-content th),
:deep(.rich-editor-content td) {
  border: 1px solid #cbd5e1;
  padding: 0.75rem;
  vertical-align: top;
}

:deep(.rich-editor-content th) {
  background: #f1f5f9;
  font-weight: 800;
}

:deep(.rich-editor-content img) {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 1rem 0;
}

:deep(.rich-editor-content [style*='color: black']),
:deep(.rich-editor-content [style*='color:#000']),
:deep(.rich-editor-content [style*='color: #000']),
:deep(.rich-editor-content [style*='rgb(0, 0, 0)']) {
  color: inherit !important;
}

@media (prefers-color-scheme: dark) {

  .editor-btn,
  .editor-select {
    border-color: #334155;
    background: #0f172a;
    color: #e2e8f0;
  }

  :deep(.rich-editor-content th) {
    background: #1e293b;
  }

  :deep(.rich-editor-content th),
  :deep(.rich-editor-content td) {
    border-color: #334155;
  }
}
</style>

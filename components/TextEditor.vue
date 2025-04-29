<template>
  <div>
    <div v-if="editor" class="editor-toolbar">
      <!-- Formatting Group -->
      <div class="group">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          class="editor-btn"
        >
          <i class="fas fa-bold"></i> Bold
        </button>

        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          class="editor-btn"
        >
          <i class="fas fa-italic"></i> Italic
        </button>

        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="editor-btn"
        >
          <i class="fas fa-list-ul"></i> List
        </button>

        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          class="editor-btn"
        >
          Paragraph
        </button>
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          class="editor-btn"
        >
          <i class="fas fa-undo"></i> Undo
        </button>

        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          class="editor-btn"
        >
          <i class="fas fa-redo"></i> Redo
        </button>

        <!-- <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          class="editor-btn"
        >
          <i class="fas fa-strikethrough"></i> Strike
        </button>

        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          class="editor-btn"
        >
          <i class="fas fa-code"></i> Code
        </button> -->
      </div>

      <!-- Paragraph/Heading Group -->
      <div class="group">
        <!-- <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          class="editor-btn"
        >
          H1
        </button> -->

        <!-- <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          class="editor-btn"
        >
          H2
        </button> -->
        <!-- 
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          class="editor-btn"
        >
          H3
        </button> -->
      </div>
    </div>

    <TiptapEditorContent :editor="editor" class="my-editor" />
  </div>
</template>

<script setup>
// Define the prop for v-model
import { h } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

// Define the emit for v-model
const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue, // Set initial content to the prop value
  extensions: [TiptapStarterKit],
  onUpdate: (value) => {
    let htmlContent = value.editor.view.dom.innerHTML;
    if (htmlContent == `<p><br class="ProseMirror-trailingBreak"></p>`)
      htmlContent = "";
    emit("update:modelValue", htmlContent);
  },
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style lang="scss">
.my-editor {
  border: 1px solid var(--black-300);
  padding: 20px;
  border-radius: 6px;
  overflow-y: auto;
  ul {
    padding: 0 !important;
    margin: 0.25rem 0 0.75rem 0 !important;
    li {
      list-style-type: disc !important;
      margin: 0 0 0 2rem !important;
      line-height: 1.5;
    }
  }
}

/* This is the actual typing area */
.my-editor .ProseMirror {
  min-height: 150px; /* minimum height */
  outline: none; /* optional: removes blue border on focus */
}
</style>
<style scoped>
.editor-content-wrapper {
  min-height: 300px; /* Adjust this value as needed */
  background-color: #fff;
  border: 1px solid var(--black-300);
  padding: 16px;
  border-radius: 6px;
  overflow-y: auto;
}

/* General Styles */
.editor-toolbar {
  display: flex;
  padding: 1rem;
  background-color: var(--black-100);
  border-radius: 6px;
  max-width: 100%;
  overflow: auto;
  border: 1px solid var(--black-300);
}

.group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.editor-btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  color: #000;
  background-color: var(--black-300); /* Orange color */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

/* Active Button */
.editor-btn.is-active {
  background-color: var(--black-900);
  font-weight: bold;
  color: #fff;
  &:hover {
    color: #000;
  }
}

/* Hover Effect */
.editor-btn:hover {
  background-color: var(--black-400);
}

/* Disabled Button */
.editor-btn:disabled {
  background-color: #f0f0f0;
  color: #bbb;
  cursor: not-allowed;
}

/* Font Awesome Icons */
.editor-btn i {
  font-size: 0.8rem;
}

/* Responsive Design for Small Screens */
@media (max-width: 768px) {
  .editor-toolbar {
    flex-direction: column;
  }
}
</style>

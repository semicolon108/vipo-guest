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
        </button>
        <button
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
            class="editor-btn"
        >
          Paragraph
        </button>
      </div>

      <!-- Paragraph/Heading Group -->
      <div class="group">


        <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            class="editor-btn"
        >
          H1
        </button>

        <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            class="editor-btn"
        >
          H2
        </button>

        <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            class="editor-btn"
        >
          H3
        </button>
        <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            class="editor-btn"
        >
          <i class="fas fa-list-ol"></i> Ordered List
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
      </div>




    </div>



      <TiptapEditorContent :editor="editor"  class="my-editor"  />


  </div>
</template>

<script setup>
// Define the prop for v-model
import {h} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

// Define the emit for v-model
const emit = defineEmits(['update:modelValue']);





const editor = useEditor({
  content: props.modelValue,  // Set initial content to the prop value
  extensions: [TiptapStarterKit],
  onUpdate: (value) => {

    let htmlContent = value.editor.view.dom.innerHTML
    if(htmlContent == `<p><br class="ProseMirror-trailingBreak"></p>`) htmlContent = '';
    emit('update:modelValue',htmlContent);

  },
});





onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>


<style>
.my-editor {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
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
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  overflow-y: auto;
}

/* General Styles */
.editor-toolbar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #fff3e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  overflow: auto;
}

.group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.editor-btn {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #ff6d00; /* Orange color */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Active Button */
.editor-btn.is-active {
  background-color: #ff9e3a;
  font-weight: bold;
}

/* Hover Effect */
.editor-btn:hover {
  background-color: #ff8f00;
}

/* Disabled Button */
.editor-btn:disabled {
  background-color: #f0f0f0;
  color: #bbb;
  cursor: not-allowed;
}

/* Font Awesome Icons */
.editor-btn i {
  font-size: 16px;
}

/* Responsive Design for Small Screens */
@media (max-width: 768px) {
  .editor-toolbar {
    flex-direction: column;
  }
}
</style>

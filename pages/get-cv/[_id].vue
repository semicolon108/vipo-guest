

<template>
  <div>
    
  </div>
</template>

<script setup lang="ts">

const { $apiFetch } = useNuxtApp();


const route = useRoute()

function downloadFile(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


const getCV = async () => {
  try {
    const { data }: any = await useAsyncData("getCVVIPO", () =>
        $apiFetch("get-cv-vipo/" + route.params._id, {
          method: "GET",
        })
    )
   const url  = data.value.filePath

    downloadFile(url, 'cv.pdf')

  } catch (e) {
    console.log(e);
  }
}


  await getCV()


</script>

<style scoped lang="scss">

</style>
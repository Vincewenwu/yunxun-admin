<template>
  <div id="editorElem" style="text-align:left"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  data () {
    return {
      editorContent: '',
      editorObj: Object
    }
  },
  methods: {
    setHtml (html) {
      this.editorObj.txt.html(html)
    }
  },
  mounted () {
    var editor = new E('#editorElem')
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
      let xss = require('xss')
      let content = xss(html)
      console.log('未修改：' + html)
      console.log('已修改：' + content)
    }
    editor.customConfig.zIndex = 1000
    // editor.customConfig.uploadImgShowBase64 = true
    let urlal = this.uploadUrl + 'teacher/uploadImg.do'
    console.log(urlal)
    // 限制一次最多上传 1张图片
    editor.customConfig.uploadImgMaxLength = 1
    // editor.customConfig.uploadImgServer = 'http://127.0.0.1/admin/upload/uploadImg'
    editor.customConfig.uploadImgServer = this.uploadUrl + 'upload/uploadImg'
    // 将图片大小限制为 3M
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
    editor.customConfig.uploadFileName = 'uploadFile'
    editor.customConfig.withCredentials = true
    editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
      },
      success: function (xhr, editor, result) {
        console.log(result)
        // 图片上传并返回结果，图片插入成功之后触发
      },
      fail: function (xhr, editor, result) {
        alert('插入错误xhr：' + xhr)
        alert('插入错误result：' + result)
        // 图片上传并返回结果，但图片插入错误时触发
      },
      error: function (xhr, editor) {
        alert('上传失败：' + xhr)
        console.log(xhr)
        // 图片上传出错时触发
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
      }
    }
    editor.create()
    this.editorObj = editor
  }
}
</script>

<style>
   .uploadimg div{
   	  width:300px;
   	  height:120px;
   }
   .w-e-toolbar .w-e-droplist{
   	z-index: 9999;
   }
</style>
